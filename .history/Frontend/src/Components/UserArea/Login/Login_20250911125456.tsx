import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromVacations = location.state?.fromVacations;

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      notify.success("Welcome Back!");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }
  

  return (
    
    <div className="Login">
      <div>
      {fromVacations && <p className="info-message">Please log in to see vacations!</p>}
    </div>

      <form onSubmit={handleSubmit(send)}>
        <label>Email: </label>
        <input type="email" {...register("email")} />

        <label>Password: </label>
        <input type="password" {...register("password")} />

        <button>Login</button>
      </form>

      <p>
        Not yet a member ? <NavLink to="/register">Register now</NavLink>{" "}
      </p>
    </div>
  );
}
