import { ChangeEvent, useEffect, useState } from "rea<button
  className={filter === "upcoming" ? "active" : ""}
  onClick={() => handleFilterChange("upcoming")}
>
  Upcoming Vacations
</button>
<button
  className={filter === "ongoing" ? "active" : ""}
  onClick={() => handleFilterChange("ongoing")}
>
  Ongoing Vacations
</button>"./VacationList.css";
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
  // const [filter, setFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

   const [filter, setFilter] = useState<string>("all");



    useEffect(() => {
    vacationService.getAllVacations("all").then(setVacations).catch(console.error);
  }, []);

  // async function handleFilterChange(args: ChangeEvent<HTMLSelectElement>) {
  //   const filter = args.target.value;
  //   setFilter(filter);

  //   const vacations = await vacationService.getAllVacations(filter);
  //   setVacations(vacations);
  // }

  async function handleFilterChange(selectedFilter: string) {
    setFilter(selectedFilter);
    
    const vacations = await vacationService.getAllVacations(selectedFilter);

    setVacations(vacations);
  }

  return (
    <div className="VacationList">

    <div className="filterButton">

      <button
  className={filter === "all" ? "active" : ""}
  onClick={()=>handleFilterChange("all")}
>
  All vacations
</button>

<button
  className={filter === "Upcoming" ? "active" : ""}
  onClick={() => handleFilterChange("upcoming")}
>
  Upcoming Vacations
</button>
<button
  className={filter === "Ongoing" ? "active" : ""}
  onClick={() => handleFilterChange("ongoing")}
>
  Ongoing Vacations
</button>

    </div>



      {/* <select value={filter} onChange={handleFilterChange}>
        <option disabled value="">
          Select Filter ...
        </option>

        <option value="all">All Vacations</option>
        <option value="ongoing">Ongoing Vacations</option>
        <option value="upcoming">upcoming Vacations</option>
      </select> */}
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
