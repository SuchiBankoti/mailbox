import React from "react";
import "./Mail.css"
import { useDispatch, useSelector } from "react-redux";
import { activateInboxId, activateSentboxId, updateMail } from "../Store/CreateSlice";
import { Accordion } from "react-bootstrap";
import { FaStar } from "react-icons/fa";


export default function Mail(props) {
  const { sender, body, subject, id, read, star, receiver } = props.mail
  console.log('mail',props.mail)
  const{usermail}=useSelector(state=>state.mailbox)
  const dispatch = useDispatch()
  function update_read_status() {
    dispatch(updateMail({
      id:id,
      maildata: props.mail,
      read: true,
      deleted: false,
      star:star
    }))

  }
  
  function update_star_status() {
    if (receiver === usermail) {
    dispatch(updateMail({
      id:id,
      maildata: props.mail,
      read:read,
      deleted: false,
      star:!star
    }))
  }

  }
  function open_mail() {
    if (!props.sent) {
      dispatch(activateInboxId(id))
    } else {
      dispatch(activateSentboxId(id))
    }
    if (!read) {
      update_read_status()
    }
  }
  
    return (
      <div
        onClick={open_mail}
        style={{ background:"skyblue"}}>
                    <div className="mail-bar">
          <div
            className="circle" style={{ visibility: read ? "hidden" : "visible" ,display:props.sent?"none":"block"}}></div>
          <FaStar style={{color:star?"yellow":"grey",display:props.sent?"none":"block"}} onClick={update_star_status}/>
          <div>{props.sent?receiver:sender}</div>
                        <div>
                        {subject}
                        </div>
        </div>
       
      </div>
    )
}