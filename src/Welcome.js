import React, { useEffect, useState } from "react";
import "./Welcome.css"
import { Button ,Form} from "react-bootstrap";
import { nanoid } from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { addMail, getAllMail } from "./Store/CreateSlice";


export default function Welcome() {
    const { trackmail, allMail,usermail } = useSelector(state => state.mailbox) 
    const dispatch=useDispatch()
    const [activeEmail, setActiveEmail] = useState(false)
    
    const [maildata, setMaildata] = useState({
        emailAddress: "",
        subject: "",
        body:""
    })
    useEffect(() => {
       dispatch(getAllMail())
    },[trackmail])
    const handleChange = (e) => {
        setMaildata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const sendMail = () => {
        dispatch(addMail({ maildata :maildata,usermail:usermail}))
    }
    return (<div>
        <h2>{usermail}</h2>
        <div onClick={() => setActiveEmail(true)}>Compose</div>
        {
            activeEmail && <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="email"
                        name="emailAddress"
                        placeholder="Enter email"
                        value={maildata.emailAddress}
                            onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={maildata.subject}
                        onChange={handleChange}
                    />
                </Form.Group>
                    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        name="body"
                        placeholder="Enter text"
                        value={maildata.body}
                            onChange={handleChange}
                    />
                </Form.Group>
            </Form>
                <Button onClick={() => {
                    sendMail()
                    setActiveEmail(false)
                }
                }>Send</Button>
            </div>
            
        }
        <div>
            <h3>mails sent</h3>
            <div>
                {allMail.filter(mail => mail.sender === usermail).map(mail => {
                    return (
                        <div key={nanoid()}>
                            <div><b>{mail.subject}: </b>{mail.body}</div>
                        </div>
                    )
                })}
            </div>
            <h3>mails recieved</h3>
            <div>
            {allMail.filter(mail => mail.receiver === usermail).map(mail => {
                    return (
                        <div key={nanoid()}>
                            <div>sent by:{mail.sender}</div>
                            <div><b>{mail.subject}: </b>{mail.body}</div>
                        </div>
                    )
                })}
            </div>
        </div>
       
    </div>)
}