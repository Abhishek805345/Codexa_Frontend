import { Form, Link } from "react-router-dom";
import css from "./style/roomhover.module.css";
import { MdCloseFullscreen } from "react-icons/md";
import Store, { stateActions } from "../Utility/store";
import { FaLaptopCode } from "react-icons/fa";
import { MdStreetview } from "react-icons/md";

export function RoomHover(){
  return (
        <div className={css.outerdiv}>
            <button className={css.clobut} onClick={()=>{
                Store.dispatch(stateActions.changer({
                    newState:"Hero"
                }))
            }}><h3><MdCloseFullscreen/></h3></button>
            <div className={css.innerdiv}>
                <Link to="/code/rooms" className={css.codelin} onClick={()=>{
                        Store.dispatch(stateActions.changer({
                            newState:"Hero"
                        }))
                        }}>
                    <button><h3><FaLaptopCode/></h3> Code Rooms</button>
                   <div>
                        Collaborate with teammates in real-time using a shared code editor.
                        Supports multiple programming languages, live chat, and instant updates.
                    </div>
                </Link>
                <Link to="/interview/rooms" className={css.interviewlin} onClick={()=>{
                        Store.dispatch(stateActions.changer({
                            newState:"Hero"
                        }))
                    }}>
                    <button><h3><MdStreetview/> </h3>Interview Rooms</button>
                    <div>
                        Conduct technical interviews with collaborative coding, timer support,
                        whiteboard discussions, and candidate-friendly workspace.
                    </div>
                </Link>
            </div>
        </div>
  )
}