import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./AddVacation.css";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function AddVacation() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<VacationModel>();
  const [startDate, setStartDate] = useState("");

  async function send(vacation: VacationModel) {
    vacation.image = (vacation.image as unknown as FileList)[0];
    console.log(vacation.startDate);
    
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
          {...register("destination") }
          required
          minLength={2}
          maxLength={100}
        />
<br />
        <label>Description</label>
        <textarea
          {...register("description")}
          required
          minLength={10}
          maxLength={1000}
        ></textarea>
<br />

        <label>Start On</label>
        <input 
          type="date" 
          min={new Date().toISOString().split("T")[0]} 
          {...register("startDate")}
            required
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />

        <label>End On</label>
        <input 
          type="date" 
          min={startDate || new Date().toISOString().split("T")[0]} 
          {...register("endDate")}
        />
<br />

        <label>Price</label>
        <input type="number" min={0} max={10000} {...register("price")} />
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
