import { Navigate, Route, Routes } from "react-router-dom";
import { LikeReport } from "../../AdminArea/LikeReport/LikeReport";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { AddVacation } from "../../VacationArea/AddVacation/AddVacation";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

export function Routing() {
  return (
    <div className="Routing">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />

        <Route path="/vacations" element={<VacationList />} />

        <Route path="/new" element={<AddVacation />} />

        <Route path="/like-report" element={<LikeReport />} />

        <Route path="/vacations/edit/:_id" element={<EditVacation />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
