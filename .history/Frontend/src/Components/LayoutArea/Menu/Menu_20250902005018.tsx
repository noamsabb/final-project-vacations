import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { Role } from "../../../Models/Role";

export function Menu() {

const user = useSelector<AppState, UserModel>(state => state.user);
console.log(user.role);
    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <span> | </span>

            
            {user?.role === Role.User ? (<NavLink to="/vacations">Vacations</NavLink>) : (<NavLink to="/login">Vacations</NavLink>)}
            
            {user?.role === Role.Admin && <>
            <span> | </span>
            <NavLink to="/new">Add Vacation</NavLink></>
            }
        </div>
    );
}
