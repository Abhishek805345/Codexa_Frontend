import { useEffect, useState } from "react";
import css from "./style/sideHover.module.css";
import { LiaGripLinesSolid } from "react-icons/lia";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Store, { roomAction, stateActions } from "../Utility/store";

export function SidePannel({roominfo,onlineusers,roomfiles,fileIdUpdater,codetoshowupdaterfromFile}){
  const [sidepannelstatus,setsidepannelstatus]=useState(false);
  console.log("roomfiles info is this ",roomfiles);
  return (
    <>
      <div className={css.outerdiv}>
          <button className={css.liabut} onClick={()=>{
            setsidepannelstatus(!sidepannelstatus);
          }}><LiaGripLinesSolid/></button>
          <div className={css.innerdiv}>
            
              <p>Room Name:<span style={{"color":"blue","fontSize":"x-small"}}>{roominfo.roomname}</span></p>
              <p>Room Type:<span style={{"color":"blue","fontSize":"x-small"}}>{roominfo.type}</span></p>
              <p>Max Users:<span style={{"color":"blue","fontSize":"x-small"}}>{roominfo.maxusers}</span></p>
              <p>Current Users:<span style={{"color":"blue","fontSize":"x-small"}}>{roominfo.currentuser}</span></p>
              <p>Current Online Users:<span style={{"color":"red","fontSize":"x-small"}}>{onlineusers}</span></p>
          </div>
      </div>
      {sidepannelstatus===true?
      <div className={css.verticalouterdiv}>
        <h4>Saved Files</h4>
        <ul className={css.fileholder}>
            {roomfiles.map(obj=>(
              <button onClick={()=>{
                    codetoshowupdaterfromFile(obj.code);
                    setsidepannelstatus(false);
                    fileIdUpdater(obj._id);
                  }}
                className={css.Links}><li>
                <p style={{"fontSize":"x-small"}}>{obj.filename}<span style={{"fontSize":"7px","margin-left":"35px","color":"yellow"}}>{obj.saver}</span></p>
                </li></button>
            ))}
        </ul>
      </div>
    :null}
    </>
  )
}