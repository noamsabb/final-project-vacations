import { Role } from "./Role";

export class UserModel{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  likedVacations: string[];
}
