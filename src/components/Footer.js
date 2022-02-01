import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
function Footer() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
    //For Storing Entered Email by Users
    sessionStorage.setItem("subscriber", value);

    const subscribe = () => {
        console.log(value)
        if (value === '' && !regForEmail.test(value)) {
            failure("Please enter valid email to subscribe")

        }
        else {
            navigate('/thankyou')
        }

    }
    return (
        <div>
            <div className='bg-dark footer p-5'>
                <Row>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>About Company</h4>
                            <li><a href="" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>NeoSOFT Technologies is here at your quick and easy service for Shopping</a></li>
                            <li><a href="" target="_blank" style={{ textDecoration: 'none', color: 'white' }}> Contact Information</a></li>
                            <li><a href="mailto:https://www.gmail.com" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Email : contact@neosofttech.com</a></li>
                            <li><a href="tel:+91-9876543210" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Phone : +91 9884312345</a></li>
                            <li>Mumbai, India</li>
                        </ul>
                    </Col>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>Information</h4>
                            <li><a href="http://localhost:3000/Neostore terms.pdf" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Terms and Conditions</a></li>
                            <li><a href="" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Gaurantee and Return Policy</a></li>
                            <li><a href="" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</a></li>
                            <li><a href="" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Privacy Policy</a></li>
                            <li><a href="https://www.google.com/maps/place/NeoSoft+Technologies+Pvt+Ltd/@12.9248619,77.6318783,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae1461cedd72cd:0xaf90c635b8fab72!8m2!3d12.9248619!4d77.634067" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Locate Us</a></li>
                        </ul>
                    </Col>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>News Letter</h4>
                            <li>Signup to get exclusive offer from our favourite brands and to be sale up in the news</li><br />
                            <form>
                                <li><input type="text" placeholder='Your Email...' name="value" onChange={(event) => { setValue(event.target.value) }} required ></input> </li>
                                {value != '' && !regForEmail.test(value) && <span className="text-light">Enter email correctly</span>}
                                <br />
                                <li><Button className='btn btn-light' onClick={() => subscribe()}>Subscribe</Button></li>
                            </form>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <div className="row text-center text-white">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Neosoft Technology | All rights reserved |
                        Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
