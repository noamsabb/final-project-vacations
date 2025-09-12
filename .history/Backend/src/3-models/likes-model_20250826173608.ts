import { Document, model, ObjectId, Schema } from "mongoose";
import { Role } from "./role";
import { UserModel } from "./user-model";
import { VacationModel } from "./vacation-model";

export interface ILikesModel extends Document {
  _id: ObjectId;
  userId: ObjectId;
  vacationId: ObjectId;
}

export const LikesSchema = new Schema<ILikesModel>(
  {
    userId: {
      type: Schema.ObjectId
    },
    vacationId: {
      type: Schema.ObjectId
    }
  },
  {
    versionKey: false, // Don't add __v field to each added document.
    toJSON: { virtuals: true }, // Include also virtual fields when converting document to JSON.
    id: false, // Don't add additional id field to the return document.
    timestamps: true, // Add createdAt and updatedAt to any document.
  }
);

LikesSchema.virtual("user", {
    ref: UserModel, // Which model to fill in this virtual field.
    localField: "userId", // Which field in ProductModel belongs to the relation.
    foreignField: "_id", // Which field in CategoryModel belongs to the relation.
    justOne: true // Get "category" as an object instead of an array.
});
LikesSchema.virtual("vacation", {
    ref: VacationModel, // Which model to fill in this virtual field.
    localField: "vacationId", // Which field in ProductModel belongs to the relation.
    foreignField: "_id", // Which field in CategoryModel belongs to the relation.
    justOne: true // Get "category" as an object instead of an array.
});

export const LikesModel = model<ILikesModel>(
  "LikesModel",
  LikesSchema,
  "likes-collection"
);
