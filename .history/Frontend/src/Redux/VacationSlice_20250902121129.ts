import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// The entire data to handle in this slice is Northwind's entire products, thus a VacationModel[]

// Reducers (each could be using one-liner): 

// Init products for the first time: 
function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {

    // Take initial products to init (payload): 
    const initialVacation: VacationModel[] = action.payload;

    // Set initial product as a new state:
    const newState: VacationModel[] = initialVacation;

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;
}

// Add new product: 
function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    
    // Duplicate currentState to a newState: 
    const newState: VacationModel[] = [...currentState];

    // Take product to add (payload):
    const vacationToAdd: VacationModel = action.payload;

    // Add the product to the newState: 
    newState.push(vacationToAdd);

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;

    // In one-liner: return [...currentState, action.payload]; // Spread-Operator
}

// Update existing product: 
function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {

    // Duplicate currentState to a newState: 
    const newState: VacationModel[] = [...currentState];

    // Take product to update (payload):
    const vacationToUpdate: VacationModel = action.payload;

    // Update the given product in the entire products: 
    const indexToUpdate = newState.findIndex(p => p._id === vacationToUpdate._id);
    newState[indexToUpdate] = vacationToUpdate;

    // Return the newState, Redux will replace currentState with the newState and will report change to all components.
    return newState;
}

// Delete existing product: 
function deleteProduct(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {

    // Duplicate currentState to a newState: 
    const newState: VacationModel[] = [...currentState];

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
    initialState: [] as VacationModel[], // Initial value for product array.
    reducers: { initProducts, addProduct, updateVacation, deleteProduct }
});
