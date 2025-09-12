import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const initialUser: UserModel = action.payload;
    const newState: UserModel = initialUser;
    return newState;
}

function logoutUser(_currentState: UserModel, _action: PayloadAction): UserModel {
    return null!;
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {},
    reducers: { initUser, logoutUser }
});
