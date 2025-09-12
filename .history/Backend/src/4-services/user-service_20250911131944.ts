import mongoose, { ObjectId, PopulateOptions } from "mongoose";
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
  
    const user = await UserModel.findById(userId).exec();
    const vacation = await VacationModel.findById(vacationId).exec();

    if (!user) throw new ResourceNotFound(userId);
    if (!vacation) throw new ResourceNotFound(vacationId);
 
    const isAlreadyLiked = user.likedVacations.some(
      (id) => id.toString() === vacationId
    );

    if (isAlreadyLiked) {
      user.likedVacations = user.likedVacations.filter(
        (id) => id.toString() !== vacationId.toString());
        
      vacation.likes -= 1;
      console.log("vacation un-liked");

    } else {
      user.likedVacations.push(new mongoose.Types.ObjectId(vacationId));
      vacation.likes += 1;
      console.log("vacation liked");
      
    }
    await user.save();
    await vacation.save();

  }

  public async getLikedVacations(
    userId: string
  ): Promise<mongoose.Types.ObjectId[]> {
     const now = new Date();
    const user = await UserModel.findById(userId)
      .populate({path: "likedVacations", match: {
      startDate: { $gte: now },
      }
    })
      .exec();
    return user?.likedVacations;
  }

  public async getLikedVacationFiltered(userId: string, filter: string): Promise<IVacationModel[]> {
      let vacations;
      const now = new Date();
  
      switch (filter) {
        case "ongoing":
          vacations = await VacationModel.find({startDate:{$lte: now}, endDate: {$gte: now}}).sort({ startDate: 1 }).exec();
          break;
        case "upcoming":
          vacations = await VacationModel.find({startDate: {$gte: now}}).sort({ startDate: 1 }).exec();
          break;
        case "all":
        default:
          vacations = await VacationModel.find({}).sort({ startDate: 1 }).exec();
          break;
      }
      return vacations;
    }
}

export const userService = new UserService();
