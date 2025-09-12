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

  // useEffect(() => {
  //   vacationService
  //     .getOneVacation(_id)
  //     .then((dbVacation) => {
  //       setValue("destination", dbVacation.destination);
  //       setValue("description", dbVacation.description);
  //       setValue("startDate", dbVacation.startDate);
  //       setValue("endDate", dbVacation.endDate);
  //       setValue("price", dbVacation.price);
  //       setImageUrl(dbVacation.imageUrl!);
  //       setStartDate(dbVacation.startDate);
  //       setEndDate(dbVacation.endDate);
  //     })
  //     .catch((err) => err.message);
  // }, [_id, setValue]);

  useEffect(() => {
  vacationService.getOneVacation(_id)
    .then((vacation) => {
      setValue("destination", vacation.destination);
      setValue("description", vacation.description);
      setValue("price", vacation.price);
      setValue("startDate", vacation.startDate);
      setValue("endDate", vacation.endDate);

      setImageUrl(vacation.imageUrl || "");
      setStartDate(new Date(vacation.startDate));
      setEndDate(new Date(vacation.endDate));
    })
    .catch((err) => console.error(err.message));
}, [_id]);


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

  function close() {
    navigate("/vacations");
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
        {/* <input
          type="date"
          value={startDate ? startDate.toString().split("T")[0] : ""}
          {...register("startDate")}
          required
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <br />
        <label>End On</label>
        <input
          type="date"
          value={endDate ? endDate.toString().split("T")[0] : ""}
          min={
            startDate
              ? startDate.toString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          {...register("endDate")}
          required
          onChange={(e) => setEndDate(new Date(e.target.value))}
        /> */}
        <input
          type="date"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setStartDate(date);
            setValue("startDate", date);
          }}
          required
        />
        <br />
        <label>End On</label>
        <input
          type="date"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          min={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setEndDate(date);
            setValue("endDate", date);
          }}
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
        <button type="button" onClick={close}>
          Cancel
        </button>{" "}
      </form>
    </div>
  );
}
