

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "pending", // success, pending, rejected
    userData: {},
    error: null
};

// Async thunk for login
export const loginAuthAsync = createAsyncThunk(
    "user/login",
    async (credentials, thunkAPI) => {
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem("token");

            // Make the API request with the token
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/auth-check`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            });

            // Log the response for debugging
            console.log("response", response);

            // Return the response
            return response.data;
        } catch (error) {
            // Handle errors by rejecting with the error response data
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logout(state) {
            state.status = 'pending';
            state.userData = {};
            localStorage.removeItem("token"); // Remove token on logout
        },
        loginUser(state, action) {
            state.status = 'success';
            state.userData = action.payload; // Store the user data in the state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAuthAsync.pending, (state) => {
                state.status = 'pending';
                state.error = null; // Reset error when a new request is made
            })
            .addCase(loginAuthAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.userData = action.payload;
                // Optionally, handle other things after a successful login
            })
            .addCase(loginAuthAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || "Something went wrong";
                // Optionally, handle things after a failed login
            });
    }
});

export const { logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
