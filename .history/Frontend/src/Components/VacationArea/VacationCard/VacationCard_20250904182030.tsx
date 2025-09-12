import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { userService } from "../../../Services/UserService";
import { useState, useEffect } from "react";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { setUser, userSlice } from "../../../Redux/UserSlice";

type VacationCardProps = {
  vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
  // Get current user from Redux store
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

const [liked, setLiked] = useState<boolean>(false);
const [likes, setLikes] = useState(props.vacation.likes);

// Update liked state when user or vacation changes
useEffect(() => {
  if (user?.likedVacations) {
    setLiked(user.likedVacations.includes(props.vacation._id));
  }
}, [user?.likedVacations, props.vacation._id]);

//   async function handleVacationLike() {
//     try {
//       await userService.likeVacation(user?._id, props.vacation._id);

//       // Update local state (re-render)
//       if (liked) {
//         setLiked(false);
//         setLikes((prev) => prev - 1);
//         dispatch(setUser({
//         ...user,
//         likedVacations: user.likedVacations.filter(id => id !== props.vacation._id)
//       }));
//       } else {
//         setLiked(true);
//         setLikes((prev) => prev + 1);
//         dispatch(setUser({
//         ...user,
//         likedVacations: [...user.likedVacations, props.vacation._id]
//       }));
//       }
//     } catch (err) {
//       console.error("Like failed", err);
//     }
//   }

async function handleVacationLike() {
  try {
    const response = await userService.likeVacation(user._id, props.vacation._id);

    const updatedUser = response.data.user;
    const updatedVacation = response.data.vacation;

    // Update Redux store with new user (important for likedVacations)
    dispatch(userSlice.actions.initUser(updatedUser));

    // Update local state to re-render
    setLiked(updatedUser.likedVacations.includes(props.vacation._id));
    setLikes(updatedVacation.likes);
  } catch (err) {
    console.error("Like failed", err);
    notify.error("Something went wrong while liking the vacation.");
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
    <div className="vacation-card">
      <div className="cloud-shape">
        {/* Airplane Trail */}
        <div className="plane-wrapper">
          <div className="trail"></div>
          <span className="plane">✈️</span>
        </div>
        {user?.role === Role.User && (
          <div className="like-circle" onClick={handleVacationLike}>
            <span className="heart">{liked ? "❤️" : "🤍"}</span>
            <span className="like-count">{likes}</span>
          </div>
        )}
        <h2 className="destination">{props.vacation.destination}</h2>
        <div className="image-wrapper">
          <img
            className="image"
            src={props.vacation.imageUrl}
            alt={props.vacation.destination}
          />
        </div>
        <p className="description">{props.vacation.description}</p>
        <div className="info-row">
          <span className="dates">
            {props.vacation.startDate.toString().slice(0, 10)} –{" "}
            {props.vacation.endDate.toString().slice(0, 10)}
          </span>
          <span className="price">{props.vacation.price} $</span>
        </div>
        {/* User Only
        {user?.role === Role.User && (
          <span onClick={handleVacationLike} className="likes">
            {liked ? "❤️" : "🤍"} {likes}
          </span>
        )} */}
        {/* Admin Only */}
        {user?.role === Role.Admin && (
          <div className="admin-buttons">
            <NavLink to={"/vacations/edit/" + props.vacation._id}>
              <button>Edit</button>
            </NavLink>
            <NavLink to="#" onClick={deleteVacation}>
              <button>Delete</button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
