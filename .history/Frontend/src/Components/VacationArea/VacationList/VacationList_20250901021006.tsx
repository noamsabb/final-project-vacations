import { ChangeEvent, useState } from "react";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";
import { VacationModel } from "../../../Models/VacationModel";

export function VacationList() {
  // const[selectedFilter,setSelectedFilter] = useState<string | null>(null);
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  async function handleFilterChange(args: ChangeEvent<HTMLSelectElement>) {
    const filter = args.target.value;

    const vacations = await vacationService.getAllVacations(filter);
    setVacations(vacations);
  }

  return (
    <div className="VacationList">
      <select value="" onChange={handleFilterChange}>
        <option disabled value="">
          Select Filter ...
        </option>

        <option value="all">All Vacations</option>
        <option value="ongoing">Ongoing Vacations</option>
        <option value="future">Future Vacations</option>
      </select>

      <div className="VacationGrid">
        {vacations.map(v => (
          <div key={v._id}>
            <hr />
            {v.destination} 
            <br />
            {v.startDate.toString()} - {v.endDate.toString()} 
            <br />
            {v.description}
            <br />
            {v.price currency:"ILS"}
          </div>
        ))}
      </div>
    </div>
  );
}
