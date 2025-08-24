import { useEffect } from "react";
import styles from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAndFetchCampers,
  loadMoreCampers,
} from "../features/campers/campersSlice";
import CamperCard from "../components/CamperCard";
import Loader from "../components/Loader";
import FiltersPanel from "../components/FiltersPanel";
import LoadMoreButton from "../components/LoadMoreButton";
import { cancelList } from "../api/reqControl";
import EmptyState from "../components/EmptyState";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, status, hasMore, error } = useSelector((s) => s.campers);
  const list = Array.isArray(items) ? items : [];

  useEffect(() => {
    dispatch(resetAndFetchCampers());
    return () => cancelList();
  }, [dispatch]);

  const isLoading = status === "loading";
  const isLoadingMore = status === "loadingMore";
  const isEmpty = !list.length && (status === "succeeded" || status === "idle");

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filters">
          <FiltersPanel />
        </aside>

        <section className={styles.content} aria-label="Catalog results">
          {isLoading && (
            <div className={styles.centerRow}>
              <Loader />
            </div>
          )}

          {isEmpty && !isLoading && (
            <EmptyState
              title="Тут поки немає нічого, очікуйте..."
              hint="Змініть фільтри чи локацію."
            />
          )}

          {error && status === "failed" && (
            <div role="alert" className={styles.error}>
              Помилка: {error}
            </div>
          )}

          {!!list.length && (
            <ul className={styles.grid} role="list">
              {list.map((c) => (
                <li key={c.id} className={styles.item}>
                  <CamperCard camper={c} />
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <div className={styles.centerRow}>
              <LoadMoreButton
                disabled={isLoadingMore}
                onClick={() => dispatch(loadMoreCampers())}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
