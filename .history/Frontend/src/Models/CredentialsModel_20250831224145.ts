import { Document, model, Schema } from "mongoose";

export interface ICredentialsModel extends Document {
    email: string;
    password: string;
}

export const CredentialsSchema = new Schema<ICredentialsModel>({
    email: {
        type: String,
        required: [true, "Missing email."],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email."],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing password."],
        minlength: [4, "password too short."],
        maxlength: [128, "password too long."]
    }
}, { 
    autoCreate: false, // Don't create this model in the database.
    autoIndex: false // Don't create this model in the database.
});

export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema);
