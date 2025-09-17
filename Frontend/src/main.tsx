import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Components/LayoutArea/Layout/Layout.tsx";
import "./index.css";
// import { vacationService } from './Services/VacationService.ts'
import { Provider } from "react-redux";
import { store } from "./Redux/Store.ts";
import { interceptor } from "./Utils/Interceptor.ts";

interceptor.create();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
);
