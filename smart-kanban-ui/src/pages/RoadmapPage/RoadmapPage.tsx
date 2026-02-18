import { useEffect, useState } from "react";
import styles from "./Roadmap.module.css";
import type { Task } from "../../types/task";

const STORAGE_KEY = "smart-kanban-board";

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

type Epic = {
  id: string;
  title: string;
  quarter: string;
  description: string;
};

const EPICS: Epic[] = [
  {
    id: "core-auth",
    title: "Authentication & Authorization",
    quarter: "Q1 2026",
    description: "Secure authentication and protected routes.",
  },
  {
    id: "core-project",
    title: "Project Management Core",
    quarter: "Q1 2026",
    description: "Project lifecycle management system.",
  },
  {
    id: "ux-refactor",
    title: "Drag & Drop UX Refinement",
    quarter: "Q1 2026",
    description: "Improve board performance and UX.",
  },
  {
    id: "multi-user",
    title: "Multi-user Workspace",
    quarter: "Q2 2026",
    description: "Organization-based multi-tenant architecture.",
  },
  {
    id: "comments",
    title: "Task Discussion System",
    quarter: "Q2 2026",
    description: "Thread-based task collaboration.",
  },
];

export default function RoadmapPage() {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed: ColumnType[] = JSON.parse(raw);
    setColumns(parsed);
  }, []);

  function getEpicProgress(epicId: string) {
    const tasks = columns.flatMap(col =>
      col.tasks.filter(task => task.epicId === epicId)
    );

    const total = tasks.length;
    if (total === 0) return 0;

    let done = 0;

    columns.forEach(col => {
      const title = col.title.toLowerCase();
      if (!title.includes("done")) return;

      done += col.tasks.filter(task => task.epicId === epicId).length;
    });

    return Math.round((done / total) * 100);
  }

  function getEpicTaskCount(epicId: string) {
    return columns.flatMap(col =>
      col.tasks.filter(task => task.epicId === epicId)
    ).length;
  }

  const grouped = EPICS.reduce<Record<string, Epic[]>>((acc, epic) => {
    if (!acc[epic.quarter]) acc[epic.quarter] = [];
    acc[epic.quarter].push(epic);
    return acc;
  }, {});

  return (
    <div className={styles.roadmapWrapper}>
      {Object.entries(grouped).map(([quarter, epics]) => (
        <div key={quarter} className={styles.phase}>
          <h2 className={styles.quarterTitle}>{quarter}</h2>

          <div className={styles.cardGrid}>
            {epics.map(epic => {
              const progress = getEpicProgress(epic.id);
              const totalTasks = getEpicTaskCount(epic.id);

              return (
                <div key={epic.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.taskCount}>
                      {totalTasks} tasks
                    </span>
                    <span className={styles.progressLabel}>
                      {progress}%
                    </span>
                  </div>

                  <h3 className={styles.title}>{epic.title}</h3>
                  <p className={styles.description}>
                    {epic.description}
                  </p>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
