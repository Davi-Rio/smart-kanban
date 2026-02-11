import styles from "./Header.module.css";

type Props = {
  onNewTask: () => void;
  filterText: string;
  onFilterChange: (value: string) => void;
};

export default function Header({
  onNewTask,
  filterText,
  onFilterChange,
}: Props) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Marketing Board</h2>

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
    </header>
  );
}
