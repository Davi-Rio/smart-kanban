import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

type AreaOption = {
  id: string | null;
  label: string;
};

const AREAS: AreaOption[] = [
  { id: null, label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "qa", label: "QA" },
  { id: "devops", label: "DevOps" },
  { id: "ux", label: "UX" },
  { id: "product", label: "Product" },
];

type Props = {
  onNewTask: () => void;
  filterText: string;
  onFilterChange: (value: string) => void;
  areaFilter: string | null;
  onAreaChange: (area: string | null) => void;
};

function getPageTitle(pathname: string) {
  switch (pathname) {
    case "/roadmap":
      return "Roadmap";
    case "/backlog":
      return "Backlog";
    case "/board":
    case "/":
      return "Board";
    case "/reports":
      return "Reports";
    case "/issues":
      return "Issues";
    case "/code":
      return "Code";
    case "/security":
      return "Security";
    case "/releases":
      return "Releases";
    case "/settings":
      return "Project Settings";
    default:
      return "Board";
  }
}

export default function Header({
  onNewTask,
  filterText,
  onFilterChange,
  areaFilter,
  onAreaChange,
}: Props) {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  const isBoard = location.pathname === "/board" || location.pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {isBoard && (
        <div className={styles.right}>
          <div className={styles.areaFilter}>
            {AREAS.map(area => (
              <button
                key={area.id ?? "all"}
                data-area={area.id ?? "all"}
                className={`${styles.areaButton} ${
                  areaFilter === area.id ? styles.active : ""
                }`}
                onClick={() => onAreaChange(area.id)}
              >
                {area.label}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <input
              className={styles.filterInput}
              type="text"
              placeholder="Filter tasks..."
              value={filterText}
              onChange={e => onFilterChange(e.target.value)}
            />

            <button
              className={styles.buttonPrimary}
              onClick={onNewTask}
            >
              New Task
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
