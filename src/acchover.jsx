import { Link } from "react-router-dom";
import css from "./style/acchover.module.css";
import { MdCloseFullscreen } from "react-icons/md";
import Store, { stateActions } from "../Utility/store";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";

export function AccHover(){
  const {_id,email,fullname,username}=useSelector(store=>store.userReducer);
  return (
    <div className={css.outerdiv}>
      <button className={css.clobut} onClick={()=>{
        Store.dispatch(stateActions.changer({
          newState:"Hero"
        }))
      }}><h3><MdCloseFullscreen/></h3></button>
      <div className={css.leftdiv}>
        <p>Note:</p>
        <p>Want to change your password?
           For security reasons, password updates are handled using the Forgot Password flow.
           Please logout and use Forgot Password on the login page.
        </p>
      </div>
      <div className={css.rightdiv}>
        <Link to="/edit/user" className={css.Link} onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"Hero"
            }))
        }}>
        <button>
          <div className={css.rightinnerdiv}>
          <p><FaUserEdit/>Edit Account info</p>
          <p>Full Name:-{fullname}</p>
          <p>Username:-{username}</p>
          <p>Email:-{email}</p>
        </div>
        </button>
      </Link >
      <Link to='/'>
        <button className={css.logbut}>Logout <MdLogout/></button>
      </Link>
      </div>
    </div>
  )
}