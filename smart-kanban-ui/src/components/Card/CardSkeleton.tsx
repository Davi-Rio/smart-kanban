import styles from "./CardSkeleton.module.css";

export default function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.title} />
      <div className={styles.line} />
      <div className={styles.lineShort} />
    </div>
  );
}
