import { useEffect, useState } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Column from "../Column/Column";
import Card from "../Card/Card";
import NewTaskModal from "../Modal/NewTaskModal";
import styles from "./Board.module.css";
import type { Task } from "../../types/task";

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

type Props = {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onClearFilter: () => void;
  filterText: string;
};

const STORAGE_KEY = "smart-kanban-board";

const initialColumns: ColumnType[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

function loadColumns(): ColumnType[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialColumns;
  } catch {
    return initialColumns;
  }
}

export default function Board({
  isModalOpen,
  onCloseModal,
  onOpenModal,
  onClearFilter,
  filterText,
}: Props) {
  const [columns, setColumns] = useState<ColumnType[]>(loadColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);

  /* ---------------- PERSIST ---------------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  /* ---------------- DRAG ---------------- */

  function handleDragStart(event: DragStartEvent) {
    const taskId = event.active.id;

    for (const col of columns) {
      const task = col.tasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  }

  function handleDragEnd() {
    setActiveTask(null);
  }

  function handleDragOver(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setColumns(cols => {
      let fromCol = -1;
      let toCol = -1;
      let fromIndex = -1;
      let toIndex = -1;

      cols.forEach((col, ci) => {
        const idx = col.tasks.findIndex(t => t.id === active.id);
        if (idx !== -1) {
          fromCol = ci;
          fromIndex = idx;
        }
      });

      cols.forEach((col, ci) => {
        const idx = col.tasks.findIndex(t => t.id === over.id);
        if (idx !== -1) {
          toCol = ci;
          toIndex = idx;
        }

        if (col.id === over.id) {
          toCol = ci;
          toIndex = col.tasks.length;
        }
      });

      if (fromCol === -1 || toCol === -1) return cols;

      const newCols = structuredClone(cols);
      const task = newCols[fromCol].tasks[fromIndex];

      newCols[fromCol].tasks.splice(fromIndex, 1);
      newCols[toCol].tasks.splice(toIndex, 0, task);

      return newCols;
    });
  }

  /* ---------------- CRUD (OPÇÃO A) ---------------- */

  function addTask(
    taskData: Omit<Task, "id">,
    columnId: string
  ) {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                { ...taskData, id: crypto.randomUUID() },
              ],
            }
          : col
      )
    );
  }

  function updateTask(
    taskId: string,
    taskData: Omit<Task, "id">
  ) {
    setColumns(cols =>
      cols.map(col => ({
        ...col,
        tasks: col.tasks.map(t =>
          t.id === taskId ? { ...t, ...taskData } : t
        ),
      }))
    );
    onClearFilter();
  }

  function deleteTask(taskId: string) {
    setColumns(cols =>
      cols.map(col => ({
        ...col,
        tasks: col.tasks.filter(t => t.id !== taskId),
      }))
    );
  }

  /* ---------------- FILTER ---------------- */

  const normalizedFilter = filterText.toLowerCase();

  const filteredColumns = columns.map(col => ({
    ...col,
    tasks: col.tasks.filter(task =>
      task.title.toLowerCase().includes(normalizedFilter)
    ),
  }));

  /* ---------------- RENDER ---------------- */

  return (
    <>
      {isModalOpen && (
        <NewTaskModal
          columns={columns.map(col => ({
            id: col.id,
            title: col.title,
          }))}
          editingTask={editingTask}
          editingColumnId={editingColumnId}
          onCreate={addTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onClose={() => {
            setEditingTask(null);
            setEditingColumnId(null);
            onCloseModal();
          }}
        />
      )}

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.board}>
          {filteredColumns.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={col.tasks}
              filterText={filterText}
              onEditTask={task => {
                setEditingTask(task);
                setEditingColumnId(col.id);
                onOpenModal();
              }}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div style={{ width: 260 }}>
              <Card
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </>
  );
}
