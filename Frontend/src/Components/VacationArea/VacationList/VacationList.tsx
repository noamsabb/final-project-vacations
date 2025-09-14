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
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const [likedButton, setLikedButton] = useState(false);

  useEffect(() => {
  if (!showAddForm) {
    if (likedButton) {
      // Handling Pagination (frontEnd only for liked Vacations)
      userService.getLikedVacationsFiltered(filter, user._id)
        .then(likedVacations=>{
          setTotalPages(Math.ceil(likedVacations.length / limit));
          setVacations(likedVacations.slice(((page-1)*limit),page*limit));
        })
        .catch(console.error);
    } else {
      // Handling Pagination (BackEnd and frontEnd for not liked Vacations)
      vacationService
        .getAllVacations(filter, page, limit)
        .then((result) => {
          setVacations(result.vacations);
          setTotalPages(Math.ceil(result.total / limit));
        })
        .catch(console.error);
    }
  }
}, [page, filter, showAddForm, likedButton]);


  async function handleFilterChange(selectedFilter: string) {
    if (selectedFilter === "liked") {
      //Flip like button status
      setLikedButton(!likedButton);
      setPage(1);
    } else {
      setFilter(selectedFilter);
      setPage(1);
    }
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

        {user?.role === "User" && (
          <button
            className={likedButton ? "active" : ""}
            onClick={() => handleFilterChange("liked")}
          >
            Liked Vacations
          </button>
        )}
      </div>

      {user?.role === "Admin" && (
        <button onClick={() => setShowAddForm(true)}>➕ Add Vacation</button>
      )}

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddVacation
              onClose={() => {
                setShowAddForm(false);
              }}
            />
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

      {/* Pagination controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
