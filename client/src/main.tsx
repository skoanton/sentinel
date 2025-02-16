import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import RoombaStatisticsTable from "./components/RoombaStatisticsTable.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import RoombasPage from "./views/RoombasPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path="/">
          <Route path="/" element={<App />} />
          <Route path="/roomba" element={<RoombasPage />} />
          <Route
            path="/roomba/statistics/:id"
            element={<RoombaStatisticsTable />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
