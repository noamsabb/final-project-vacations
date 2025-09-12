import { required } from "joi";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IDestinationModel extends Document {
  _id: ObjectId;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageName: string;
}

export const DestinationSchema = new Schema<IDestinationModel>(
  {
    destination: {
      type: String,
      required: [true, "Missing destination"],
      minLength: [2, "Destination too short"],
      maxLength: [100, "Destination too long"],
    },
    description: {
      type: String,
      required: [true, "Missing description"],
      minLength: [10, "Description too short"],
      maxLength: [1000, "Description too long"],
    },
  },
  { versionKey: false }
);

export const DestinationModel = model<IDestinationModel>(
  "DestinationModel",
  DestinationSchema,
  "destination-collection"
);
