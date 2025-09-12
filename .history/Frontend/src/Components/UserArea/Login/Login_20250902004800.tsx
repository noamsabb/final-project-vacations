import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";
import { NavLink } from "react-router-dom";

export function Login() {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      notify.success("Welcome Back!");
      navigate("/home");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <label>Email: </label>
        <input type="email" {...register("email")} />

        <label>Password: </label>
        <input type="password" {...register("password")} />

        <button>Login</button>
      </form>

      <p>Not registered yet ? Click <NavLink to="/vacations">HERE</NavLink> to join us</p>
    </div>
  );
}
