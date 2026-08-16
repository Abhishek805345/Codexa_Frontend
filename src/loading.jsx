import css from "./style/loading.module.css";
import Store from "../Utility/store";
import { useSelector } from "react-redux";
export function Loading() {
  return (
    <main className={css.container} aria-busy="true" aria-live="polite">
      <section className={css.card}>
        <div className={css.loader} aria-hidden="true">
          <span className={css.dot}></span>
          <span className={css.dot}></span>
          <span className={css.dot}></span>
        </div>

        <div className={css.text}>
          <h1>Please wait</h1>
          <p>We are working on your request.</p>
        </div>
      </section>
    </main>
  );
}
