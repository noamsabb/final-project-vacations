import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./AddVacation.css";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export function AddVacation() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<VacationModel>();

  async function send(vacation: VacationModel) {
    vacation.image = (vacation.image as unknown as FileList)[0];
    await vacationService.addVacation(vacation);
    notify.success("Vacation has been added.");
    navigate("/vacations");
  }

  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(send)}>
        <label>Destination</label>
        <input
          type="text"
          {...register("destination")}
          minLength={2}
          maxLength={100}
        />
<br />
        <label>Description</label>
        <textarea
          {...register("description")}
          minLength={10}
          maxLength={1000}
        ></textarea>
<br />

        <label>Start On</label>
        <input type="date" {...register("startDate")} />
<br />

        <label>End On</label>
        <input type="date" {...register("endDate")} />
<br />

        <label>Price</label>
        <input type="number" {...register("price")} />
<br />

        <label>Image: </label>
        <input type="file" accept="image/*" {...register("image")} required />
<br />

        <button>Add Vacation</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
