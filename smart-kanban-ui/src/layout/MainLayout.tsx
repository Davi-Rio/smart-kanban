import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

type Props = {
  children: React.ReactNode;
  onNewTask: () => void;
  filterText: string;
  onFilterChange: (value: string) => void;

  areaFilter: string | null;
  onAreaChange: (area: string | null) => void;
};

export default function MainLayout({
  children,
  onNewTask,
  filterText,
  onFilterChange,
  areaFilter,
  onAreaChange,
}: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Header
          onNewTask={onNewTask}
          filterText={filterText}
          onFilterChange={onFilterChange}
          areaFilter={areaFilter}
          onAreaChange={onAreaChange}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}

