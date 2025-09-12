import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { userService } from "../../../Services/UserService";
import { useState } from "react";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";

type VacationCardProps = {
  vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
  // Get current user from Redux store
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();

  const [liked, setLiked] = useState<boolean>(
    user?.likedVacations?.includes(props.vacation._id)
  );
  const [likes, setLikes] = useState(props.vacation.likes);

  async function handleVacationLike() {
    try {
      await userService.likeVacation(user?._id, props.vacation._id);

      // Update local state (re-render)
      if (liked) {
        setLiked(false);
        setLikes((prev) => prev - 1);
      } else {
        setLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Like failed", err);
      // Optional: show error to user
    }
  }
  async function deleteVacation() {
    try {
      const sure = confirm("Are you sure?");
      if (!sure) return;
      await vacationService.deleteVacation(props.vacation._id);
      notify.success("Vacation has been deleted.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    // <div className="VacationCard">
    //   <div className="airplane-icon">✈️</div>
    //   <span>{props.vacation.destination}</span>
    //   <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
    //   <span>{props.vacation.description}</span>
    //   <span>
    //     {props.vacation.startDate.toString()}-{" "}
    //     {props.vacation.endDate.toString()}
    //   </span>
    //   <span>{props.vacation.price} $</span>

    //   {/* User Only */}
    //   {user?.role === Role.User && (
    //     <span onClick={handleVacationLike}>
    //       {liked ? "❤️" : "🤍"} {likes}
    //     </span>
    //   )}

    //   {/* Admin Only */}
    //   {user?.role === Role.Admin && (
    //     <>
    //       <NavLink to={"/vacations/edit/" + props.vacation._id}>
    //         <button>Edit</button>
    //       </NavLink>
    //       <NavLink to="#" onClick={deleteVacation}>
    //         <button>Delete</button>
    //       </NavLink>
    //     </>
    //   )}
    // </div>
    <div className="vacation-card">
      <div className="airplane-icon">✈️</div>
      <h2 className="destination">{props.vacation.destination}</h2>
      <div className="image-wrapper">
        <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
      </div>
      <p className="description">{props.vacation.description}</p>
      <span>
        
      </span>

        <div className="info-row">
    <span className="dates">{props.vacation.startDate.toString()}-{" "}
        {props.vacation.endDate.toString()}</span>
    <span className="price">{props.vacation.price}  $</span>
  </div>

      {/* User Only */}
      {user?.role === Role.User && (
        <span onClick={handleVacationLike} className="likes">
          {liked ? "❤️" : "🤍"} {likes}
        </span>
      )}

      {/* Admin Only */}
      {user?.role === Role.Admin && (
        <>
          <NavLink to={"/vacations/edit/" + props.vacation._id}>
            <button>Edit</button>
          </NavLink>
          <NavLink to="#" onClick={deleteVacation}>
            <button>Delete</button>
          </NavLink>
        </>
      )}
    </div>
  );
}
