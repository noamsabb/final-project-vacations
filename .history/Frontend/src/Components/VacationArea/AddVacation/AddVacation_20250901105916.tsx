import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./AddVacation.css";
import { vacationService } from "../../../Services/VacationService";

export function AddVacation() {
    const {register, handleSubmit} = useForm<VacationModel>();

    async function send(vacation: VacationModel){
        vacation.image = (vacation.image as unknown as FileList)[0];
        await vacationService.add
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}></form>
        </div>
    );
}
