import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Define the initial state properly
const initialState: UserModel | null = null;

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initUser(_state, action: PayloadAction<UserModel>) {
      return action.payload;
    },
    logoutUser() {
      return null;
    },
    setUser(_state, action: PayloadAction<UserModel>) {
      return action.payload;
    }
  }
});

export const { initUser, logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
