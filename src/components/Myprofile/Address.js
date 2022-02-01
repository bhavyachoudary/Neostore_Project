import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel, Card } from 'react-bootstrap'
import { MdOutlineCompareArrows, MdModeEdit, MdDelete } from 'react-icons/md'
import { BiCheckbox } from 'react-icons/bi';
import MyAccount from './MyAccount';
import { getProfile, addAddress, deleteAddr, editAddress, cardaddress } from '../../config/Myservice'
import { useLocation } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function Address() {

    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_states: '', err_country: ''
    })
    const [user, setUser] = useState([]);
    const [showadd, setShowadd] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [states, setstates] = useState('');
    const [country, setCountry] = useState('')
    const [show, setShow] = useState(false);
    const [Address_id, setAddress_id] = useState('');
    const [status, setStatus] = useState(false)
    const [getAddress, setGetAddress] = useState([])
    const [email, setEmail] = useState('');
    const [selectAddr, setSelectAddr] = useState('');
    const { state } = useLocation();
    const [hide, setHide] = useState(false);
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    console.log(res.data.address)
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setGetAddress(res.data.address)
                    console.log(res.data.address)

                    console.log(user)
                    // console.log(user.Address)
                }
            })
    }, [show, status])

    const Addnewaddress = (e) => {
        e.preventDefault();
        console.log("Add Address")
        let email = sessionStorage.getItem('user')
        let data = { email: email, address: address, pincode: pincode, city: city, states: states, country: country }
        console.log(data)
        addAddress(data)
            .then((res) => {
                console.log(res.data)
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    setStatus(true)
                }
            })
        setShow(false)
        // window.location.reload();

    }

    const editadd = (event, addr) => {
        event.preventDefault();
        console.log(addr)
        console.log("edit  address clicked")
        setAddress(addr.address)
        setPincode(addr.pincode)
        setCity(addr.city)
        setstates(addr.states)
        setCountry(addr.country)
        setAddress_id(addr.Address_id)
        setShowadd(true);
        console.log(showadd)
    }

    const Addaddress = (e) => {
        e.preventDefault();
        let update = true;
        console.log("Add Address")
        let email = sessionStorage.getItem('user')
        let data = { Address_id: Address_id, email: email, address: address, pincode: pincode, city: city, states: states, country: country, update: update }
        console.log(data)
        editAddress(data)
            .then((res) => {
                console.log(res.data)
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    setStatus(true)
                }
            })

        setShowadd(false)
        //window.location.reload();
    }

    const deleteAdd = (e, addr) => {
        e.preventDefault();
        console.log(addr)
        let email = sessionStorage.getItem('user')
        deleteAddr(email, addr)
            .then((res) => {
                console.log(res.data)
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    warning(res.data.msg)
                    setStatus(true)
                }

            })
        setStatus(false)

    }


    const selectadd = (e, addr) => {
        e.preventDefault();
        let useraddress = { email: sessionStorage.getItem('user'), selectaddr: addr, orderno: state.orderno }
        cardaddress(useraddress)
            .then((res) => {
                console.log(res.data)
                success("Address added successfully ")
                setHide(true)

                localStorage.removeItem("mycart");
            });

    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <Container fluid>
                <Container >
                    <h3>My Account</h3>
                    <hr />
                    <Row >
                        <Col lg={5}>
                            <MyAccount />
                        </Col>
                        <Col lg={7} md={12} sm={12} >

                            <Card style={{ width: "550px" }} className="pl-4 mb-2">
                                <section >

                                    <Row className="pt-2">
                                        <h2>Address</h2>
                                        <div style={{ textAlign: "right" }}>
                                            <Button variant="primary" size="sm" onClick={handleShow} className="ml-5">
                                                Add Address
                                            </Button>
                                        </div>

                                    </Row>
                                    < hr className="mr-3" />
                                </section>

                                <section >
                                    {getAddress.map((addr) =>
                                        <Row >
                                            <div>
                                                <a onClick={(e) => { selectadd(e, addr) }}><BiCheckbox /> </a>
                                            </div>
                                            <Card style={{ width: "500px", height: "150px" }} className="mt-1 p-2 mb-1" >

                                                <h6>{addr.address} <span>,{addr.states}</span></h6>
                                                <h6>{addr.city} <span>,{addr.pincode}</span></h6>
                                                <h6>{addr.country}</h6>
                                                <div>
                                                    <Button onClick={(e) => { editadd(e, addr) }} variant="secondary"><MdModeEdit />Edit</Button>
                                                    <Button onClick={(e) => { deleteAdd(e, addr) }} variant="danger" style={{ marginLeft: "10px" }}><MdDelete />Delete</Button>

                                                </div>

                                            </Card>

                                            <hr />

                                            {showadd ?
                                                <Modal show={showadd} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Edit Your Account Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form >
                                                            <h6>Edit Your Account</h6>
                                                            <FloatingLabel label="Address" className="mb-3">
                                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                                                <Form.Text id="passwordHelpBlock" muted>
                                                                    Max 100 char
                                                                </Form.Text>
                                                                <span style={{ color: 'red' }}>{errors.err_address}</span>
                                                            </FloatingLabel>

                                                            <Row>
                                                                <Col sm={6} md={6} lg={6}>
                                                                    <Form.Group className="mb-3" >
                                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                                        <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                                    <Form.Control type="text" name="city" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                                    <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                                </Form.Group></Col>
                                                            </Row>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="states" placeholder='states' value={states} onChange={(e) => { setstates(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_states}</span>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="country" placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_country}</span>
                                                            </Form.Group>

                                                            <div style={{ textAlign: "center" }}>
                                                                <Button variant="primary" type="submit" onClick={Addaddress} >
                                                                    Submit
                                                                </Button>
                                                            </div>
                                                        </Form>

                                                    </Modal.Body>

                                                </Modal>
                                                : ''}
                                        </Row>

                                    )}

                                </section>

                                <Modal show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title >Add Address Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form  >

                                            <FloatingLabel label="Address" className="mb-3">
                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" onChange={(e) => { setAddress(e.target.value) }} />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Max 100 char
                                                </Form.Text>
                                                {<span style={{ color: 'red' }}>{errors.err_address}</span>}
                                            </FloatingLabel>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                        {<span style={{ color: 'red' }}>{errors.err_pincode}</span>}
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                    <Form.Control type="text" name="city" placeholder='City' onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                    {<span style={{ color: 'red' }}>{errors.err_city}</span>}
                                                </Form.Group></Col>
                                            </Row>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="states" placeholder='states' onChange={(e) => { setstates(e.target.value) }} className="form-control" size="20" />
                                                {<span style={{ color: 'red' }}>{errors.err_states}</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="country" placeholder='Country' onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                {<span style={{ color: 'red' }}>{errors.err_country}</span>}
                                            </Form.Group>

                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="primary" type="submit" onClick={Addnewaddress} >
                                                    Submit
                                                </Button>

                                            </div>
                                        </Form>

                                    </Modal.Body>

                                </Modal>
                            </Card>
                            {hide ?
                                <Button variant="primary" href='/order' className="mb-2">Confirm Order</Button>
                                : ""
                            }
                        </Col>

                    </Row>
                </Container>

            </Container>
        </>
    )
}

