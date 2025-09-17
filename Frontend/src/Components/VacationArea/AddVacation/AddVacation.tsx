import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./AddVacation.css";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTitle } from "../../../Utils/UseTitle";

type AddVacationProps = {
  onClose: () => void;
};

export function AddVacation({ onClose }: AddVacationProps) {
    useTitle("Like2Vacation - Add Vacation");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<VacationModel>();
  const [startDate, setStartDate] = useState("");

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];

      await vacationService.addVacation(vacation);
      notify.success("Vacation has been added.");
      navigate("/vacations");
      onClose();
    } catch (err: any) {
      // Check if this is an authentication error (401 or 403)
      if (err.response?.status === 401 || err.response?.status === 403) {
        notify.error("Your session has expired. Please log in again.");
        // Don't close modal immediately - let user see the error
        setTimeout(() => {
          onClose();
          navigate("/login");
        }, 2000);
      } else {
        // For other errors, show the error but keep modal open
        notify.error(err.message || "Failed to add vacation. Please try again.");
      }
    }
  }

  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(send)}>
      <h1>Add New Vacation</h1>
        <label>Destination</label>
        <input
          type="text"
          {...register("destination")}
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
          required
        />
        <br />

        <label>Price</label>
        <input
          type="number"
          min={0}
          max={10000}
          required
          {...register("price")}
        />
        <br />

        <label>Image: </label>
        <input type="file" accept="image/*" {...register("image")} required />
        <br />

        <button type="submit">Add Vacation</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
