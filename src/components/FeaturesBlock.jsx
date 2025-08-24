import { Fragment } from "react";
import Chip from "./Chip";
import { FEATURE_ICON_BY_KEY } from "../constants/featureIcons";
import styles from "./FeaturesBlock.module.css";

const ORDER = [
  "AC",
  "bathroom",
  "kitchen",
  "microwave",
  "gas",
  "water",
  "TV",
  "radio",
  "refrigerator",
];

const LABEL = {
  AC: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const getVal = (camper, key) =>
  camper?.[key] ?? camper?.features?.[key] ?? camper?.specs?.[key];

const isOn = (v) => {
  if (v === undefined || v === null) return false;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v > 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return (
      s === "true" ||
      s === "yes" ||
      s === "y" ||
      s === "1" ||
      s === "available" ||
      s === "present"
    );
  }
  return Boolean(v);
};

export default function FeaturesBlock({ camper, breakAfter = null }) {
  if (!camper) return null;

  const chips = [];

  ORDER.forEach((k) => {
    if (isOn(getVal(camper, k))) {
      chips.push({
        key: k,
        label: LABEL[k] || cap(k),
        Icon: FEATURE_ICON_BY_KEY[k] || null,
      });
    }
  });

  const transmission = getVal(camper, "transmission");
  if (transmission) {
    const txt = String(transmission);
    const label = txt.toLowerCase() === "automatic" ? "Automatic" : cap(txt);
    chips.push({
      key: "transmission",
      label,
      Icon: FEATURE_ICON_BY_KEY.transmission || null,
    });
  }

  const engine = getVal(camper, "engine");
  if (engine) {
    const v = String(engine).toLowerCase();
    chips.push({
      key: "engine",
      label: cap(v),
      Icon: FEATURE_ICON_BY_KEY[v] || FEATURE_ICON_BY_KEY.engine || null,
    });
  }

  if (!chips.length) return null;

  return (
    <section className={styles.block}>
      <ul role="list" className={styles.list}>
        {chips.map(({ key, label, Icon }, i) => (
          <Fragment key={key}>
            <li className={styles.item}>
              <Chip
                variant="pill"
                label={label}
                icon={Icon}
                interactive={false}
              />
            </li>
            {breakAfter && i === breakAfter - 1 && (
              <li aria-hidden="true" className={styles.break} />
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
