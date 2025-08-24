import { useMemo } from "react";
import styles from "./Reviews.module.css";

function readRating(r) {
  const candidates = [
    r?.rating, r?.stars, r?.score, r?.value,
    r?.reviewer_rating, r?.reviewerRate, r?.rate,
    r?.reviewer?.rating, r?.ratingValue,
  ];

  let raw = candidates.find(
    (v) => v !== undefined && v !== null && String(v).trim() !== ""
  );

  if (typeof raw === "string") {
    const m = raw.match(/([\d.,]+)/);
    raw = m ? parseFloat(m[1].replace(",", ".")) : NaN;
  }

  let v = Number(raw);
  if (!isFinite(v)) v = 0;

  if (v > 5 && v <= 10) v = v / 2;
  if (v > 10 && v <= 100) v = v / 20;

  return Math.max(0, Math.min(5, v));
}

const pick = (obj, ...keys) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
};

function colorFromString(str) {
  const s = String(str || "");
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 40%)`;
}

function Stars({ value = 0 }) {
  let v = Number(value);
  if (!isFinite(v)) v = 0;
  if (v > 5 && v <= 10) v = v / 2;
  if (v > 10 && v <= 100) v = v / 20;
  v = Math.max(0, Math.min(5, v));

  const pct = (v / 5) * 100;
  const t = v / 5;                 
  const light = 42 + 18 * t;       
  const starOn = `hsl(45 100% ${light}%)`;

  return (
    <span className={styles.stars} aria-label={`${v} / 5`} title={`${v} / 5`}>
      <span className={styles.starsBase}>★★★★★</span>
      <span className={styles.starsFill} style={{ width: `${pct}%`, color: starOn }}>
        ★★★★★
      </span>
    </span>
  );
}

function Avatar({ name }) {
  const initial = (String(name || "?").trim().charAt(0) || "?").toUpperCase();
  const color = useMemo(() => colorFromString(name), [name]);
  return (
    <div className={styles.avatar} style={{ "--avatarColor": color }} aria-hidden="true">
      {initial}
    </div>
  );
}

export default function Reviews({ camper }) {
  const list = Array.isArray(camper?.reviews) ? camper.reviews : [];

  if (!list.length) {
    return (
      <section className={styles.wrap}>
        <p className={styles.empty}>No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <ul className={styles.list} role="list">
        {list.map((r, i) => {
          const name = pick(r, "reviewer_name", "author", "user", "name");
          const text = pick(r, "comment", "text", "message", "body", "review");
          const rating = readRating(r); 

          return (
            <li key={r.id ?? i} className={styles.item}>
              <Avatar name={name} />
              <div className={styles.content}>
                <div className={styles.head}>
                  <span className={styles.name}>{name || "Anonymous"}</span>
                  <Stars value={rating} />
                </div>
                {text ? <p className={styles.text}>{text}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
