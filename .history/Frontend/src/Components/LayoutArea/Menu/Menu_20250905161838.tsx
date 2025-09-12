import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { Role } from "../../../Models/Role";

export function Menu() {

const user = useSelector<AppState, UserModel>(state => state.user);
    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <span> | </span>

            <NavLink to={user ? "/vacations" : "/login"}>Vacations</NavLink>
            
            {user?.role === Role.Admin && <>
            <span> | </span>
            <NavLink to="/new">Add Vacation</NavLink>
            <span> | </span>
            <NavLink to={`/user/${user._id}/like`}>Liked Vacation</NavLink>
            
            </>

            }

        </div>
    );
}
