import { Link } from "react-router-dom";
import css from "./style/footer.module.css";

export function Footer(){
  return (
    <div className={css.outerdiv}>
    <div className={css.innerdiv}>
      <h1>Codexa</h1>
      <p>Collaborate. Build. Ship faster.</p>
    </div>
    <div className={css.innerdiv}>
      <h1>Quick Links</h1>
      <Link className={css.Links}>Dashboard</Link>
      <Link className={css.Links}>Projects</Link>
      <Link className={css.Links}>Settings</Link>
    </div>
    <div className={css.innerdiv}>
      <h1>Support</h1>
      <Link className={css.Links}>Help Center</Link>
      <Link className={css.Links}>Privacy Policy</Link>
      <Link className={css.Links}>Terms & Conditions</Link>
    </div>
    </div>
  )
}
