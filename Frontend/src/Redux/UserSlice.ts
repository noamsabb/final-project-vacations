import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { Role } from "../Models/Role";

// Define the initial state properly
const initialState: UserModel | null = null;

// Helper to normalize role
function normalizeUserRole(user: UserModel): UserModel {
  return {
    ...user,
    role: user.role === "Admin" ? Role.Admin : Role.User,
  };
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initUser(_state, action: PayloadAction<UserModel>) {
      return normalizeUserRole(action.payload);
    },
    logoutUser() {
      return null;
    },
    setUser(_state, action: PayloadAction<UserModel>) {
      return normalizeUserRole(action.payload);
    },
  },
});

export const { initUser, logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
