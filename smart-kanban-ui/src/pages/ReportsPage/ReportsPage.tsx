import { useEffect, useState, useMemo } from "react";
import styles from "./ReportsPage.module.css";
import type { Task } from "../../types/task";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const STORAGE_KEY = "smart-kanban-board";

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

const AREAS = ["frontend", "backend", "qa", "devops", "ux", "product"];

const AREA_COLORS: Record<string, string> = {
  frontend: "#3b82f6",
  backend: "#22c55e",
  qa: "#f59e0b",
  devops: "#ef4444",
  ux: "#8b5cf6",
  product: "#06b6d4",
};

export default function ReportsPage() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [rotation, setRotation] = useState(90);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: ColumnType[] = JSON.parse(raw);
    setColumns(parsed);
  }, []);

  const allTasks = columns.flatMap(col => col.tasks);
  const totalTasks = allTasks.length;

  const doneTasks = columns
    .filter(col => col.title.toLowerCase().includes("done"))
    .flatMap(col => col.tasks).length;

  const progressTasks = columns
    .filter(col => col.title.toLowerCase().includes("progress"))
    .flatMap(col => col.tasks).length;

  const todoTasks = totalTasks - doneTasks - progressTasks;

  function getAreaStats(area: string) {
    const tasks = allTasks.filter(task => task.area === area);
    const total = tasks.length;

    let done = 0;
    let progress = 0;
    let todo = 0;

    columns.forEach(col => {
      const colTitle = col.title.toLowerCase();

      col.tasks.forEach(task => {
        if (task.area !== area) return;

        if (colTitle.includes("done")) done++;
        else if (colTitle.includes("progress")) progress++;
        else todo++;
      });
    });

    return { total, done, progress, todo };
  }

  const pieData = AREAS.map(area => {
    const stats = getAreaStats(area);
    return {
      name: area.toUpperCase(),
      area,
      value: stats.total,
      ...stats,
    };
  }).filter(item => item.value > 0);

  const selectedTasks = useMemo(() => {
    if (!selectedArea) return [];

    const tasks: { task: Task; status: string }[] = [];

    columns.forEach(col => {
      const colTitle = col.title.toLowerCase();

      col.tasks.forEach(task => {
        if (task.area !== selectedArea) return;

        let status = "todo";

        if (colTitle.includes("done")) status = "done";
        else if (colTitle.includes("progress")) status = "progress";

        tasks.push({ task, status });
      });
    });

    return tasks;
  }, [selectedArea, columns]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Project Report</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Done</h3>
          <p>{doneTasks}</p>
        </div>

        <div className={styles.statCard}>
          <h3>In Progress</h3>
          <p>{progressTasks}</p>
        </div>

        <div className={styles.statCard}>
          <h3>To Do</h3>
          <p>{todoTasks}</p>
        </div>
      </div>

      <div className={styles.pieSection}>
        <div className={styles.pieHeader}>
          <h2>
            {selectedArea
              ? `${selectedArea.toUpperCase()} Overview`
              : "Tasks Distribution by Area"}
          </h2>

          {selectedArea && (
            <button
              className={styles.backButton}
              onClick={() => {
                setSelectedArea(null);
                setRotation(90);
                setHoveredArea(null);
              }}
            >
              ← All Areas
            </button>
          )}
        </div>

        <div className={styles.pieLayout}>
          <div className={styles.pieWrapper}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
               <Pie
                data={
                  selectedArea
                    ? [pieData.find(p => p.area === selectedArea)!]
                    : pieData
                }
                dataKey="value"
                innerRadius={95}
                outerRadius={130}
                paddingAngle={selectedArea ? 0 : 4}
                startAngle={rotation}
                endAngle={rotation - 360}
                isAnimationActive
                animationDuration={800}
                animationEasing="ease-in-out"
                onMouseEnter={(_, index) => {
                  if (!selectedArea)
                    setHoveredArea(pieData[index].area);
                }}
                onMouseLeave={() => {
                  if (!selectedArea)
                    setHoveredArea(null);
                }}
                  onClick={(data: any) => {
                    const index = pieData.findIndex(p => p.area === data.area);

                    if (index === -1) return;

                    const sliceAngle = 360 / pieData.length;
                    const targetRotation = 90 - index * sliceAngle;

                    setRotation(prev => {
                      const diff = targetRotation - prev;
                      return prev + diff;
                    });

                    setSelectedArea(data.area);
                  }}
              >

                  {(selectedArea
                    ? [pieData.find(p => p.area === selectedArea)!]
                    : pieData
                  ).map((entry) => {
                    const isActive =
                      hoveredArea === entry.area;

                    return (
                      <Cell
                        key={entry.area}
                        fill={AREA_COLORS[entry.area]}
                        style={{
                          transition:
                            "opacity 0.35s cubic-bezier(.16,.8,.24,1), transform 0.35s cubic-bezier(.16,.8,.24,1), filter 0.35s ease",
                          opacity:
                            hoveredArea && !isActive
                              ? 0.15
                              : 1,
                          transform: isActive
                            ? "scale(1.06)"
                            : "scale(1)",
                          transformOrigin: "center",
                          filter: isActive
                            ? `drop-shadow(0 0 20px ${AREA_COLORS[entry.area]})`
                            : "none",
                        }}
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className={styles.pieCenter}>
              {selectedArea ? (
                <>
                  <span>{selectedTasks.length}</span>
                  <small>{selectedArea.toUpperCase()}</small>
                </>
              ) : hoveredArea ? (
                <>
                  <span>
                    {
                      pieData.find(p => p.area === hoveredArea)
                        ?.value
                    }
                  </span>
                  <small>
                    {hoveredArea.toUpperCase()} – Task
                  </small>
                </>
              ) : (
                <>
                  <span>{totalTasks}</span>
                  <small>Total</small>
                </>
              )}
            </div>

          </div>

          {!selectedArea && (
            <div className={styles.legendContainer}>
              {pieData.map(item => (
                <div
                  key={item.area}
                  className={styles.legendItem}
                  onClick={() => setSelectedArea(item.area)}
                >
                  <div
                    className={styles.legendColor}
                    style={{ background: AREA_COLORS[item.area] }}
                  />
                  <div className={styles.legendText}>
                    <strong>{item.name}</strong>
                    <span>{item.value} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedArea && (
          <div className={styles.inlineTasks}>
            {selectedTasks.map(({ task, status }) => (
              <div key={task.id} className={styles.taskItem}>
                <span>{task.title}</span>
                <span
                  className={`${styles.status} ${
                    status === "done"
                      ? styles.done
                      : status === "progress"
                      ? styles.progress
                      : styles.todo
                  }`}
                >
                  {status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
