import styles from "./Chip.module.css";

export default function Chip({
  active = false,
  onClick,
  icon: Icon,
  label,
  variant = "tile",
  className = "",
  interactive = true,
}) {
  const root = [
    styles.chip,
    styles[`variant_${variant}`],
    active ? styles.active : "",
    !interactive ? styles.static : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = interactive ? "button" : "span";
  const interactiveProps = interactive
    ? { type: "button", onClick, "aria-pressed": !!active, title: label }
    : {};

  return (
    <Tag className={root} {...interactiveProps}>
      {Icon ? <Icon className={styles.chipIcon} aria-hidden="true" /> : null}
      <span>{label}</span>
    </Tag>
  );
}
