import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";

type VacationCardProps = {
    vacation: VacationModel;
}

export function VacationCard(props: VacationCardProps) {
    
    return (
        <div className="VacationCard">
            <span>{props.vacation.destination}</span>
            <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
            <span>{props.vacation.description}</span>
            <span>{props.vacation.startDate.toString()}- {props.vacation.endDate.toString()}</span>
            <span>{props.vacation.price} $</span>
            <span>❤️ {props.vacation.likes}</span>

        </div>
    );
}
