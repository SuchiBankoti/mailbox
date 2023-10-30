import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authMailSignUp } from "../Store/CreateSlice";




export default function SignUp(props) {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
        confirmPassword:""
    })
    const dispatch=useDispatch()
    const[err,setErr]=useState("")
    function handleChange(e) {
        setFormdata(prev => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    function user_sign_up() {
        dispatch(authMailSignUp(formdata))
    }
    useEffect(() => {
        if (formdata.password.length>=8 && formdata.password !== formdata.confirmPassword) {
            setErr('passwords dont match')
        } else if(formdata.password.length>0 && formdata.password.length<8){
            setErr("password should atleast be 8 characters")
        } else {
            setErr("")
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
            <Form.Control type="password" placeholder="Password" name="confirmPassword" value={formdata.confirmPassword} onChange={handleChange}/>
                </Form.Group>
                <Form.Text style={{color:"red"}}>{err}</Form.Text>
            </Form>
            {(err === "" && formdata.email && formdata.password === formdata.confirmPassword) ? <Link to="/welcome">
                <Button variant="primary" onClick={() => {
                    if (formdata.email && formdata.password === formdata.confirmPassword)
                        user_sign_up()
                }}>
                    SignUp
                </Button>
            </Link>:<Button onClick={()=>setErr("invalid credentials")}>SignUp</Button>}
            <div onClick={props.handleLogin}>Already have an account?<span>Login</span></div>
        </div>
    )
}