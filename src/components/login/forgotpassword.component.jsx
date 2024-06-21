import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import instashare from '../../assets/images/instashare.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import"../login/forgotpassword.component.css"

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null); // State to track success or error
    let navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            let response = await axios.post('http://localhost:4002/forgotpassword', { email });
            setMessage('Your Password has been sent to your email.');
            setIsSuccess(true);
            setTimeout(()=>{
                navigate(`/`)
               
            },2000)
           
        } catch (error) {
            console.error('Error during forgot password request:', error);
            setMessage('Email not found.');
            setIsSuccess(false);
        }
    };

    return (
        <>
            <div className="registration-main">
                <div className="registration-logo"><img src={instashare} alt="" /></div>
                <div className="registration-head">
                    <h3>Reset Password</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="registration-inner">
                    <div className="login-group">
                        <label>Email:</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-group">
                        <Button className="login-btn" type="button" onClick={handleForgotPassword}>Reset Password</Button>
                    </div>
                    {message && (
                        <div className="login-group">
                            <p className={isSuccess ? 'message-success' : 'message-error'}>
                                {message}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
