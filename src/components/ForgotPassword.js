import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
//import { getOtp } from '../config/Myservice';
import { forgotPassword, getOtp, sendMailotp } from '../config/Myservice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
function ForgotPassword() {
    const [errors, setError] = useState({ err_vcode: '', err_npass: '', err_cpass: '', err_email: '' })
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confpassword, setConfpassword] = useState('');
    let [otp, setOtp] = useState('')
    let [otpcode, setOtpcode] = useState('');
    const navigate = useNavigate();
    const vcode = useRef('');
    
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    console.log(otp)
    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'vcode':
                console.log(vcode.current.value == otp)
                const e_vcode = (vcode.current.value == otp) ? '' : 'Wrong OTP';
                setError({ err_vcode: e_vcode })
                break;

            default:

                break;
        }
    }
    console.log(otpcode)

    const sendotp = async () => {
        let data = { email: email }
        sendMailotp(data)
            .then((res, err) => {
                console.log(res.data)
                setOtp(res.data.otpcod)
                if (res.data.err) {
                    failure(res.data.err)
                } else {
                    success(res.data.msg)

                }
            })
    }
    const changepassword = async () => {
        let data = { otpcode: otpcode, password: password, confpassword: confpassword, email: email }
        console.log(otpcode)
        forgotPassword(data)
            .then((res) => {
                if (res.data.err) {
                    failure(res.data.msg)
                } else {
                    success(res.data.msg)
                    navigate("/login")
                }
            })
    }

    const submit = (event) => {

        event.preventDefault();
        console.log(vcode.current.value)
        console.log(otp)

        if (vcode.current.value == otp) {
            success("OTP MAtched")

        }
        else {
            failure("OTP NOT MATCH !! TRY AGAIN")
        }


    }

    return (
        <>
            <Container className="bg-light w-50 mt-1">
                <h2 className="text-center pt-1">Forgot Password</h2>
                <Form onSubmit={changepassword}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                    </Form.Group>
                    <Button onClick={sendotp}>Send OTP</Button><br />

                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">

                        <Form.Label>Enter Otp</Form.Label>

                        <Form.Control type="number" placeholder="Verification Code" name="vcode" onChange={handler} className="form-control" ref={vcode} />
                        <span style={{ color: 'red' }}>{errors.err_vcode}</span><br />
                        <Button onClick={submit}>verifyOtp</Button>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        {password != '' && password.length < 8 && <span className="text-danger">Enter New Password  correctly</span>}

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password" name="confpassword" onChange={(e) => { setConfpassword(e.target.value) }} />
                        {confpassword != '' && confpassword.length < 8 && <span className="text-danger">Enter Confirm Password  correctly</span>}
                    </Form.Group>
                    <Button variant="primary" onClick={changepassword}>
                        Change Password
                    </Button>
                </Form>
            </Container><br /><br />

        </>
    )
}

export default ForgotPassword