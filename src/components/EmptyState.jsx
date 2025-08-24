import styles from "./EmptyState.module.css";

export default function EmptyState({
  title = "Тут поки немає нічого, очікуйте...",
  hint,
}) {
  return (
    <div role="status" className={styles.empty}>
      <strong className={styles.title}>{title}</strong>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}
