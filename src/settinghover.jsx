import css from "./style/settinghover.module.css";
import { FaLaptopCode } from "react-icons/fa";
import { MdStreetview } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdCloseFullscreen } from "react-icons/md";
import Store, { stateActions } from "../Utility/store";
import { useSelector } from "react-redux";

export function SettingHover(){
  const {_id}=useSelector(store=>store.userReducer);
  return (
    <div className={css.outerdiv}>
      <button className={css.clobut} onClick={()=>{
                Store.dispatch(stateActions.changer({
                    newState:"Hero"
                }))
            }}><h3><MdCloseFullscreen/></h3></button>
      <p>Edit the room configurations here.</p>
      <Link to={`/edit/code/rooms/`+_id} onClick={()=>{
          Store.dispatch(stateActions.changer({
            newState:"Hero"
          }))
        }}>
        <h3><FaLaptopCode/> </h3>
        <button>Code room</button>
      </Link>
    </div>
  )
}