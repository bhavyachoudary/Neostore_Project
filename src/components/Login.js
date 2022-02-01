import React, { useState, useEffect } from 'react'
import { Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { loginUser, socialloggin } from '../config/Myservice';
import * as Icon from 'react-bootstrap-icons';
import SocialButton from '../components/SocialLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    //let [social, setSocial] = useState('')
    const [state, setstate] = useState({ userData: [] })
    const navigate = useNavigate();

    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        if (sessionStorage.getItem('_token') != undefined) {
            sessionStorage.removeItem('_token')
        }

    }, [])

    const login = (event) => {
        event.preventDefault()
        let data = { email: email, password: password };
        loginUser(data)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    console.log(res.data)
                    console.log(email)
                    sessionStorage.setItem("user", email);
                    sessionStorage.setItem("_token", res.data.token)
                    navigate('/')
                }

            });
    }
    const handleSocialLogin = (user) => {
        console.log(user);
        let email=user._profile.email
        let data = {
            name: user._profile.firstName,
            lname: user._profile.lastName,
            email: email,
          
        };
        socialloggin(data).then((res) => {
            if (res.data.err) {
                failure(res.data.err);
            } else {
                success(res.data.msg);
                navigate("/");
                sessionStorage.setItem("_token", res.data.token);
                sessionStorage.setItem("user", email);
            }
        });
       
       
    };
   
    const handleSocialLoginFailure = (err) => {
        console.error(err);
       
    };

    return (
        <>

            <Container className="d-flex justify-content-center mt-5 mb-5">

                <Container className="conatiner mt-3 mb-5">
                    <Row>
                        <Col lg="6" className="mt-4">


                            <SocialButton
                                className="btn btn-danger col-lg-8 p-2 mb-3"
                                provider="google"
                                appId="541294076156-665cub3gp8l3lvnhhtcp6eqtv6mrb080.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <i className="mr-3"><Icon.Google size={25} /></i> Login with Gmail
                            </SocialButton>

                            <SocialButton
                                className="btn btn-primary col-lg-8 p-2 mb-3"

                                provider="facebook"
                                appId="564806257914027"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <i className="mr-3"><Icon.Facebook size={25} /></i> Login with Facebook
                            </SocialButton>



                        </Col>

                        <div class="line">
                        </div>
                        <Col lg="6">
                            <Form className=" bg-light p-2" onSubmit={login}>
                                <h2 className="pb-1 text-center">Login to NeoStore </h2>

                                <Form.Group className="mb-3 mt-3">

                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                                        {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group className="mb-3" >

                                    <Col sm="10">
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                        {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                                    </Col>
                                </Form.Group>

                                <Button variant="success" type="submit">Login</Button>

                            </Form>
                        </Col>
                    </Row>
                    <div class="text-center mt-4">
                        <Button variant="light" type="submit" href="/register" className="ml-2" >Register Now</Button>
                        <Button variant="light" type="submit" href="/forgotpassword" className="ml-2" >Forgot Password</Button>
                    </div>
                </Container>

            </Container>
        </>

    )
}
