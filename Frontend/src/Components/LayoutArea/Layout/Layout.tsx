import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <header>
                <Menu />
                <Header />
                <UserMenu />
            </header>          
            <main>
                <Routing />
            </main>
            <footer>Copyrights</footer>
        </div>
    );
}
