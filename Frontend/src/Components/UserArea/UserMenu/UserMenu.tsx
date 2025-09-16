import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { type AppState } from "../../../Redux/Store";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./UserMenu.css";
import { ShieldUser, User } from "lucide-react";

export function UserMenu() {
  const user = useSelector<AppState, UserModel>((state) => state.user);
  const navigate = useNavigate();

  function logout(): void {
    userService.logout();
    notify.success("Bye bye...");
    navigate("/home");
  }

  return (
    <div className="UserMenu">
      {!user?._id && (
        <div>
          <span>Hello Guest </span>
          <br />
          <NavLink to="/register">Register</NavLink>
          <span> | </span>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}

      {user?._id && (
        <div>
          <span>
            Hello, <br />{user.firstName} {user.lastName} 
          </span>
          <span> {user.role == "Admin" ? <ShieldUser size={20}/> : <User size={20} />}</span>
          <NavLink to="/home" onClick={logout}>
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
}
