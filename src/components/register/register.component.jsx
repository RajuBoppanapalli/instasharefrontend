import { Button } from "react-bootstrap";
import "../register/register.component.css";
import instashare from '../../assets/images/instashare.png';
import loginlogo from '../../assets/images/login.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:4002/savecustomer', formData);
                alert("Registration completed");
                navigate(`/`);
            } catch (error) {
                if (error.response && error.response.data.error) {
                    setErrors({ server: error.response.data.error });
                } else {
                    console.error("There was an error registering!", error);
                }
            }
        } else {
            setErrors(formErrors);
        }
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is invalid';
        }

        if (!formData.username) {
            formErrors.username = 'Username is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        }

        return formErrors;
    };

    return (
        <>
        <div className="registration-main-head">
            <div className="registration-pic">
                <img src={loginlogo} alt="" />
            </div>
            <div className="registration-main">
                <div className="registration-logo">
                    <img src={instashare} alt="" />
                </div>
                <div className="registration-head">
                    <h5>Registration</h5>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="registration-inner">
                    <form onSubmit={handleSubmit}>
                        <div className="registration-input-div">
                            <label htmlFor="email">Email: </label>
                            <br />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email" 
                            />
                            {errors.email && <div className="error" style={{color:"red"}}>{errors.email}</div>}
                        </div>
                        <div className="registration-input-div">
                            <label htmlFor="username">UserName: </label>
                            <br />
                            <input 
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="UserName" 
                            />
                            {errors.username && <div className="error" style={{color:"red"}}>{errors.username}</div>}
                        </div>
                        <div className="registration-input-div">
                            <label htmlFor="password">Password: </label>
                            <br />
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password" 
                            />
                            {errors.password && <div className="error" style={{color:"red"}}>{errors.password}</div>}
                        </div>
                        {errors.server && <div className="error" style={{color:"red"}}>{errors.server}</div>}
                        <div className="registration-input-div">
                            <Button type="submit" className="registration-btn">Register</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
