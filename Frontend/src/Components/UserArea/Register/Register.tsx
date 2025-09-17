import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import "./Register.css";

export function Register() {
  useTitle("Like2Vacation - Register");

  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success("Welcome!");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="Register">
      <h1>Join Like2Vacation ✈️</h1>
      <form onSubmit={handleSubmit(send)}>
        <label>First name: </label>
        <input
          type="text"
          {...register("firstName")}
          minLength={2}
          maxLength={50}
          required
        />

        <label>Last name: </label>
        <input
          type="text"
          {...register("lastName")}
          minLength={2}
          maxLength={50}
          required
        />

        <label>Email: </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 
              message: "Please enter a valid email address",
            },
          })}
        />
        <label>Password: </label>
        <input
          type="password"
          {...register("password")}
          minLength={4}
          required
        />

        <button>Register</button>
      </form>

      <p>
        Already a member ? <NavLink to="/login">Login now</NavLink>
      </p>
    </div>
  );
}
