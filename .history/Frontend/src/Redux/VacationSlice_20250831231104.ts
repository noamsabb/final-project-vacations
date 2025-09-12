import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

// The entire data to handle in this slice is Northwind's entire products, thus a ProductModel[]

// Reducers (each could be using one-liner): 

// Init products for the first time: 
function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {

    // Take initial products to init (payload): 
    const initialProducts: ProductModel[] = action.payload;

    // Set initial product as a new state:
    const newState: ProductModel[] = initialProducts;

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;
}

// Add new product: 
function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    
    // Duplicate currentState to a newState: 
    const newState: ProductModel[] = [...currentState];

    // Take product to add (payload):
    const productToAdd: ProductModel = action.payload;

    // Add the product to the newState: 
    newState.push(productToAdd);

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;

    // In one-liner: return [...currentState, action.payload]; // Spread-Operator
}

// Update existing product: 
function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {

    // Duplicate currentState to a newState: 
    const newState: ProductModel[] = [...currentState];

    // Take product to update (payload):
    const productToUpdate: ProductModel = action.payload;

    // Update the given product in the entire products: 
    const indexToUpdate = newState.findIndex(p => p._id === productToUpdate._id);
    newState[indexToUpdate] = productToUpdate;

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;
}

// Delete existing product: 
function deleteProduct(currentState: ProductModel[], action: PayloadAction<string>): ProductModel[] {

    // Duplicate currentState to a newState: 
    const newState: ProductModel[] = [...currentState];

    // Take the _id of the product to delete (payload): 
    const productIdToDelete: string = action.payload;

    // Delete that product from entire products: 
    const indexToDelete = newState.findIndex(p => p._id === productIdToDelete);
    newState.splice(indexToDelete, 1);

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;
}

// Creating the slice: 
export const productSlice = createSlice({
    name: "productSlice", // The name of the slice (internal use)
    initialState: [] as ProductModel[], // Initial value for product array.
    reducers: { initProducts, addProduct, updateProduct, deleteProduct }
});
