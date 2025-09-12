import { Document, model, ObjectId, Schema } from "mongoose";
import { Role } from "./role";

export interface IUserModel extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  likedVacations: ObjectId[];
}

export const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing firstName."],
      minlength: [2, "firstName too short."],
      maxlength: [50, "firstName too long."],
    },
    lastName: {
      type: String,
      required: [true, "Missing lastName."],
      minlength: [2, "lastName too short."],
      maxlength: [50, "lastName too long."],
    },
    email: {
      type: String,
      required: [true, "Missing email."],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email."],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password."],
      minlength: [4, "password too short."],
      maxlength: [128, "password too long."],
    },
    roleId: {
      type: Number,
      enum: Role,
    }
  },
  {
    versionKey: false, // Don't add __v field to each added document.
    toJSON: { virtuals: true }, // Include also virtual fields when converting document to JSON.
    id: false, // Don't add additional id field to the return document.
    timestamps: true, // Add createdAt and updatedAt to any document.
  }
);

export const UserModel = model<IUserModel>(
  "UserModel",
  UserSchema,
  "users"
);
