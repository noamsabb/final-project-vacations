import { required } from "joi";
import { Document, model, ObjectId, Schema } from "mongoose";
import { appConfig } from "../2-utils/app-config";

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
    }
  },
  { versionKey: false, // Don't add __v field to each added document.
    toJSON: { virtuals: true }, // Include also virtual fields when converting document to JSON.
    id: false, // Don't add additional id field to the return document.
    timestamps: true // Add createdAt and updatedAt to any document.
  }
);

DestinationSchema.virtual("imageUrl").get(function () {
    return appConfig.baseImageUrl + this.imageName;
});

export const DestinationModel = model<IDestinationModel>(
  "DestinationModel",
  DestinationSchema,
  "destination-collection"
);
