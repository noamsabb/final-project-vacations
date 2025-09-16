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
            console.log(user.role);
            
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">
            <h1>Join Like2Vacation ✈️</h1>
            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")} />

                <label>Last name: </label>
                <input type="text" {...register("lastName")} />

                <label>Email: </label>
                <input type="email" {...register("email")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>
			
            <p>
                    Already a member ? <NavLink to="/login">Login now</NavLink>
                  </p>

        </div>
    );
}
