import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { userService } from "../../../Services/UserService";
import { useState } from "react";
import { Role } from "../../../Models/Role";

type VacationCardProps = {
  vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
  // Get current user from Redux store
  const user = useSelector((state: AppState) => state.user);
  console.log(user?.role);
  
  const [liked, setLiked] = useState<boolean>(user?.likedVacations?.includes(props.vacation._id));
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
  async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;
            await productService.deleteProduct(_id)
            notify.success("Product has been deleted.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

  return (
    <div className="VacationCard">
      <span>{props.vacation.destination}</span>
      <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
      <span>{props.vacation.description}</span>
      <span>
        {props.vacation.startDate.toString()}-{" "}
        {props.vacation.endDate.toString()}
      </span>
      <span>{props.vacation.price} $</span>

      {/* User Only */}
 { user?.role === Role.User &&    <span onClick={handleVacationLike}>
        {liked ? "❤️" : "🤍"} {likes}
      </span>}

      {/* Admin Only */}
      {user?.role === Role.Admin && 
      <>
      <NavLink to={"/vacations/edit/" + props.vacation._id}><button>Edit</button></NavLink>
      <NavLink to="#" onClick={deleteMe}><button>Delete</button></NavLink>
        </>}
    </div>
  );
}
