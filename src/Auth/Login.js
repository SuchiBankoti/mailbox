import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"


export default function SignUp() {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    })
    function handleChange(e) {
        setFormdata(prev => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    function user_login() {
        fetch(loginApi, {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify({
                email: formdata.email,
                password: formdata.password,
                returnSecureToken: true,
            })
        }).then(res => {
            if (res.ok) {
                const data = res.json();
                console.log(data)
            } else {
                 console.log("Request failed with status: " + res.status);
            }
        }).catch(e => {
            console.log(e)
            
        })
    }
    return (
        <div>
           
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={formdata.email} onChange={handleChange}/>
          </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formdata.password} onChange={handleChange}/>
            </Form.Group>
      
    </Form>
        <Button variant="primary" onClick={user_login} disabled={!formdata.email || !formdata.password}>
        Submit
       </Button>
        </div>
    )
}