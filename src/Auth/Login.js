import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"

export default function Login(props) {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    })
    const [err, setErr] = useState(""); // Add state for error message
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
                setErr("")
            } else {
                setErr("Incorrect email/password"); // Set the error message
                console.log("Request failed with status: " + res.status);
            }
        }).catch(e => {
            setErr("An error occurred. Please try again."); // Set the error message
            console.log(e);
        });
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formdata.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formdata.password} onChange={handleChange} />
                </Form.Group>
            </Form>

            {err && <div style={{ color: "red" }}>{err}</div>}

            <Link to="/welcome">
                <Button variant="primary"
                    onClick={user_login}
                    disabled={!formdata.email || !formdata.password}
                >
                    Login
                </Button>
            </Link>

            <div onClick={props.handleLogin}>New here?<span>SignUp</span></div>
        </div>
    )
}
