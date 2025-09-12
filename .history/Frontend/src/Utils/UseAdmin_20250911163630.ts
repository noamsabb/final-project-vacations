import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../Models/UserModel";
import { type AppState } from "../Redux/Store";
import { notify } from "./Notify";
import { useEffect } from "react";

export function useAdmin(): void {

    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {

        if (user?.role !== "Admin") {
            notify.error("You are not admin!");
            navigate("/login");
        }

    }, []);

}
