import { Link } from "react-router-dom";
import css from "./style/nav.module.css";
import { GoCodescan,GoCheck } from "react-icons/go";
import { useSelector} from "react-redux";
import { Login } from "./login";
import Store,{ stateActions, UserActions } from "../Utility/store";
import { Register } from "./Register";
import { Hero } from "./hero";
import { sessionCheck } from "../Services/authentication";

export function Navbar(){
  const {shower}=useSelector(store=>store.stateReducer);
  console.log(shower);
  return (
    <>
      <div className={css.outermostlayer}>
        <div className={css.iconlayer}>
          <p>icon</p>
        </div>
        <div className={css.linklayer}>
          <ul className={css.linklist}>
            <li><button className={css.links} >About</button></li>
            <li><button className={css.links} >Demo</button></li>
            <li><button className={css.links} onClick={()=>{
                Store.dispatch(stateActions.changer({
                  newState:"Login"
                }));
            }} >Login</button></li>
            <li><button className={css.links} onClick={()=>{
                Store.dispatch(stateActions.changer({
                  newState:"Register"
                }));
            }} >Register</button></li>
        </ul>
        </div>
      </div>
      { shower==="Login"?
      <Login/>:null
      }
      {shower==="Register"?<Register/>:null}
      {shower==="Hero"?<Hero/>:null}
    </>
  )
} 


export const userLoginSessionCheck=async ()=>{
  const result=await sessionCheck();
  console.log("result of session check is this",result);
  if (result.login===true){
    Store.dispatch(UserActions._idChanger({
      new_id:result.userdata._id,
    }))
    Store.dispatch(UserActions.fullnameChanger({
      newfullname:result.userdata.username,
    }))
    Store.dispatch(UserActions.usernameChanger({
      newusername:result.userdata.rusername,
    }))
    Store.dispatch(UserActions.emailchanger({
      newemail:result.userdata.email,
    }))
    return Response.redirect('/home');
  }else{
    return 0;
  }
}