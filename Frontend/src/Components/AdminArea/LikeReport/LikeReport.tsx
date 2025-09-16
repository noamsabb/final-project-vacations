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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(70, 130, 180, 0.2)" />
            <XAxis dataKey="destination" stroke="#4682B4" fontSize={12} />
            <YAxis stroke="#4682B4" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(135, 206, 235, 0.3)',
                borderRadius: '10px',
                boxShadow: '0 8px 25px rgba(70, 130, 180, 0.2)'
              }}
            />
            <Bar dataKey="likes" fill="url(#skyGradient)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B73FF" />
                <stop offset="100%" stopColor="#9C27B0" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
