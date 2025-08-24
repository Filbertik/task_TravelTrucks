import styles from "./DetailsBlock.module.css";

const withUnit = (val, unit) => {
  if (val == null) return "";
  const s = String(val).trim();
  return /[a-zа-я%]/i.test(s) ? s : `${s} ${unit}`;
};

export default function DetailsBlock({ camper }) {
  if (!camper) return null;

  const details = [
    ["form",        "Body type", (v) => v],
    ["length",      "Length",    (v) => withUnit(v, "m")],
    ["width",       "Width",     (v) => withUnit(v, "m")],
    ["height",      "Height",    (v) => withUnit(v, "m")],
    ["tank",        "Tank",      (v) => withUnit(v, "l")],
    ["consumption", "Consumption",(v) => {
      const s = String(v ?? "").trim();
      return s ? (/l\/100 ?km/i.test(s) ? s : `${s} l/100km`) : "";
    }],
  ]
    .filter(([key]) => camper?.[key] != null && String(camper[key]).trim() !== "")
    .map(([key, label, fmt]) => ({ label, value: fmt ? fmt(camper[key]) : String(camper[key]) }));

  if (!details.length) return null;

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>Vehicle details</h3>
      <div className={styles.divider} aria-hidden="true" />
      <dl className={styles.grid}>
        {details.map(({ label, value }) => (
          <div className={styles.row} key={label}>
            <dt className={styles.term}>{label}</dt>
            <dd className={styles.desc}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
