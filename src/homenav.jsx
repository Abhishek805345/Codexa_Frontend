import css from "./style/home.module.css";
import { RiArrowDropDownLine,RiArrowDropUpLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import Store, { stateActions, UserActions } from "../Utility/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RoomHover } from "./roomhover";
import { SettingHover } from "./settinghover";
import {AccHover} from "./acchover";


export function HomeNav(){
  const {shower}=useSelector(store=>store.stateReducer);
  return (
    <>
      <nav className={css.navdiv}>
        <div className={css.leftdiv}>
          <button onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"Rooms"
            }))
          }}
          >Rooms<h3><RiArrowDropDownLine/></h3></button>
          <button>Guide<h3><RiArrowDropDownLine/></h3></button>
        </div>
        <Link className={css.codexa} to="/home"><button className={css.codexabut} onClick={()=>{
          Store.dispatch(stateActions.changer({
            newState:"Hero"
          }))
        }}><h1>Codexa</h1></button></Link>
        <div className={css.rightdiv}>
          <button onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"Account"
            }))
          }}>Account<h3><RiArrowDropDownLine/></h3></button>
          <button onClick={()=>{
            Store.dispatch(stateActions.changer({
              newState:"RoomSettings"
            }))
          }}><MdOutlineSettings/><h3><RiArrowDropDownLine/></h3></button>
        </div>
      </nav>
      {shower==="Rooms"?<RoomHover/>:null}
      {shower==="Account"?<AccHover/>:null}
      {shower==="RoomSettings"?<SettingHover/>:null}
      </>
  )
}


