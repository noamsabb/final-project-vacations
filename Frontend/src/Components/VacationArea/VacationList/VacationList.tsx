import { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./VacationList.css";
import { vacationService } from "../../../Services/VacationService";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { AddVacation } from "../AddVacation/AddVacation";
import { userService } from "../../../Services/UserService";
import { useTitle } from "../../../Utils/UseTitle";

export function VacationList() {
    useTitle("Like2Vacation - Vacations");
  const user = useSelector((state: AppState) => state.user);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const [likedButton, setLikedButton] = useState(false);
  const [totalVacations, setTotalVacations] = useState<number>(0)

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
  if (!showAddForm) {
    if (likedButton) {
      // Handling Pagination (frontEnd only for liked Vacations)
      userService.getLikedVacationsFiltered(filter, user._id)
        .then(likedVacations=>{
          setTotalVacations(likedVacations.length);
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
          setTotalVacations(result.total);
          setTotalPages(Math.ceil(result.total / limit));
        })
        .catch(console.error);
    }
  }
}, [page, filter, showAddForm, likedButton, refreshTrigger]);

  function handleVacationDeleted() {
    setRefreshTrigger(prev => prev + 1);
  }

  function scrollToTop() {
    // Scroll the window
    window.scrollTo(0, 0);
    
    // Also scroll the main content area
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo(0, 0);
    }
  }

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
            className={`liked-button ${likedButton ? "active" : ""}`}
            onClick={() => handleFilterChange("liked")}
          >
            Liked Vacations
          </button>
        )}
      </div>


        <span className="total-vacations">Total Vacations online: {totalVacations}</span>

      {user?.role === "Admin" && (
        <button 
          className="admin-add-button"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Vacation
        </button>
      )}

      {showAddForm && 
        createPortal(
          <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AddVacation
                onClose={() => {
                  setShowAddForm(false);
                }}
              />
            </div>
          </div>,
          document.body
        )
      }

      <div className="VacationGrid">
        {vacations.length === 0 ? (
          <p>
            We couldn’t find any vacations that match… yet. <br />
            Check again soon!
          </p>
        ) : (
          vacations.map((v) => <VacationCard key={v._id} vacation={v} onVacationDeleted={handleVacationDeleted} />)
        )}
      
      </div>


      {/* Pagination controls */}
      <div className="pagination">
        <button 
          disabled={page === 1} 
          onClick={() => {
            setPage(page - 1);
            scrollToTop();
          }}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
            scrollToTop();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
