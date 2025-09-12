import mongoose, { ObjectId } from "mongoose";
import { cyber } from "../2-utils/cyber";
import {
  AuthorizationError,
  ResourceNotFound,
  ValidationError,
} from "../3-models/client-errors";
import { ICredentialsModel } from "../3-models/credentials-model";
import { Role } from "../3-models/role";
import { IUserModel, UserModel } from "../3-models/user-model";
import { log } from "console";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

class UserService {
  public async register(user: IUserModel): Promise<string> {
    // Validate:
    ValidationError.validate(user);

    // If email already taken:
    const count = await UserModel.countDocuments({ email: user.email }).exec();
    if (count > 0) throw new ValidationError("Email already taken.");

    // Secure coding:
    user.roleId = Role.User;
    user.password = cyber.hash(user.password);

    // Save:
    const dbUser = await user.save();

    // Create and return token:
    const token = cyber.generateToken(dbUser);
    return token;
  }

  public async login(credentials: ICredentialsModel): Promise<string> {
    // Validate:
    ValidationError.validate(credentials);

    // Secure coding:
    credentials.password = cyber.hash(credentials.password);

    // Check if exist:
    const dbUser = await UserModel.findOne({
      email: credentials.email,
      password: credentials.password,
    }).exec();
    if (!dbUser) throw new AuthorizationError("Incorrect email or password.");

    // Create and return token:
    const token = cyber.generateToken(dbUser);
    return token;
  }

  public async likeVacation(userId: string, vacationId: string): Promise<void> {
    // ValidationError.validate();

    const user = await UserModel.findById(userId).exec();
    if (!user) throw new ResourceNotFound(userId);

    const isAlreadyLiked = user.likedVacations.some(
      (id) => id.toString() === vacationId
    );

    console.log(isAlreadyLiked);

    if (isAlreadyLiked) {
      user.likedVacations = user.likedVacations.filter(
        (id) => id.toString() !== vacationId.toString()
      );

    } else {
      const vacation = new mongoose.Types.ObjectId(vacationId);
      user.likedVacations.push(vacation);
      console.log(user.likedVacations);
    }

    await user.save();
  }


  public async getLikedVacations(userId: string): Promise<ObjectId[]>{

    const user = await UserModel.findById(userId).populate("likedVacations").exec();
    console.log(user.likedVacations);
    

    return user?.likedVacations as any;
  }
}

export const userService = new UserService();
