import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'


function Footer() {
    const [value, setValue] = useState('');
    //For Storing Entered Email by Users
    const onChange = (event) => {
        sessionStorage.setItem("subscriber", event.target.value);
        setValue(event.target.value)
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
                            <li><input type="text" placeholder='Your Email...' value={value} onChange={onChange}></input></li>
                            <br />
                            <li><Button href='thankyou' className='btn btn-light'>Subscribe</Button></li>
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
