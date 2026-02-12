import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

import {
  BoardsIcon,
  SettingsIcon,
  RoadmapIcon,
  BacklogIcon,
  ReportsIcon,
  IssuesIcon,
  CodeIcon,
  SecurityIcon,
  ReleaseIcon,
} from "../Icons/Icons";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>SK</div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>PLANNING</span>

          <NavLink to="/roadmap" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><RoadmapIcon /></span>
            <span className={styles.label}>Roadmap</span>
          </NavLink>

          <NavLink to="/backlog" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><BacklogIcon /></span>
            <span className={styles.label}>Backlog</span>
          </NavLink>

          <NavLink to="/board" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><BoardsIcon /></span>
            <span className={styles.label}>Board</span>
          </NavLink>

          <NavLink to="/reports" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><ReportsIcon /></span>
            <span className={styles.label}>Reports</span>
          </NavLink>

          <NavLink to="/issues" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><IssuesIcon /></span>
            <span className={styles.label}>Issues</span>
          </NavLink>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>DEVELOPMENT</span>

          <NavLink to="/code" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><CodeIcon /></span>
            <span className={styles.label}>Code</span>
          </NavLink>

          <NavLink to="/security" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><SecurityIcon /></span>
            <span className={styles.label}>Security</span>
          </NavLink>

          <NavLink to="/releases" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><ReleaseIcon /></span>
            <span className={styles.label}>Releases</span>
          </NavLink>
        </div>

        <div className={styles.section}>
          <NavLink to="/settings" className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }>
            <span className={styles.icon}><SettingsIcon /></span>
            <span className={styles.label}>Project settings</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
