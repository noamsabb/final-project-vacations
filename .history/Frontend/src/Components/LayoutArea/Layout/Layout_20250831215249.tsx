import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <hr />
            <aside>
                <Menu />
            </aside>            
            <main>
                <Routing />
            </main>
        </div>
    );
}
