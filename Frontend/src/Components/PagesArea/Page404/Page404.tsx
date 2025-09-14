import { NavLink } from "react-router-dom";
import "./Page404.css";
import imageSource from "../../../assets/images/404.png";

export function Page404() {
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
