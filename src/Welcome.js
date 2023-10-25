import React, { useEffect, useState } from "react";
import "./Welcome.css"
import { Button ,Form} from "react-bootstrap";
import { nanoid } from "@ant-design/pro-components";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/allmail.json";

export default function Welcome() {
    const sender=localStorage.getItem('mymail')
    const [activeEmail, setActiveEmail] = useState(false)
    const[trackmail,setTrackmail]=useState(0)
    const [maildata, setMaildata] = useState({
        emailAddress: "",
        subject: "",
        body:""
    })
    const[allmails,setAllmails]=useState([])
    useEffect(() => {
        async function getallmail() {
            try {
                const res = await fetch(api)
                const data = await res.json()
                const a = Object.entries(data);
                const allmaildata = a.map((e) => {
                    return { ...e[1], id: e[0] };
                });
                console.log(allmaildata)
                setAllmails(allmaildata)
            } catch (e) {
                console.log(e)
                }
        }
        getallmail()
    },[trackmail])
    const handleChange = (e) => {
        setMaildata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const sendMail = () => {
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                sender: sender,
                receiver: maildata.emailAddress,
                subject: maildata.subject,
                body: maildata.body
            })
        }).then((res) => {
            if (res.ok) {
             setTrackmail(prev=>prev+1)
          }else {
              console.log("Request failed with status: " + res.status);
            }
        }).catch(e => {
            console.log(e)
        });
    }
    return (<div>
        <h2>{sender}</h2>
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
                {allmails.filter(mail => mail.sender === sender).map(mail => {
                    return (
                        <div key={nanoid()}>
                            <div><b>{mail.subject}: </b>{mail.body}</div>
                        </div>
                    )
                })}
            </div>
            <h3>mails recieved</h3>
            <div>
            {allmails.filter(mail => mail.receiver === sender).map(mail => {
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