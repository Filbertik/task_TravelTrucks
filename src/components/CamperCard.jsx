import { Link } from "react-router-dom";
import styles from "./CamperCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import MetaInfo from "./MetaInfo";
import Chip from "./Chip";
import { FEATURE_ICON_BY_KEY } from "../constants/featureIcons";
import { IconHeartLine, IconHeartFill, IconHeart } from "../assets/icons";
import { formatPrice } from "../utils/formatPrice";

const BOOLEAN_FEATURE_KEYS = [
  "AC",
  "bathroom",
  "kitchen",
  "TV",
  "radio",
  "water",
  "refrigerator",
  "microwave",
  "gas",
];

const FEATURE_LABEL_BY_KEY = {
  AC: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
  transmission: "Automatic",
  panelTruck: "Van",
  fullyIntegrated: "Fully Integrated",
  alcove: "Alcove",
};

const VEHICLE_TYPE_LABEL = {
  panelTruck: "Van",
  fullyIntegrated: "Fully Integrated",
  alcove: "Alcove",
};

const PRIORITY_FALLBACK = [
  "kitchen",
  "AC",
  "bathroom",
  "TV",
  "refrigerator",
  "microwave",
  "gas",
  "water",
];

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function buildChips(camper, filters) {
  const chips = [];

  const selectedForm = filters?.form || "";
  if (selectedForm && camper.form === selectedForm) {
    const Icon = FEATURE_ICON_BY_KEY[selectedForm] || null;
    chips.push({
      key: selectedForm,
      label: VEHICLE_TYPE_LABEL[selectedForm],
      Icon,
    });
  }

  const selectedBooleanKeys = BOOLEAN_FEATURE_KEYS.filter(
    (k) => !!filters?.[k]
  );
  selectedBooleanKeys.forEach((k) => {
    if (camper[k]) {
      const Icon = FEATURE_ICON_BY_KEY[k] || null;
      chips.push({ key: k, label: FEATURE_LABEL_BY_KEY[k] || k, Icon });
    }
  });

  if (
    filters?.transmission === "automatic" &&
    camper.transmission === "automatic"
  ) {
    const Icon = FEATURE_ICON_BY_KEY.transmission || null;
    chips.push({
      key: "transmission",
      label: FEATURE_LABEL_BY_KEY.transmission,
      Icon,
    });
  }

  if (chips.length === 0) {
    if (camper.transmission) {
      const Icon = FEATURE_ICON_BY_KEY.transmission || null;
      const label =
        String(camper.transmission).toLowerCase() === "automatic"
          ? "Automatic"
          : cap(camper.transmission);
      chips.push({ key: "transmission", label, Icon });
    }
    if (camper.engine) {
      const v = String(camper.engine).toLowerCase();
      const EngineIcon =
        FEATURE_ICON_BY_KEY[v] || FEATURE_ICON_BY_KEY.engine || null;
      chips.push({ key: "engine", label: cap(v), Icon: EngineIcon });
    }
    for (const k of PRIORITY_FALLBACK) {
      if (chips.length >= 4) break;
      if (camper[k]) {
        const Icon = FEATURE_ICON_BY_KEY[k] || null;
        chips.push({ key: k, label: FEATURE_LABEL_BY_KEY[k] || k, Icon });
      }
    }
  }

  return chips.slice(0, 4);
}

export default function CamperCard({ camper }) {
  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    gallery = [],
  } = camper || {};
  const dispatch = useDispatch();

  const favState = useSelector((s) => s.favorites?.ids ?? s.favorites ?? []);
  const isFav = Array.isArray(favState)
    ? favState.includes(id)
    : !!favState[id];
  const onToggleFav = () => dispatch(toggleFavorite(id));

  const filters = useSelector((s) => s.filters || {});
  const chips = buildChips(camper, filters);

  const HeartLine = IconHeartLine || IconHeart;
  const HeartFill = IconHeartFill || IconHeart;

  const placeholder = "https://placehold.co/320x240?text=No+image";
  const coverItem = Array.isArray(gallery) ? gallery[0] : gallery;
  const coverSrc =
    (typeof coverItem === "string" && coverItem) ||
    coverItem?.original ||
    coverItem?.thumb ||
    coverItem?.url ||
    placeholder;

  const reviewsTotal =
    (typeof camper.reviewsCount === "number" ? camper.reviewsCount : null) ??
    (Array.isArray(camper.reviews) ? camper.reviews.length : 0);

  return (
    <article className={styles.card}>
      <img className={styles.cover} src={coverSrc} alt={name} loading="lazy" />

      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceFav}>
            <span className={styles.price}>{formatPrice(price)}</span>
            <button
              type="button"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFav}
              onClick={onToggleFav}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              className={styles.favBtn}
            >
              {isFav ? (
                <HeartFill width={20} height={20} aria-hidden="true" />
              ) : (
                <HeartLine width={20} height={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        <MetaInfo
          rating={rating}
          reviewsCount={reviewsTotal}
          location={location}
          linkToReviews={`/catalog/${id}#reviews`}
          className={styles.meta}
        />

        {description ? <p className={styles.desc}>{description}</p> : null}

        {chips.length > 0 ? (
          <ul className={styles.tags} role="list">
            {chips.map(({ key, label, Icon }, i) => (
              <Fragment key={key}>
                <li className={styles.tagItem}>
                  <Chip
                    variant="pill"
                    label={label}
                    icon={Icon}
                    interactive={false}
                  />
                </li>
                {i === 2 && <li className={styles.break} aria-hidden="true" />}
              </Fragment>
            ))}
          </ul>
        ) : null}

        <div className={styles.actions}>
          <Link
            className={styles.moreBtn}
            to={`/catalog/${id}`}
            target="_blank"
            rel="Not ref"
          >
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}
