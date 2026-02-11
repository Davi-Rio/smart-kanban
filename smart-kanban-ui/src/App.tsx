import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import Board from "./components/Board/Board";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  return (
    <MainLayout
      onNewTask={() => setIsModalOpen(true)}
      filterText={filterText}
      onFilterChange={setFilterText}
    >
      <Board
        isModalOpen={isModalOpen}
        onOpenModal={() => setIsModalOpen(true)}   
        onCloseModal={() => setIsModalOpen(false)} 
        onClearFilter={() => setFilterText("")}
        filterText={filterText}
      />
    </MainLayout>
  );
}

export default App;
