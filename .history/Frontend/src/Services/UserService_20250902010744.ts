import axios from "axios";
import { jwtDecode } from "jwt-decode"; // npm i jwt-decode
import { UserModel } from "../Models/UserModel";
import { Role } from "../Models/Role";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";
import type { CredentialsModel } from "../Models/CredentialsModel";

class UserService {

    // Convert backend roleId to frontend Role enum
    private mapRoleIdToRole(roleId: number): Role {
        switch (roleId) {
            case 1: return Role.Admin;
            case 2: return Role.User;
            default: return Role.User; // Default to User if unknown
        }
    }

    // Process user from JWT token and map roleId to role
    private processUserFromToken(dbUser: UserModel): UserModel {
        if (dbUser.roleId !== undefined) {
            dbUser.role = this.mapRoleIdToRole(dbUser.roleId);
        }
        return dbUser;
    }

    public constructor() {

        // Get token from local storage: 
        const token = localStorage.getItem("token");

        // If we have a token: 
        if (token) {

            // Extract user from token: 
            const dbUser = jwtDecode<{ user: UserModel }>(token).user;

            // Process and map roleId to role
            const processedUser = this.processUserFromToken(dbUser);

            // Send to global state: 
            store.dispatch(userSlice.actions.initUser(processedUser));
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

        // Process and map roleId to role
        const processedUser = this.processUserFromToken(dbUser);

        // Send to global state: 
        store.dispatch(userSlice.actions.initUser(processedUser));

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

    public async likeVacation(userId: string, vacationId: string): Promise<void>{
        await axios.post(appConfig.userUrl + userId + "/like", { vacationId });
    }
}

export const userService = new UserService();
