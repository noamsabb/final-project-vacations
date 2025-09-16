import { PlaneTakeoff, Sun } from "lucide-react";
import "./Header.css";

export function Header() {
  return (
    <div className="Header">
      <div className="header-block">
        <PlaneTakeoff size={34} className="plane-left" />
        <h1>Like2Vacation</h1>
        <Sun size={34} className="sun" />
      </div>
    </div>
  );
}
