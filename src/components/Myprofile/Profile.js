import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import MyAccount from './MyAccount';
import { getProfile, updProfile } from '../../config/Myservice';
import axios from 'axios';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Profile() {
    let [user, setUser] = useState([]);
    // const [file, setFile] = useState("");
    const [showInvoice, setShowInvoice] = useState(false)
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [lname, setLname] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [email, setEmail] = useState('');
    const navigate = useNavigate();
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setName(data.name);
                    setPhone(data.phone);

                }
            })
    }, [])


    const updateProfile = (id) => {
        let data = {
            name: name, lname: lname, email: email, phone: phone
        };
        console.log(data)
        updProfile(id, data)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err);
                }
                else {
                    success(res.data.msg);
                    window.location.reload();
                }
            })
    }


    return (
        <>
            <Container className="pt-3 pb-3">
                <h3>My Account</h3>
                <hr />
                <Row>
                    <Col lg={5}>
                        <MyAccount />
                    </Col>

                    <Col lg={7} md={12} sm={12}>
                        {!showInvoice && (
                            <Container>
                                <Card style={{ width: "500px" }} className="m-1 p-2">
                                    <Card.Title style={{ fontSize: "32px" }}>Profile</Card.Title>
                                    <hr />
                                    <Card.Body style={{ fontSize: "20px", fontWeight: 'bold' }} >
                                        <Card.Text>FirstName:&nbsp;   <span>{user.name}   </span></Card.Text>
                                        <Card.Text>   <span>LastName:&nbsp;{user.lname} </span> </Card.Text>
                                        <Card.Text><span> Email:&nbsp;{user.email}</span></Card.Text>
                                        <Card.Text><span> Gender:&nbsp;{user.gender}</span></Card.Text>
                                        <Card.Text>
                                            Mobile:&nbsp; {user.phone}

                                        </Card.Text>
                                        <hr />
                                        <Button variant="secondary" onClick={() => setShowInvoice(true)}>Edit profile</Button>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )}
                        {showInvoice && (
                            <Container className="m-1">

                                <Card style={{ width: "500px", height: "400px" }} className="m-1 p-4">
                                    <h2 className="text-center pt-3 p-3">Update Profile </h2>
                                    <Form >
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                <b>First Name</b>
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder="Enter Name" name="lname" defaultValue={user.name} onChange={(e) => { setName(e.target.value) }}
                                                />
                                                {name != '' && name.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                <b>Last Name</b>
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder="Enter Name" name="fname" defaultValue={user.lname} onChange={(e) => { setLname(e.target.value) }}
                                                />
                                                {lname != '' && lname.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                <b>Email</b>
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder="Enter Email" name="email" defaultValue={user.email} readOnly />
                                                {email != '' && !regForEmail.test(email)
                                                    && <span className="text-danger">Enter email  correctly</span>}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                <b>  Mobile</b>
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder="Enter mobile number" name="phone" defaultValue={user.phone} onChange={(e) => { setPhone(e.target.value) }} />
                                                {phone != '' && phone.toString().length !== 10 && <span className="text-danger">Enter Mobile number correctly</span>}
                                            </Col>
                                        </Form.Group>


                                        <Button variant="info" onClick={() => updateProfile(user._id)} className="mt-3">Update</Button>
                                        <Button variant="danger" onClick={() => setShowInvoice(false)} className="mt-3 ml-3">Close</Button>
                                    </Form>
                                </Card>
                            </Container>
                        )}
                    </Col>


                </Row>

            </Container>
        </>
    )
}
