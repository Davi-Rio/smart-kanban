import { useEffect, useState } from "react";
import styles from "./NewTaskModal.module.css";
import type { Task, Topic, TaskArea } from "../../types/task";
import Select from "../ui/Select";

type ColumnOption = {
  id: string;
  title: string;
};

type Props = {
  columns: ColumnOption[];
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">, columnId: string) => void;
  onUpdate: (taskId: string, task: Omit<Task, "id">) => void;
  onDelete: (taskId: string) => void;
  editingTask: Task | null;
  editingColumnId: string | null;
};

const EPIC_OPTIONS = [
  { value: "core-auth", label: "Authentication & Authorization" },
  { value: "core-project", label: "Project Management Core" },
  { value: "ux-refactor", label: "Drag & Drop UX Refinement" },
  { value: "multi-user", label: "Multi-user Workspace" },
  { value: "comments", label: "Task Discussion System" },
];

export default function NewTaskModal({
  columns,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  editingTask,
  editingColumnId,
}: Props) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState<TaskArea>("frontend");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [columnId, setColumnId] = useState(columns[0]?.id ?? "");
  const [epicId, setEpicId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setArea(editingTask.area);
      setTopics(editingTask.topics ?? []);
      setColumnId(editingColumnId ?? columns[0]?.id ?? "");
      setEpicId(editingTask.epicId);
    } else {
      setTitle("");
      setArea("frontend");
      setTopics([]);
      setColumnId(columns[0]?.id ?? "");
      setEpicId(undefined);
    }
  }, [editingTask, editingColumnId, columns]);

  function addTopic() {
    setTopics(t => [
      ...t,
      { id: crypto.randomUUID(), title: "", description: "" },
    ]);
  }

  function updateTopic(
    id: string,
    field: "title" | "description",
    value: string
  ) {
    setTopics(t =>
      t.map(topic =>
        topic.id === id ? { ...topic, [field]: value } : topic
      )
    );
  }

  function removeTopic(id: string) {
    setTopics(t => t.filter(topic => topic.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const payload: Omit<Task, "id"> = {
      title: title.trim(),
      area,
      topics: topics.length ? topics : undefined,
      epicId, 
    };

    if (editingTask) {
      onUpdate(editingTask.id, payload);
    } else {
      onCreate(payload, columnId);
    }

    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{editingTask ? "Edit Task" : "New Task"}</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </label>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Area</span>
            <Select
              value={area}
              onChange={(v) => setArea(v as TaskArea)}
              options={[
                { value: "frontend", label: "Frontend" },
                { value: "backend", label: "Backend" },
                { value: "qa", label: "QA" },
                { value: "devops", label: "DevOps" },
                { value: "ux", label: "UX / UI" },
                { value: "product", label: "Product" },
              ]}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Epic</span>
            <Select
              value={epicId ?? ""}
              onChange={(v) => setEpicId(v || undefined)}
              options={[
                { value: "", label: "RoadMap" },
                ...EPIC_OPTIONS,
              ]}
            />
          </div>

          <div className={styles.topics}>
            <div className={styles.topicsHeader}>
              <span>Topics</span>
              <button
                type="button"
                className={styles.addTopic}
                onClick={addTopic}
              >
                + Add topic
              </button>
            </div>

            {topics.map((topic, index) => (
              <div key={topic.id} className={styles.topicCard}>
                <div className={styles.topicTitle}>
                  <span className={styles.topicName}>
                    Topic {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeTopic(topic.id)}
                  >
                    ✕
                  </button>
                </div>

                <input
                  placeholder="Topic title"
                  value={topic.title}
                  onChange={e =>
                    updateTopic(topic.id, "title", e.target.value)
                  }
                />

                <textarea
                  placeholder="Topic description"
                  rows={5}
                  value={topic.description ?? ""}
                  onChange={e =>
                    updateTopic(topic.id, "description", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {!editingTask && (
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Column</span>
              <Select
                value={columnId}
                onChange={setColumnId}
                options={columns.map(col => ({
                  value: col.id,
                  label: col.title,
                }))}
              />
            </div>
          )}

          <div className={styles.actions}>
            <button type="submit" className={styles.save}>
              {editingTask ? "Save" : "Create"}
            </button>

            {editingTask && (
              <button
                type="button"
                className={styles.delete}
                onClick={() => {
                  if (editingTask) {
                    onDelete(editingTask.id);
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
