import { Navigate, Route, Routes } from "react-router-dom";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { AddVacation } from "../../VacationArea/AddVacation/AddVacation";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";

export function Routing() {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />

        <Route path="/vacations" element={<VacationList />} />

        <Route path="/new" element={<AddVacation />} />

        <Route path="/vacations/edit/:_id" element={<EditVacation />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
