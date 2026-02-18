import { NavLink } from "react-router-dom";
import styles from "./GlobalNav.module.css";
import { BellIcon, UserIcon } from "../Icons/Icons";

export default function GlobalNav() {
  return (
    <div className={styles.globalNav}>
      <div className={styles.left}>
        <nav className={styles.menu}>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/dashboards"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Dashboards
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Teams
          </NavLink>

          <NavLink
            to="/apps"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Apps
          </NavLink>
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
