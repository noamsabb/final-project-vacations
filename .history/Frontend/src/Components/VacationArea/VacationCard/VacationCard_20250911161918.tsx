import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { userService } from "../../../Services/UserService";
import { useState, useEffect } from "react";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { CalendarRange, Heart, HeartOff, Plane, SquarePen, Trash2 } from "lucide-react";

type VacationCardProps = {
  vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
  // Get current user from Redux store
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();

  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState(props.vacation.likes);

  // Update liked state when user or vacation changes
  useEffect(() => {
    if (user?.likedVacations) {
      setLiked(user.likedVacations.includes(props.vacation._id));
    }
  }, [user?.likedVacations, props.vacation._id]);

  async function handleVacationLike() {
    try {
      const response = await userService.likeVacation(
        user._id,
        props.vacation._id
      );
      const updatedVacation = response.data.vacation;
      setLikes(updatedVacation.likes);
    } catch (err) {
      console.error("Like failed", err);
      notify.error("Something went wrong while liking the vacation.");
    }
  }

  async function deleteVacation() {
    try {
      const sure = confirm("Are you sure you want to delete this vacation ?");
      if (!sure) return;
      await vacationService.deleteVacation(props.vacation._id);
      notify.success("Vacation has been deleted.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="vacation-card">
      <div className="cloud-shape">
        {user?.roleId === 2 && (
          <>
            <div className="plane-wrapper">
              <div className="trail"></div>
              <span className="plane"><Plane size={40}/></span>
            </div>

            <div className="like-circle" onClick={handleVacationLike}>
              <span className="heart">{liked ? <HeartOff /> : <Heart color="red"/> }</span>
              <span className="like-count">{likes}</span>
            </div>
          </>
        )}
        <h2 className="destination">{props.vacation.destination}</h2>
        <span className="dates">
            <CalendarRange/>
            {props.vacation.startDate.toString().slice(0, 10)} –{" "}
            {props.vacation.endDate.toString().slice(0, 10)}
          </span>
        <div className="image-wrapper">
          <img
            className="image"
            src={props.vacation.imageUrl}
            alt={props.vacation.destination}
          />
        </div>
        <p className="description">{props.vacation.description}</p>
        <span className="price">{props.vacation.price} $</span>

        {user?.isAdmin() && (
          <>
            <div className="edit-button-wrapper">
              <NavLink to={"/vacations/edit/" + props.vacation._id}>
                <button className="editButton"><SquarePen size={30}/></button>
              </NavLink>
            </div>

            <div className="delete-button-wrapper">
              <NavLink to="#" onClick={deleteVacation}>
                <button className="deleteButton"><Trash2 size={30}/></button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
