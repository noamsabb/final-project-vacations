import { Role } from "./Role";

export class UserModel{
public _id?: string;
public firstName?: string;
public lastName?: string;
public email?: string;
public password?: string;
public roleId?: number;  // Backend sends this (1=Admin, 2=User)
public role?: Role;      // Frontend uses this
public likedVacations?: string[];
}
