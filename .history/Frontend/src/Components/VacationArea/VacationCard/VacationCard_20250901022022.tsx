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
            <span></span>

        </div>
    );
}
