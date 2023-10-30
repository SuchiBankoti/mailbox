import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@ant-design/pro-components";
import Mail from "./Mail";
import { getUsermail } from "../Store/CreateSlice";

export default function Inbox() {
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(getUsermail())
    },[])
    const { allMail, usermail } = useSelector(state => state.mailbox)
    return (
        <div>
             {allMail.filter(mail => mail.receiver === usermail && !mail.deleted[usermail]).map((mail,i) => {
                 return (
                     <Mail key={nanoid()} i={i} mail={mail} />
                     
                    )
                })}
                
        </div>
    )
    
}