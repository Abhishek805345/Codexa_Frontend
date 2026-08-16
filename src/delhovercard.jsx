import { Link } from "react-router-dom";
import css from "./style/delhovercard.module.css";
import Store, { stateActions } from "../Utility/store";

export function DelHoverCard({room,roomDelFxn}){
  return (
    <>
    <div className={css.outerdiv}>
      <p>Are you sure, that you want to delete this room:{room.roomname}</p>
      <button className={css.delbut} onClick={()=>{
        roomDelFxn(room._id);
        Store.dispatch(stateActions.changer({
          newState:"Hero"
        }))
      }}>Delete Room</button>
      <button onClick={()=>{
        Store.dispatch(stateActions.changer({
          newState:"Hero"
        }))
      }} className={css.closebut}>Close</button>
    </div>
    </>
  )
}