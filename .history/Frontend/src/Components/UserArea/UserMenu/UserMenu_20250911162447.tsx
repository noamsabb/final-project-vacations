import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { type AppState } from "../../../Redux/Store";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./UserMenu.css";

export function UserMenu() {

    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();

    function logout(): void {
        userService.logout();
        notify.success("Bye bye...");
        navigate("/home");
    }

    return (
        <div className="UserMenu">

            {!user?._id && <div>
                <span>Hello Guest | </span>
                <NavLink to="/register">Register</NavLink>
                <span> | </span>
                <NavLink to="/login">Login</NavLink>
            </div>}

            {user?._id && <div>
                <span>Hello, {user.firstName} {user.lastName} | </span> <span>| {user.roleId === 1 ? 'Admin' : 'User'}</span>
                <NavLink to="/home" onClick={logout}>Logout</NavLink>
            </div>}

        </div>
    );
}
