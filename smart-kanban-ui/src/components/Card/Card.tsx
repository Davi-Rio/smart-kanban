import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import styles from "./Card.module.css";
import { EditIcon, TrashIcon, UserIcon } from "../Icons/Icons";
import type { Task } from "../../types/task";

type Props = {
  task: Task;
  highlight?: string;
  onEdit: () => void;
  onDelete: () => void;
};

function renderHighlightedText(text: string, highlight: string) {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={i} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function formatArea(area?: string) {
  return (area ?? "frontend").toUpperCase();
}

export default function Card({
  task,
  highlight = "",
  onEdit,
  onDelete,
}: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.card}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.content}>
        <div className={styles.userIcon}>
          <UserIcon size={22} />
        </div>

        <div
          className={styles.areaBadge}
          data-area={task.area ?? "frontend"}
        >
          {formatArea(task.area)}
        </div>

        <div className={styles.title}>
          {renderHighlightedText(task.title, highlight)}
        </div>

        {task.topics && task.topics.length > 0 && (
          <ul className={styles.topicsPreview}>
            {task.topics.slice(0, 2).map(topic => (
              <li key={topic.id} className={styles.topicItem}>
                <span className={styles.bullet} />
                <div className={styles.topicText}>
                  <span className={styles.topicTitle}>
                    {topic.title}
                  </span>
                  {topic.description && (
                    <span className={styles.topicDescription}>
                      {topic.description}
                    </span>
                  )}
                </div>
              </li>
            ))}

            {task.topics.length > 2 && (
              <li className={styles.more}>
                +{task.topics.length - 2} more
              </li>
            )}
          </ul>
        )}
      </div>

      <div
        className={styles.footer}
        onPointerDown={e => e.stopPropagation()}
      >
        <div className={styles.actions}>
          <button onClick={onEdit} title="Editar">
            <EditIcon />
          </button>

          <button onClick={onDelete} title="Excluir">
            <TrashIcon />
          </button>
        </div>
      </div>

    </div>
  );
}
