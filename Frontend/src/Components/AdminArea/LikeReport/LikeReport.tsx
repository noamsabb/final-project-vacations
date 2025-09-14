import { useEffect, useState } from "react";
import "./LikeReport.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTitle } from "../../../Utils/UseTitle";

export function LikeReport() {
  useTitle("Like2Vacation - Vacations Report");
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllVacations("all")
      .then((result) => {
        setVacations(result.vacations);
        console.log(result.vacations);
      })
      .catch(console.error);
  }, []);

  const graphData = vacations.map((v) => ({
    destination: v.destination,
    likes: v.likes,
  }));

  const totalLikes = vacations.reduce((sum, v) => sum + v.likes, 0);

  return (
    <div className="LikeReport">

      <div className="stats">
        <span>Stats:</span>
        <br />
        <span>Total Vacations online: {vacations.length}</span>
        <br />

        <span>Total Likes: {totalLikes}</span>
        <br />
        <button onClick={vacationService.getVacationCsv}>
          Download Csv File 📄{" "}
        </button>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <h2>Likes Report</h2>
        <ResponsiveContainer>
          <BarChart data={graphData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destination" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="likes" fill="#9f1a09ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
