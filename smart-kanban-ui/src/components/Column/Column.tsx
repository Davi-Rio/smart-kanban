import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Card from "../Card/Card";
import styles from "./Column.module.css";

type Task = {
  id: string;
  title: string;
};

type Props = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function Column({ id, title, tasks }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={styles.column}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count}>{tasks.length}</span>
      </div>

      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.cards}>
          {tasks.length === 0 && (
            <div className={styles.empty}>No tasks here</div>
          )}

          {tasks.map(task => (
            <Card key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
