import { Link } from "react-router-dom";
import css from "./style/afterhero.module.css";

export function AfterLoginHero() {
  return (
    <section className={css.hero}>
      <div className={css.heroBadge}>
        New: AI Pair Programming is now live
      </div>

      <p className={css.heroSubtitle}>
        A REAL-TIME CODING & COLLABORATION PLATFORM
      </p>

      <h1 className={css.heroTitle}>
        <span className={css.italic}>Real time coding.</span>
        <br />
        Real collaboration.
        <br />
        All in <span className={css.gradient}>Codexa.</span>
      </h1>

      <p className={css.heroDescription}>
        Build, code, debug, and collaborate with your team in real time.
        Codexa combines collaborative coding, AI assistance, live chat, and
        project management into one seamless workspace.
      </p>

      <div className={css.heroButtons}>
        <Link to="/create/room">
          <button className={css.primaryBtn}>
          Get Started
          </button>
        </Link>

        <button className={css.secondaryBtn}>
          Live Demo
        </button>
      </div>

      <div className={css.heroFeatures}>
        <span>✔ No setup required</span>
        <span>✔ Real-time collaboration</span>
        <span> AI Code Assistant</span>
      </div>
    </section>
  );
}