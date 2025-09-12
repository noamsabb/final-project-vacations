import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { userService } from "../../../Services/UserService";

type VacationCardProps = {
    vacation: VacationModel;
}

export function VacationCard(props: VacationCardProps) {

    // Get current user from Redux store
    const user = useSelector((state: AppState) => state.user);

    async function handleVacationLike() {
        await userService.likeVacation(user._id, props.vacation._id)
    }


    return (
        <div className="VacationCard">
            <span>{props.vacation.destination}</span>
            <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
            <span>{props.vacation.description}</span>
            <span>{props.vacation.startDate.toString()}- {props.vacation.endDate.toString()}</span>
            <span>{props.vacation.price} $</span>
            {/* <span onClick={handleVacationLike}>❤️ {props.vacation.likes}</span> */}
            <button
  onClick={handleVacationLike}
  style={{ background: "none", border: "none", cursor: "pointer" }}
>
  ❤️ {props.vacation.likes}
</button>
            <NavLink to={"/vacations/edit/" + props.vacation._id}>Edit</NavLink>
        </div>
    );
}
