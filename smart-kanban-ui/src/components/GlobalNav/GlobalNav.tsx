import styles from "./GlobalNav.module.css";
import { BellIcon, UserIcon } from "../Icons/Icons";

export default function GlobalNav() {
  return (
    <div className={styles.globalNav}>
      <div className={styles.left}>
        <nav className={styles.menu}>
          <span>Projects</span>
          <span>Dashboards</span>
          <span>Teams</span>
          <span>Apps</span>
        </nav>
      </div>

      <div className={styles.right}>
        <div className={styles.icon}>
          <BellIcon size={18} />
          <span className={styles.badge} />
        </div>

        <div className={styles.avatar}>
          <UserIcon size={20} />
        </div>
      </div>
    </div>
  );
}
