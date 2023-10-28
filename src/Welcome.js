import React, { useEffect} from "react";
import "./Welcome.css"
import { Tabs,Tab} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMail } from "./Store/CreateSlice";
import ComposeMail from "./Components/ComposeMail";
import Inbox from "./Components/Inbox";
import SentBox from "./Components/Sent";
import Navbar from "./Components/Navbar";
import Starred from "./Components/Starred";
import OpenMail from "./Components/OpenMail";


export default function Welcome() {
    const { trackmail,allMail,activeInboxId,activeSentboxId,usermail} = useSelector(state => state.mailbox) 
    const dispatch=useDispatch()
    console.log('aalmao',allMail)
    useEffect(() => {
       dispatch(getAllMail())
    },[trackmail])
   const unread_mail=allMail.filter(mail => mail.receiver === usermail && !mail.read).length
    
    return (
        <>
            <Navbar/>
         <Tabs
      defaultActiveKey="inbox"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
     <Tab eventKey="compose" title="Compose">
        <ComposeMail/>
      </Tab>
      <Tab eventKey="inbox" title={`Inbox ${unread_mail > 0 ? `${unread_mail} Unread` : ''}`}>

            {activeInboxId ? <OpenMail isInbox={true} />:<Inbox />}
      </Tab>
      <Tab eventKey="sent" title="Sent">
            {activeSentboxId ? <OpenMail /> : <SentBox />}
                </Tab>
                <Tab eventKey="starred" title="Starred" >
        <Starred/>
      </Tab>
      <Tab eventKey="deleted" title="Deleted" >
        Tab content for Deleted
                </Tab>
               
            </Tabs>
                    </>
            )
}