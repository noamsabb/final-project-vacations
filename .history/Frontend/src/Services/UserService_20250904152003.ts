import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode"; // npm i jwt-decode
import { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";
import type { CredentialsModel } from "../Models/CredentialsModel";
import { Role } from "../Models/Role";
import { VacationModel } from "../Models/VacationModel";

interface LikeVacationResponse {
  user: UserModel;
  vacation: VacationModel;
}


class UserService {
  public constructor() {
    // Get token from local storage:
    const token = localStorage.getItem("token");

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
    const rawUser = jwtDecode<{ user: any }>(token).user;

    const dbUser: UserModel = {
      ...rawUser,
      role: rawUser.roleId === 1 ? Role.Admin : Role.User,
    };
    

    // Send to global state:
    store.dispatch(userSlice.actions.initUser(dbUser));

    // Save token in local storage:
    localStorage.setItem("token", token);
  }

  // Logout:
  public logout(): void {
    // Logout from global state:
    store.dispatch(userSlice.actions.logoutUser());

    // Remove token from local storage:
    localStorage.removeItem("token");
  }

  public async likeVacation(userId: string, vacationId: string): Promise<AxiosResponse<LikeVacationResponse>> {
   return await axios.put(appConfig.userUrl + userId + "/like", { vacationId });
  }
}

export const userService = new UserService();
