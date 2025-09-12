
import { Document, model, ObjectId, Schema } from "mongoose";
import { appConfig } from "../2-utils/app-config";

export interface IVacationModel extends Document {
  _id: ObjectId;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  imageName: string;
  likes: number;
}

export const VacationSchema = new Schema<IVacationModel>(
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
    startDate:{
      type: Date,
      required: [true, "Missing Start Date"]
    },    
    endDate: {
      type: Date,
      required: [true, "Missing End Date"],
      validate: {
      validator: function (value: Date) {
        return !this.startDate || value > this.startDate;
      },
      message: "End date must be after start date",
    },
    },    
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [10000, "Price can't exceed 10 000."]
    },    
    imageName: {
        type: String
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    }

  },
  { versionKey: false, // Don't add __v field to each added document.
    toJSON: { virtuals: true }, // Include also virtual fields when converting document to JSON.
    id: false, // Don't add additional id field to the return document.
    timestamps: true // Add createdAt and updatedAt to any document.
  }
);

VacationSchema.virtual("imageUrl").get(function () {
  console.log(this.imageName);
  
    return appConfig.baseImageUrl + this.imageName;
});

export const VacationModel = model<IVacationModel>(
  "VacationModel",
  VacationSchema,
  "trips"
);
