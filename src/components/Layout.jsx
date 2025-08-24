import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Header />

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
