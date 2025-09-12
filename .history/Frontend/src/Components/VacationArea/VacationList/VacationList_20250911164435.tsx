import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { AddVacation } from "../AddVacation/AddVacation";
import { userService } from "../../../Services/UserService";

export function VacationList() {
  const user = useSelector((state: AppState) => state.user);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [filter, setFilter] = useState<string>("all");
  const [likedButton, setLikedButton] = useState(false);

  useEffect(() => {    
    vacationService
      .getAllVacations("all")
      .then(setVacations)
      .catch(console.error);
  }, []);

  async function handleFilterChange(selectedFilter: string) {
    let vacations: VacationModel[];
    let newLikedState: boolean;

    if (selectedFilter === "liked") {
      newLikedState = !likedButton;
      setLikedButton(newLikedState);
    }

    if (selectedFilter !== "liked") {
      setFilter(selectedFilter);
    }

    if (newLikedState) {
      vacations = await userService.getLikedVacationsFiltered(
        selectedFilter,
        user._id
      );
    } else {
      vacations = await vacationService.getAllVacations(selectedFilter);
    }

    setVacations(vacations);
  }

  return (
    <div className="VacationList">
      <div className="filterButton">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => handleFilterChange("all")}
        >
          All vacations
        </button>

        <button
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
        </button>

       {user?.role === "User" && (<button
          className={likedButton ? "active" : ""}
          onClick={() => handleFilterChange("liked")}
        >
          Liked Vacations
        </button>)}
      </div>

      {user?.role === "Admin" && (
        <button onClick={() => setShowAddForm(true)}>➕ Add Vacation</button>
      )}

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddVacation onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      <div className="VacationGrid">
        {vacations.length === 0 ? (
          <p>
            We couldn’t find any vacations that match… yet. <br />
            Check again soon!
          </p>
        ) : (
          vacations.map((v) => <VacationCard key={v._id} vacation={v} />)
        )}
      </div>
    </div>
  );
}
