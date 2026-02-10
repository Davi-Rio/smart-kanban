import { useState } from "react";
import {
  DndContext,
  closestCorners,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import Column from "../Column/Column";
import styles from "./Board.module.css";

type Task = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialColumns: ColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "t1", title: "Create landing page" },
      { id: "t2", title: "Review SEO keywords" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      { id: "t3", title: "Create landing page" },
      { id: "t4", title: "Review SEO keywords" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "t5", title: "Create landing page" },
      { id: "t6", title: "Review SEO keywords" },
    ],
  },
];

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);

    function handleDragOver(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setColumns(cols => {
        let sourceColIndex = -1;
        let targetColIndex = -1;
        let sourceTaskIndex = -1;
        let targetTaskIndex = -1;

        cols.forEach((col, colIndex) => {
        const taskIndex = col.tasks.findIndex(t => t.id === active.id);
        if (taskIndex !== -1) {
            sourceColIndex = colIndex;
            sourceTaskIndex = taskIndex;
        }
        });

        cols.forEach((col, colIndex) => {
        const taskIndex = col.tasks.findIndex(t => t.id === over.id);
        if (taskIndex !== -1) {
            targetColIndex = colIndex;
            targetTaskIndex = taskIndex;
        }

        if (col.id === over.id) {
            targetColIndex = colIndex;
            targetTaskIndex = col.tasks.length;
        }
        });

        if (
        sourceColIndex === -1 ||
        targetColIndex === -1 ||
        sourceTaskIndex === -1 ||
        targetTaskIndex === -1
        ) {
        return cols;
        }

        if (
        sourceColIndex === targetColIndex &&
        sourceTaskIndex === targetTaskIndex
        ) {
        return cols;
        }

        const sourceCol = cols[sourceColIndex];
        const targetCol = cols[targetColIndex];

        const task = sourceCol.tasks[sourceTaskIndex];

        if (sourceColIndex === targetColIndex) {
        const newTasks = [...sourceCol.tasks];
        newTasks.splice(sourceTaskIndex, 1);
        newTasks.splice(targetTaskIndex, 0, task);

        return cols.map((col, i) =>
            i === sourceColIndex ? { ...col, tasks: newTasks } : col
        );
        }

        const newSourceTasks = [...sourceCol.tasks];
        newSourceTasks.splice(sourceTaskIndex, 1);

        const newTargetTasks = [...targetCol.tasks];
        newTargetTasks.splice(targetTaskIndex, 0, task);

        return cols.map((col, i) => {
        if (i === sourceColIndex) {
            return { ...col, tasks: newSourceTasks };
        }
        if (i === targetColIndex) {
            return { ...col, tasks: newTargetTasks };
        }
        return col;
        });
    });
    }

    function handleDragEnd() {
    }

  return (
    <DndContext
    collisionDetection={closestCorners}
    onDragOver={handleDragOver}
    onDragEnd={handleDragEnd}
    >

      <div className={styles.board}>
        {columns.map(col => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={col.tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}
