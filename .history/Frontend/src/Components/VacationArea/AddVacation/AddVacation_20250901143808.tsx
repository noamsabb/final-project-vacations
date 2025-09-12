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
      <style>{`
        .error {
          color: red;
          font-size: 0.8em;
          display: block;
          margin-top: 2px;
        }
      `}</style>
      <form onSubmit={handleSubmit(send)} noValidate>
        <label>Destination</label>
        <input
          type="text"
          {...register("destination", {
            required: "Destination is required",
            minLength: { value: 2, message: "Destination too short" },
            maxLength: { value: 100, message: "Destination too long" }
          })}
        />
        {errors.destination && <span className="error">{errors.destination.message}</span>}
<br />
        <label>Description</label>
        <textarea
          {...register("description")}
          minLength={10}
          maxLength={1000}
        ></textarea>
<br />

        <label>Start On</label>
        <input 
          type="date" 
          min={new Date().toISOString().split("T")[0]} 
          {...register("startDate", {
            required: "Start date is required",
            min: {
              value: new Date().toISOString().split("T")[0],
              message: "Start date cannot be in the past"
            }
          })}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />

        <label>End On</label>
        <input 
          type="date" 
          min={startDate || new Date().toISOString().split("T")[0]} 
          {...register("endDate", {
            required: "End date is required"
          })}
        />
        {errors.endDate && <span className="error">{errors.endDate.message}</span>}
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
