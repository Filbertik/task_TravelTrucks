import { Link } from "react-router-dom";
import styles from "./MetaInfo.module.css";
import { FEATURE_ICON_BY_KEY } from "../constants/featureIcons";
import { IconStar } from "../assets/icons";

const MapIcon = FEATURE_ICON_BY_KEY.map || null;

function formatLocationDisplay(raw) {
  if (!raw) return "";
  const parts = String(raw)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const [country, city] = parts;
    return `${city}, ${country}`;
  }
  return raw;
}

export default function MetaInfo({
  rating = 0,
  reviewsCount = 0,
  location = "",
  linkToReviews = "",
  className = "",
}) {
  const cls = [styles.meta, className].filter(Boolean).join(" ");
  const RatingTag = linkToReviews ? Link : "span";
  const ratingProps = linkToReviews
    ? { to: linkToReviews, className: styles.ratingLink }
    : { className: styles.ratingLink };

  return (
    <div className={cls}>
      <div className={styles.subMeta}>
        <IconStar className={styles.star} aria-hidden="true" />
        <RatingTag {...ratingProps}>
          {Number(rating ?? 0).toFixed(1)}
          {reviewsCount > 0 && (
            <>
              {" "}
              ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
            </>
          )}
        </RatingTag>
      </div>

      <span className={styles.location}>
        {MapIcon ? (
          <MapIcon className={styles.locIcon} aria-hidden="true" />
        ) : null}
        <span className={styles.locationText}>
          {formatLocationDisplay(location)}
        </span>
      </span>
    </div>
  );
}
