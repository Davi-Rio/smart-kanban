import styles from './Sidebar.module.css';
import { BoardsIcon, SettingsIcon } from '../Icons/Icons.tsx';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>SK</div>

      <nav className={styles.nav}>
        <div className={`${styles.item} ${styles.itemActive}`}>
          <span className={styles.icon}>
            <BoardsIcon />
          </span>
          <span className={styles.label}>Boards</span>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>
            <SettingsIcon />
          </span>
          <span className={styles.label}>Settings</span>
        </div>
      </nav>
    </aside>
  );
}
