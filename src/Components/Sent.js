import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@ant-design/pro-components";
import Mail from "./Mail";

export default function SentBox() {
    const {allMail,usermail } = useSelector(state => state.mailbox) 
    return (
        <div>
            <div>
             {allMail.filter(mail => mail.sender === usermail).map((mail,i) => {
                 return (
                     <Mail key={nanoid()} i={i} mail={mail} sent={true} />
                     
                    )
                })}
                </div>
        </div>
        
    )
}