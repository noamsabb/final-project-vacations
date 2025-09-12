import { Role } from "./Role";

export class UserModel{
public _id?: string;
public firstName?: string;
public lastName?: string;
public email?: string;
public password?: string;
public roleId?: number;  // Backend uses numbers (1=Admin, 2=User)
public likedVacations?: string[];

// Convert backend roleId to frontend Role enum
public get role(): Role {
    switch (this.roleId) {
        case 1: return Role.Admin;
        case 2: return Role.User;
        default: return Role.User; // Default to User if unknown
    }
}
}
