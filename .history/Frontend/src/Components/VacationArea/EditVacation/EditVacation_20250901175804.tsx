import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import "./EditVacation.css";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function EditVacation() {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const params = useParams();
  const _id = params._id!;

  useEffect(() => {
    vacationService
      .getOneVacation(_id)
      .then((dbVacation) => {
        setValue("destination", dbVacation.destination);
        setValue("description", dbVacation.description);
        setValue("startDate", dbVacation.startDate);
        setValue("endDate", dbVacation.endDate);
        setValue("price", dbVacation.price);
        setImageUrl(dbVacation.imageUrl!);
        setStartDate(new Date(dbVacation.startDate));
      })
      .catch((err) => err.message);
  }, [_id, setValue]);

  async function send(vacation: VacationModel) {
    try {
      vacation._id = _id;
      vacation.image = (vacation.image as unknown as FileList)[0];
      await vacationService.updateVacation(vacation);
      notify.success("Vacation has been updated.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="EditVacation">
      <form onSubmit={handleSubmit(send)}>
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
          onChange={(e) => setStartDate(new Date(e.target.value)) }
        />
        <br />

        <label>End On</label>
        <input
          type="date"
          min={startDate ? startDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
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
        <input type="file" accept="image/*" {...register("image")} />
        <img src={imageUrl || null} />
        <br />

        <button>Add Vacation</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
