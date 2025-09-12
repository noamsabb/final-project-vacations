import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <span> | </span>

            <NavLink to="/vacations">Vacations</NavLink>

            <span> | </span>
            
            <NavLink to="/new">Add Vacation</NavLink>

        </div>
    );
}
