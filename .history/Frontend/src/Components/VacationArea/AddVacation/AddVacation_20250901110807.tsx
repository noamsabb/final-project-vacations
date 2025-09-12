import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./AddVacation.css";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export function AddVacation() {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<VacationModel>();

    async function send(vacation: VacationModel){
        vacation.image = (vacation.image as unknown as FileList)[0];
        await vacationService.addVacation(vacation);
        notify.success("Vacation has been added.");
        navigate("/vacations");
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>

            <label>Destination</label>
            <input type="text" {...register("destination")} minLength={2} maxLength={100}/>

            <label>Description</label>
            <textarea {...register("description")}></textarea>



            </form>

        </div>
    );
}
