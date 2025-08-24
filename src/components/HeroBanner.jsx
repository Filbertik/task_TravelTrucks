import { Link } from "react-router-dom";
import styles from "./HeroBanner.module.css";
import hero1x from "../assets/images/hero.webp";
import hero2x from "../assets/images/hero-2x.webp";

export default function HeroBanner() {
  return (
    <section aria-label="Hero banner" className={styles.section}>
      <div
        className={styles.hero}
        style={{ "--hero-1x": `url(${hero1x})`, "--hero-2x": `url(${hero2x})` }}
      >
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            Choose your camper, explore reviews, book online.
          </p>
          <Link to="/catalog" className={styles.cta}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
