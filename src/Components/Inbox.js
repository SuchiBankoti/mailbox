import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@ant-design/pro-components";
import Mail from "./Mail";

export default function Inbox() {
    const { allMail, usermail } = useSelector(state => state.mailbox)
    return (
        <div>
             {allMail.filter(mail => mail.receiver === usermail).map((mail,i) => {
                 return (
                     <Mail key={nanoid()} i={i} mail={mail} />
                     
                    )
                })}
                
        </div>
    )
    
}