import { useEffect, useState } from "react";
import styles from "./CamperDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchCamperById,
  clearDetails,
} from "../features/camperDetails/camperDetailsSlice";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/formatPrice";
import FeaturesBlock from "../components/FeaturesBlock";
import DetailsBlock from "../components/DetailsBlock";
import BookingForm from "../components/BookingForm";
import { extractPhotos } from "../utils/extractPhotos";
import Reviews from "../components/Reviews";
import MetaInfo from "../components/MetaInfo";
import { cancelDetails } from "../api/reqControl";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const locationRouter = useLocation();
  const dispatch = useDispatch();
  const { entity: camper, status, error } = useSelector((s) => s.camperDetails);

  const [tab, setTab] = useState("features");

  useEffect(() => {
    if (locationRouter.hash === "#reviews") setTab("reviews");
  }, [locationRouter.hash]);

  useEffect(() => {
    dispatch(fetchCamperById(id));
    return () => {
      cancelDetails();
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  if (status === "loading") return <Loader />;
  if (error)
    return (
      <div role="alert" className={styles.error}>
        Error: {error}
      </div>
    );
  if (!camper) return null;

  const photos = extractPhotos(camper);
  const reviewsCount =
    (typeof camper.reviewsCount === "number" ? camper.reviewsCount : null) ??
    (Array.isArray(camper.reviews) ? camper.reviews.length : 0);

  const description =
    camper?.description ??
    camper?.about ??
    camper?.details ??
    camper?.spec?.description ??
    "";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {camper.name ?? `Camper #${camper.id}`}
        </h2>

        <div className={styles.meta}>
          <MetaInfo
            rating={camper.rating}
            reviewsCount={reviewsCount}
            location={camper.location}
          />
        </div>

        {camper.price != null ? (
          <p className={styles.price}>{formatPrice(camper.price)}</p>
        ) : null}
      </header>

      {!!photos.length && (
        <section className={styles.gallerySection}>
          <ul className={styles.gallery}>
            {photos.map((src, i) => (
              <li className={styles.galleryItem} key={src || i}>
                <img
                  className={styles.galleryImg}
                  src={src}
                  alt={`camper photo ${i + 1}`}
                  width="240"
                  height="160"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {description ? (
        <section className={styles.descSection}>
          <p className={styles.descText}>{description}</p>
        </section>
      ) : null}

      <nav role="tablist" aria-label="Details tabs" className={styles.tabs}>
        <button
          role="tab"
          id="tab-features"
          aria-controls="features"
          aria-selected={tab === "features"}
          onClick={() => setTab("features")}
          type="button"
          className={`${styles.tab} ${
            tab === "features" ? styles.tabActive : ""
          }`}
        >
          Features
        </button>
        <button
          role="tab"
          id="tab-reviews"
          aria-controls="reviews"
          aria-selected={tab === "reviews"}
          onClick={() => setTab("reviews")}
          type="button"
          className={`${styles.tab} ${
            tab === "reviews" ? styles.tabActive : ""
          }`}
        >
          Reviews
        </button>
      </nav>

      <section
        id="features"
        role="tabpanel"
        aria-labelledby="tab-features"
        hidden={tab !== "features"}
        className={styles.tabPanel}
      >
        <div className={styles.columns}>
          <div className={styles.featuresCard}>
            <FeaturesBlock camper={camper} />
            <DetailsBlock camper={camper} />
          </div>

          <aside className={styles.bookingCard}>
            <BookingForm camper={camper} />
          </aside>
        </div>
      </section>

      <section
        id="reviews"
        role="tabpanel"
        aria-labelledby="tab-reviews"
        hidden={tab !== "reviews"}
        className={styles.tabPanel}
      >
        <div className={styles.columns}>
          <div className={styles.reviewsCol}>
            <Reviews camper={camper} />
          </div>

          <aside className={styles.bookingCard}>
            <BookingForm camper={camper} />
          </aside>
        </div>
      </section>
    </div>
  );
}
