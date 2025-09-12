import axios, { type InternalAxiosRequestConfig } from "axios";

class Interceptor {

    // Create interceptor: 
    public create(): void {

        // Add our interceptor to axios: 
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

    }

}

export const interceptor = new Interceptor();
