import { useEffect, useState } from "react";
import "./LikeReport.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export function LikeReport() {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllVacations("all")
      .then(setVacations)
      .catch(console.error);
  }, []);

  const graphData = vacations.map((v) => ({
    destination: v.destination,
    likes: v.likes,
  }));

  return (
    <div className="LikeReport">
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
