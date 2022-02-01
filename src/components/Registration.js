import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { registerUser,socialloggin } from '../config/Myservice';
import { useNavigate } from 'react-router';
import * as Icon from 'react-bootstrap-icons';
import SocialButton from '../components/SocialLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Registration() {
    let [name, setName] = useState('');
    let [lname, setLname] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmpassword, setConfirmpassword] = useState('');
    let [gender, setGender] = useState('');
    const navigate = useNavigate();

    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    const register = () => {
        let data = { name: name, lname: lname, phone: phone, email: email, password: password, confirmpassword: confirmpassword, gender: gender };
        console.log(data)
        registerUser(data)
            .then(res => {
                if (res.data.err) {
                    console.log(res.data.err)
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    console.log(res.data.msg)
                    navigate('/login')
                }
            });
    }

    const handleSocialLogin = (user) => {
        console.log(user);
        let email = user._profile.email
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
                navigate("/login");
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

            <Container className="mt-4">
                <div className="d-flex justify-content-center">
                <div className="row col-lg-8 ">
                    <div className=" col-md-6 col-sm-10 mb-3 ">
                        <SocialButton
                            className="btn btn-danger col-lg-8 p-2 mb-3"
                            provider="google"
                            appId="541294076156-665cub3gp8l3lvnhhtcp6eqtv6mrb080.apps.googleusercontent.com"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                        >
                            <i className="mr-3"><Icon.Google size={25} /></i> Login with Gmail
                        </SocialButton>

                    </div>
                    <div class="col-md-6 col-sm-10 "> 
                    <SocialButton
                                className="btn btn-primary col-lg-8 p-2 mb-3"

                                provider="facebook"
                                appId="564806257914027"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                            >
                                <i className="mr-3"><Icon.Facebook size={25} /></i> Login with Facebook
                            </SocialButton>
                     </div>
                </div>
                </div>
                <Container className="mt-3 w-75 bg-light p-4">
                    <h1 className="text-center text-dark pb-3">Register to NeoStore</h1>

                    <Form >
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>FirstName:</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" name="name" id="name" onChange={(event) => { setName(event.target.value) }} required />
                                    {name != '' && name.length < 4 && <span className="text-danger">Enter firstName correctly</span>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>LastName:</b></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Last Name" name="lname" id="lname" onChange={(event) => { setLname(event.target.value) }} required />
                                    {name != '' && name.length < 4 && <span className="text-danger">Enter lastName correctly</span>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>

                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Email:</b></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={(event) => { setEmail(event.target.value) }} required />
                                    {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Mobile:</b></Form.Label>
                                    <Form.Control type="number" placeholder="Enter  Mobile Number" name="phone" id="phone" onChange={(event) => { setPhone(event.target.value) }} required />
                                    {phone != '' && phone.length < 10 && <span className="text-danger">Enter Phone Number correctly</span>}
                                </Form.Group>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Pasword:</b></Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={(event) => { setPassword(event.target.value) }} required />
                                    {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Confirm Password:</b></Form.Label>
                                    <Form.Control type="password" placeholder="Enter ConfirmPassword" name="confirmpassword" id="confirmpassword" onChange={(event) => { setConfirmpassword(event.target.value) }} required />
                                    {confirmpassword != '' && confirmpassword != password && <span className="text-danger">Passwords doesn't match</span>}
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="pr-2"><b>Gender:</b></Form.Label>
                                <input type="radio" value="Male" name="gender" className="mt-1 pl-2" onChange={(event) => { setGender(event.target.value) }} /> Male &nbsp;
                                <input type="radio" value="Female" name="gender" className="mt-1 pl-2" onChange={(event) => { setGender(event.target.value) }} /> Female<br /><br />
                            </Form.Group>
                        </Row>
                        <Button variant="success" onClick={register}>Register</Button>
                        <Button variant="warning" type="submit" href="/login" className="ml-3"> Login</Button>
                    </Form>
                </Container>
            </Container>
        </>
    )
}
