import styles from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ disabled, onClick, className = "" }) {
  const cls = [styles.button, className].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cls}
      aria-busy={disabled || undefined}
    >
      Load More
    </button>
  );
}
