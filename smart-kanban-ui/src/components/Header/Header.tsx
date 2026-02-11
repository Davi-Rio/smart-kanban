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

export default function Header({
  onNewTask,
  filterText,
  onFilterChange,
  areaFilter,
  onAreaChange,
}: Props) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Marketing Board</h2>

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
    </header>
  );
}
