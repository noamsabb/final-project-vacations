import { NavLink } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";
import "./Page404.css";
import imageSource from "../../../Assets/images/404.png";

export function Page404() {
    useTitle("Like2Vacation - Page Not Found");
  return (
    <div className="Page404">

      <img src={imageSource}/>
      
      <p>
        Looks like you got lost along the way…{" "}
        <NavLink to="/home">Let’s fly you back home ✈️</NavLink>
      </p>
    </div>
  );
}
