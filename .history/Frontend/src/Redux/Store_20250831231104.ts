import { configureStore } from "@reduxjs/toolkit";
import type { ProductModel } from "../Models/ProductModel";
import type { UserModel } from "../Models/UserModel";
import { productSlice } from "./ProductSlice";
import { userSlice } from "./UserSlice";

// The entire application global state (all slices data):
export type AppState = {
    products: ProductModel[],
    user: UserModel;
};

// Store - the main redux object handling it all:
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer,
        user: userSlice.reducer
    }
});
