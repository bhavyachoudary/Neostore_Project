import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getProfile, changePass } from '../../config/Myservice';
import MyAccount from './MyAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function ChangePassword() {
    let [password, setPassword] = useState('');
    let [newpassword, setNewpassword] = useState('');
    let [confirmpassword, setConfirmpassword] = useState('');
    let [user, setUser] = useState('');
    const [errors, setError] = useState({ err_vcode: '', err_npass: '', err_cpass: '', err_email: '' })
    let [otp, setOtp] = useState('')
    const vcode = useRef('');
    const navigate = useNavigate()
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'vcode':
                console.log(user.password)
                console.log(user.name)
                console.log(vcode.current.value == user.password)
                const e_vcode = (vcode.current.value == user.password) ? '' : 'Password does not match';
                setError({ err_vcode: e_vcode })
                break;

            default:

                break;
        }
    }

    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    setUser(res.data.user);

                }
            })
    }, [])

    const changepassword = async (id) => {
        let data = { password: password, confirmpassword: confirmpassword }
        console.log(data)
        changePass(id, data)
            .then(res => {
                if (res.data.err ===1) {
                    failure(res.data.msg);
                }
                else {
                    success(res.data.msg);
                    navigate('/login')

                }
            })
    }
    return (
        <>

            <Container  >
                <h3>My Account</h3>
                <hr />
                <Row>
                    <Col lg={5}>
                        <MyAccount />

                    </Col>

                    <Col lg={7} md={12} sm={12}>
                        <Container className="m-1">
                            <Card style={{ width: "500px" }} className="m-1 p-2">
                                <h4 className="text-center pt-1">Change Password </h4>
                                <hr />
                                <Form>

                                    <Form.Group className="mb-3 mt-1" controlId="formBasicEmail">

                                        <Form.Label>Old Password</Form.Label>

                                        <Form.Control type="text" placeholder="Enter Old Password" name="vcode" onChange={handler} className="form-control" ref={vcode} />
                                        <span style={{ color: 'red' }}>{errors.err_vcode}</span><br />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                        {password != '' && password.length < 8 && <span className="text-danger">Enter New Password  correctly</span>}

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Confirm Password" name="newpassword" onChange={(e) => { setConfirmpassword(e.target.value) }} />
                                        {confirmpassword != '' && confirmpassword != password && <span className="text-danger">Enter Confirm Password  correctly</span>}
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => changepassword(user._id)}>
                                        Change Password
                                    </Button>
                                </Form>
                            </Card>
                        </Container>
                    </Col>

                </Row>
            </Container>
        </>
    )
}
