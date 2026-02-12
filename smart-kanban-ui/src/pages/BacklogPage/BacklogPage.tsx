import { useEffect, useState } from "react";
import styles from "./BacklogPage.module.css";
import type { Task } from "../../types/task";
import Select from "../../components/ui/Select";

const STORAGE_KEY = "smart-kanban-board";

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

const EPICS = [
  { id: null, label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "qa", label: "QA" },
  { id: "devops", label: "DevOps" },
  { id: "ux", label: "UX" },
  { id: "product", label: "Product" },
];

export default function BacklogPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [sprints, setSprints] = useState<string[]>(["Sprint 1"]);
  const [expanded, setExpanded] = useState<string[]>(["Sprint 1"]);
  const [selectedEpic, setSelectedEpic] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed: ColumnType[] = JSON.parse(raw);
    setColumns(parsed);

    const allTasks = parsed.flatMap(col => col.tasks);
    setTasks(allTasks);

    const existingSprints = Array.from(
      new Set(allTasks.map(t => t.sprint || "Sprint 1"))
    );

    const sorted = existingSprints.length
      ? existingSprints.sort(sortSprints)
      : ["Sprint 1"];

    setSprints(sorted);
  }, []);

  function sortSprints(a: string, b: string) {
    const numA = parseInt(a.replace("Sprint ", ""));
    const numB = parseInt(b.replace("Sprint ", ""));
    return numA - numB;
  }

  function createSprint() {
    const newSprint = `Sprint ${sprints.length + 1}`;
    setSprints(prev => [...prev, newSprint].sort(sortSprints));
    setExpanded(prev => [...prev, newSprint]);
  }

  function moveTask(taskId: string, newSprint: string) {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, sprint: newSprint } : t
    );

    setTasks(updatedTasks);

    const updatedColumns = columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t =>
        t.id === taskId ? { ...t, sprint: newSprint } : t
      ),
    }));

    setColumns(updatedColumns);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedColumns));
  }

  function toggleSprint(sprint: string) {
    setExpanded(prev =>
      prev.includes(sprint)
        ? prev.filter(s => s !== sprint)
        : [...prev, sprint]
    );
  }

  function getEpicProgress(area: string | null) {
    const filteredTasks = area
        ? columns.flatMap(col =>
            col.tasks.filter(task => task.area === area)
        )
        : columns.flatMap(col => col.tasks); 
    const total = filteredTasks.length;
    if (total === 0) return { todo: 0, progress: 0, done: 0 };

    let todo = 0;
    let progress = 0;
    let done = 0;

    columns.forEach(col => {
        col.tasks.forEach(task => {
        if (area && task.area !== area) return;

        const title = col.title.toLowerCase();

        if (title.includes("done")) done++;
        else if (title.includes("progress")) progress++;
        else todo++;
        });
    });

    return {
        todo: (todo / total) * 100,
        progress: (progress / total) * 100,
        done: (done / total) * 100,
    };
  }

  function getTaskStatus(taskId: string) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "todo";

    const columns: ColumnType[] = JSON.parse(raw);

    for (const col of columns) {
        if (col.tasks.some(t => t.id === taskId)) {
        const title = col.title.toLowerCase();

        if (title.includes("done")) return "done";
        if (title.includes("progress")) return "progress";
        return "todo";
        }
    }

    return "todo";
  }

  function getTaskStatusLabel(taskId: string) {
    const status = getTaskStatus(taskId);

    if (status === "done") return "Done";
    if (status === "progress") return "In Progress";
    return "To Do";
  }



  return (
    <div className={styles.page}>
      <aside className={styles.epics}>
        <h3>Area</h3>

        {EPICS.map(epic => {
          const progress = getEpicProgress(epic.id);

          return (
            <button
              key={epic.id ?? "all"}
              className={`${styles.epicButton} ${
                selectedEpic === epic.id ? styles.activeEpic : ""
              }`}
              onClick={() => setSelectedEpic(epic.id)}
            >
              <div className={styles.epicLabel}>
                {epic.label}
              </div>

              {progress && (
                <div className={styles.progressBar}>
                  <div
                    className={styles.todoBar}
                    style={{ width: `${progress.todo}%` }}
                  />
                  <div
                    className={styles.progressBarMid}
                    style={{ width: `${progress.progress}%` }}
                  />
                  <div
                    className={styles.doneBar}
                    style={{ width: `${progress.done}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </aside>

      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <button onClick={createSprint} className={styles.createBtn}>
            + Create Sprint
          </button>
        </div>

        {[...sprints].sort(sortSprints).map(sprint => {
          const sprintTasks = tasks.filter(t => {
            const matchesSprint =
              (t.sprint || "Sprint 1") === sprint;

            const matchesEpic =
              !selectedEpic || t.area === selectedEpic;

            return matchesSprint && matchesEpic;
          });

          const isOpen = expanded.includes(sprint);

          return (
            <div key={sprint} className={styles.sprintBlock}>
              <div
                className={styles.sprintHeader}
                onClick={() => toggleSprint(sprint)}
              >
                <div>
                  <h2>{sprint}</h2>
                  <span>{sprintTasks.length} Task</span>
                </div>

                <span className={styles.toggleIcon}>
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              {isOpen && (
                <div className={styles.issueList}>
                  {sprintTasks.map(task => (
                    <div key={task.id} className={styles.issueRow}>
                      <div className={styles.left}>
                        <div className={styles.taskInfo}>
                          <span
                            className={`${styles.areaBadge} ${
                                styles[`area_${task.area}`]
                            }`}
                            >
                            {task.area.toUpperCase()}
                          </span>
                            <span className={styles.issueTitle}>
                            {task.title}
                            </span>
                            <span
                            className={`${styles.statusBadge} ${
                                styles[getTaskStatus(task.id)]
                            }`}
                            >
                            {getTaskStatusLabel(task.id)}
                            </span>
                        </div>
                      </div>
                      <div className={styles.right}>
                        <Select
                          value={task.sprint || "Sprint 1"}
                          options={sprints.map(s => ({
                            value: s,
                            label: s,
                          }))}
                          onChange={(value) =>
                            moveTask(task.id, value)
                          }
                          placeholder="Select sprint"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
