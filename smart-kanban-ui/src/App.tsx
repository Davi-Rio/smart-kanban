import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Board from "./components/Board/Board";
import BacklogPage from "./pages/BacklogPage/BacklogPage";
import RoadmapPage from "./pages/RoadmapPage/RoadmapPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";
import IssuesPage from "./pages/IssuesPage/IssuesPage";
import CodePage from "./pages/CodePage/CodePage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import ReleasesPage from "./pages/ReleasesPage/ReleasesPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  return (
    <MainLayout
      onNewTask={() => setIsModalOpen(true)}
      filterText={filterText}
      onFilterChange={setFilterText}
      areaFilter={areaFilter}
      onAreaChange={setAreaFilter}
    >
      <Routes>

        {/* Redirect raiz para /board */}
        <Route path="/" element={<Navigate to="/board" replace />} />

        {/* BOARD */}
        <Route
          path="/board"
          element={
            <Board
              isModalOpen={isModalOpen}
              onOpenModal={() => setIsModalOpen(true)}
              onCloseModal={() => setIsModalOpen(false)}
              onClearFilter={() => setFilterText("")}
              filterText={filterText}
              areaFilter={areaFilter}
            />
          }
        />

        {/* OUTRAS PÁGINAS */}
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/releases" element={<ReleasesPage />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Routes>
    </MainLayout>
  );
}

export default App;
