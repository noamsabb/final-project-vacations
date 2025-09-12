import { ChangeEvent, useState } from "react";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";

export function VacationList() {

    const[selectedFilter,setSelectedFilter] = useState<string | null>(null);

  function handleFilterChange(args: ChangeEvent<HTMLSelectElement>) {
    const filter = args.target.value;
    vacationService.getAllVacations(filter);
  }


    return (
        <div className="VacationList">
		
        <select value={selectedFilter ?? ""} onChange={handleFilterChange}>

        <option disabled value="">
            Select Filter ...
        </option>


        </select>


        </div>
    );
}
