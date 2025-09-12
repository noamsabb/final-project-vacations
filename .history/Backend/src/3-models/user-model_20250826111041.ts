import { kMaxLength } from "buffer";
import { required } from "joi";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IUserModel extends Document {
  _id: ObjectId;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageName: string;
}

export const UserSchema = new Schema<IUserModel>(
  {
    destination: {
      type: String,
      required: [true, "Missing destination"],
      minLength: [2, "Destination too short"],
      maxLength: [100, "Destination too long"],
    },
    description: {
      type: String,
      required: [true, "Missing destination"],
      minLength: [10, "Destination too short"],
      maxLength: [1000, "Destination too long"],
    },
  },
  { versionKey: false }
);

export const UserModel = model<IUserModel>(
  "UserModel",
  UserSchema,
  "user-collection"
);
