import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import Board from "./components/Board/Board";

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
      <Board
        isModalOpen={isModalOpen}
        onOpenModal={() => setIsModalOpen(true)}
        onCloseModal={() => setIsModalOpen(false)}
        onClearFilter={() => setFilterText("")}
        filterText={filterText}
        areaFilter={areaFilter}
      />
    </MainLayout>
  );
}

export default App;
