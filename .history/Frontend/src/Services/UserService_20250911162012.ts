import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode"; // npm i jwt-decode
import { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";
import type { CredentialsModel } from "../Models/CredentialsModel";

import { VacationModel } from "../Models/VacationModel";

interface LikeVacationResponse {
  user: UserModel;
  vacation: VacationModel;
}


class UserService {


  // Helper method to update user in both Redux store and localStorage token
  private updateUserState(updatedUser: UserModel): void {
    // Update Redux store
    store.dispatch(userSlice.actions.initUser(updatedUser));
    
    // Create a new token-like object to store in localStorage
    // Note: This is a simplified approach - in production, you'd want the server to issue a new JWT
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      try {
        const decoded = jwtDecode<{ user: UserModel }>(existingToken);
        // Update the user data in the decoded token structure
        const newTokenData = { ...decoded, user: updatedUser };
        // Store it as a JSON string (not a real JWT, but serves our purpose for localStorage)
        localStorage.setItem("userTokenData", JSON.stringify(newTokenData));
      } catch (error) {
        console.error("Error updating token data:", error);
      }
    }
  }

  public constructor() {
    // Get token from local storage:
    const token = localStorage.getItem("token");
    const userTokenData = localStorage.getItem("userTokenData");

    // If we have updated user data, use that instead of the original token
    if (userTokenData) {
      try {
        const tokenData = JSON.parse(userTokenData);
        store.dispatch(userSlice.actions.initUser(tokenData.user));
        return;
      } catch (error) {
        console.error("Error parsing user token data:", error);
        localStorage.removeItem("userTokenData");
      }
    }

    // If we have a token:
    if (token) {
      // Extract user from token:
      const dbUser = jwtDecode<{ user: UserModel }>(token).user;

      // Send to global state:
      store.dispatch(userSlice.actions.initUser(dbUser));
    }
  }

  // Register a new user:
  public async register(user: UserModel): Promise<void> {
    // Send user to backend:
    const response = await axios.post<string>(appConfig.registerUrl, user);

    // Extract token:
    const token: string = response.data;

    // Extract user from token:
    const dbUser = jwtDecode<{ user: UserModel }>(token).user;

    // Map roleId to Role enum
    this.mapRoleIdToRole(dbUser);

    // Send to global state:
    store.dispatch(userSlice.actions.initUser(dbUser));

    // Save token in local storage:
    localStorage.setItem("token", token);
  }

  // Login as existing user:
  public async login(credentials: CredentialsModel): Promise<void> {
    // Send user to backend:
    const response = await axios.post<string>(appConfig.loginUrl, credentials);

    // Extract token:
    const token: string = response.data;

    // Extract user from token:
    const dbUser = jwtDecode<{ user: UserModel }>(token).user;

    // Map roleId to Role enum
    this.mapRoleIdToRole(dbUser);

    // Send to global state:
    store.dispatch(userSlice.actions.initUser(dbUser));

    // Save token in local storage:
    localStorage.setItem("token", token);
  }

  // Logout:
  public logout(): void {
    // Logout from global state:
    store.dispatch(userSlice.actions.logoutUser());

    // Remove tokens from local storage:
    localStorage.removeItem("token");
    localStorage.removeItem("userTokenData");
  }

  public async likeVacation(userId: string, vacationId: string): Promise<AxiosResponse<LikeVacationResponse>> {
    const response = await axios.put(appConfig.userUrl + userId + "/like", { vacationId });
    
    // Update user state with the fresh data from the response
    if (response.data.user) {
      this.updateUserState(response.data.user);
    }
    
    return response;
  }

   public async getLikedVacationsFiltered(filter: string, userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.userUrl}${userId}/liked-filtered?filter=${filter}`);
        const vacations = response.data;
        return vacations;
    }
}

export const userService = new UserService();
