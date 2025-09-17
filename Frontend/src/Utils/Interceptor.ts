import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { notify } from "./Notify";

class Interceptor {

    // Create interceptor: 
    public create(): void {

        // Add request interceptor to axios: 
        axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {

            // Load token from local storage: 
            const token = localStorage.getItem("token");

            // If token exist - send it to backend: 
            if(token) {

                // Add token to Authorization header: 
                request.headers.Authorization = "Bearer " + token;
            }

            // Return new request object:
            return request;
        });

        // Add response interceptor to handle token expiration
        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                // If response is successful, just return it
                return response;
            },
            (error: AxiosError) => {
                // Check if error is 401 (Unauthorized) or 403 (Forbidden) - token expired/invalid
                if (error.response?.status === 401 || error.response?.status === 403) {
                    // Check if we're already on login page or if this is from a form submission
                    const currentPath = window.location.pathname;
                    const isLoginPage = currentPath === '/login' || currentPath === '/register';
                    
                    // Only auto-logout and redirect if we're not on auth pages
                    // and this isn't a form submission (let components handle their own errors)
                    if (!isLoginPage) {
                        // Clear expired token and user data
                        localStorage.removeItem("token");
                        localStorage.removeItem("userTokenData");
                        
                        // Clear user from global state
                        store.dispatch(userSlice.actions.logoutUser());
                        
                        // Show user-friendly message
                        notify.error("Your session has expired. Please log in again.");
                        
                        // Only redirect if we're not already handling this in a component
                        // Add a small delay to allow component error handling to take precedence
                        setTimeout(() => {
                            if (window.location.pathname !== '/login') {
                                window.location.href = "/login";
                            }
                        }, 3000); // Increased delay to 3 seconds
                    }
                }
                
                // Always return the original error for component-specific handling
                return Promise.reject(error);
            }
        );

    }

}

export const interceptor = new Interceptor();
