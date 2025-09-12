import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import { Role } from "../../../Models/Role";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { AddVacation } from "../AddVacation/AddVacation";

export function VacationList() {

    const user = useSelector((state: AppState) => state.user);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filter, setFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [activeFilter, setActiveFilter] = useState<string>("All");



    useEffect(() => {
    vacationService.getAllVacations("all").then(setVacations).catch(console.error);
  }, []);

  async function handleFilterChange(args: ChangeEvent<HTMLSelectElement>) {
    const filter = args.target.value;
    setFilter(filter);

    const vacations = await vacationService.getAllVacations(filter);
    setVacations(vacations);
  }

  return (
    <div className="VacationList">

    <div>

      <button
  className={activeFilter === "All" ? "active" : ""}
  onClick={() => setActiveFilter("All")}
>
  All
</button>

<button
  className={activeFilter === "Upcoming" ? "active" : ""}
  onClick={() => setActiveFilter("Upcoming")}
>
  Upcoming
</button>

    </div>



      <select value={filter} onChange={handleFilterChange}>
        <option disabled value="">
          Select Filter ...
        </option>

        <option value="all">All Vacations</option>
        <option value="ongoing">Ongoing Vacations</option>
        <option value="future">Future Vacations</option>
      </select>
{user?.role === Role.Admin && (
  <button onClick={() => setShowAddForm(true)}>➕ Add Vacation</button>
)}

{showAddForm && (
  <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <AddVacation onClose={() => setShowAddForm(false)} />
    </div>
  </div>
)}

      <div className="VacationGrid">
        {vacations.length === 0 ? 
          (<p>We couldn’t find any vacations that match… yet. <br />Check again soon!</p>) : 
          (vacations.map(v => <VacationCard key={v._id} vacation = {v}/>))}
      </div>
    </div>
  );
}
