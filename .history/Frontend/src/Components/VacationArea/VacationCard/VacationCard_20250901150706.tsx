import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";

type VacationCardProps = {
    vacation: VacationModel;
}

export function VacationCard(props: VacationCardProps) {
    
    const navigate = useNavigate();
    function navigateToEdit(){
        navigate("/vacations")
    }

    return (
        <div className="VacationCard">
            <span>{props.vacation.destination}</span>
            <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
            <span>{props.vacation.description}</span>
            <span>{props.vacation.startDate.toString()}- {props.vacation.endDate.toString()}</span>
            <span>{props.vacation.price} $</span>
            <span>❤️ {props.vacation.likes}</span>
            <NavLink to={"/vacations/edit/" + props.vacation._id}>Edit</NavLink>
        </div>
    );
}
