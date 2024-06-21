import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "../login/login.component.css";
import instashare from '../../assets/images/instashare.png';
import loginlogo from '../../assets/images/login.png';
import { getcustomers } from "../../services/customer.service";
import { setLocalStorageItem } from "../../services/storage/local.storage";

export function UserLogin() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    function validateForm() {
        let isValid = true;
        const newErrors = { username: '', password: '' };

        if (!usernameRef.current.value) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!passwordRef.current.value) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function userlogin() {
        if (!validateForm()) {
            return;
        }

        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        getcustomers().then((res) => {
            let filterdata = res.data.filter((item) =>
                item.username === username && item.password === password
            );

            if (filterdata.length > 0) {
                setLocalStorageItem("userdata", filterdata);
                sessionStorage.setItem("loggin", "jnxikah91uuwhut18y72tyt7r5zrqq6t2y82d9u9ihd8y");
                navigate("/sharefields");
                window.location.reload();
            } else {
                alert("Username OR password incorrect");
            }
        }).catch((ex) => {
            alert(ex.message);
        });
    }

    return (
        <>
            <div className="login-main-head">
                <div className="login-pic">
                    <img src={loginlogo} alt="" />
                </div>
                <div className="login-main">
                    <div className="login-logo">
                        <img src={instashare} alt="" />
                    </div>
                    <div className="login-head">
                        <h5>Signin</h5>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="login-inner">
                        <div className="login-group">
                            <label>Username:</label>
                            <br />
                            <input
                                type="text"
                                ref={usernameRef}
                                placeholder="Enter Your Username"
                            />
                            {errors.username && <div className="error">{errors.username}</div>}
                        </div>
                        <div className="login-group">
                            <label>Password:</label>
                            <br />
                            <input
                                type="password"
                                ref={passwordRef}
                                placeholder="Password"
                               
                            />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                        <div className="login-group">
                            <Button className="login-btn" type="button" onClick={userlogin}>
                                Login <ArrowRight />
                            </Button>
                        </div>
                        <div className="login-group">
                            <span className="forgot-link">
                                Forgot Password? <a href="/forgotpass">Click Here</a>
                            </span>
                        </div>
                        <div className="login-group">
                            Don't have an account? <a href="/register">Register now</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
