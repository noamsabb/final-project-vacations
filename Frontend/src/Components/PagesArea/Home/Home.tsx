import { useTitle } from "../../../Utils/UseTitle";
import logo from "../../../Assets/images/Logo.png"
import "./Home.css";

export function Home() {
    useTitle("Like2Vacation - Home");

    return (
        <div className="Home">

            <h3>Welcome to Like2Vacation
            </h3>

            <img src={logo} />
            <p>
                 Where Every Like Gets You Closer to Your Next Getaway.
Discover stunning destinations, browse curated vacation experiences, and tap into the trips you truly love. Whether you're dreaming of tropical beaches, mountain escapes, or cultural adventures, just like your favorites and plan with ease. Your next vacation starts with a single click.
            </p>

        </div>
    );
}
