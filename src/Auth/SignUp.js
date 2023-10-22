import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";


// const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"
const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc";


export default function SignUp() {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
        confirmPassword:""
    })
    const[err,setErr]=useState("")
    function handleChange(e) {
        setFormdata(prev => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    function user_sign_up() {
        fetch(signupApi, {
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
    useEffect(() => {
        if (formdata.password.length>=8 && formdata.password !== formdata.confirmPassword) {
            setErr('passwords dont match')
        } else if(formdata.password.length>0 && formdata.password.length<8){
            setErr("password should atleast be 8 characters")
        }
    },[formdata.email,formdata.password,formdata.confirmPassword])
    return (
        <div style={{padding:"10px"}}>
           
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={formdata.email} onChange={handleChange}/>
          </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formdata.password} onChange={handleChange}/>
            </Form.Group>
        <Form.Group controlId="formBasicPassword">
           <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formdata.confirmPassword} onChange={handleChange}/>
                </Form.Group>
                <Form.Text style={{color:"red"}}>{err}</Form.Text>
    </Form>
            <Button variant="primary" onClick={() => {
                if (formdata.email && formdata.password === formdata.confirmPassword)
                    user_sign_up()
            }}>
        Submit
       </Button>
        </div>
    )
}