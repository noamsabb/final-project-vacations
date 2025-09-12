import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

export function VacationList() {

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filter, setFilter] = useState("");

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
      <select value={filter} onChange={handleFilterChange}>
        <option disabled value="">
          Select Filter ...
        </option>

        <option value="all">All Vacations</option>
        <option value="ongoing">Ongoing Vacations</option>
        <option value="future">Future Vacations</option>
      </select>

      <div className="VacationGrid">
        {vacations.length === 0 ? 
          (<p>We couldn’t find any vacations that match… yet. <br />Check again soon!</p>) : 
          (vacations.map(v => <VacationCard key={v._id} vacation = {v}/>))}
      </div>
    </div>
  );
}
