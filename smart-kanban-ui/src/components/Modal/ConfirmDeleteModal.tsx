import styles from "./ConfirmDeleteModal.module.css";

type Props = {
  taskTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  taskTitle,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Delete task</h3>

        <p>
          Are you sure you want to delete{" "}
          <strong>{taskTitle}</strong>?
        </p>

        <div className={styles.actions}>
          <button
            className={styles.cancel}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className={styles.delete}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
