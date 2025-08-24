import { Suspense } from "react";
import AppRouter from "./router/AppRouter";
import Loader from "./components/Loader";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppRouter />
    </Suspense>
  );
}
