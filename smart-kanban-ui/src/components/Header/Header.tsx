import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Marketing Board</h2>

      <div className={styles.actions}>
        <button className={styles.button}>Filter</button>
        <button className={styles.buttonPrimary}>New Task</button>
      </div>
    </header>
  );
}
