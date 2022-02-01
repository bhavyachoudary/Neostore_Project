import React, { useState, useEffect } from 'react'
import { Navbar, NavDropdown, Container, Nav, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { BsCartFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router';


function Headers() {
    const [length, setLength] = useState('')
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('user')
        navigate('/')
    }

    useEffect(() => {
        let arr = JSON.parse(localStorage.getItem('mycart'));
        console.log(arr)
        if (arr === null) {
            setLength(0)
        }
        else {
            setLength(arr.length)
            console.log(length)
        }

    })

    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home"><h2 style={{ color: 'white' }}>Neo<span style={{ color: 'red' }}>STORE</span></h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarscroll" />
                    <Navbar.Collapse id="navbarscroll">
                        <Container
                            className="d-flex justify-content-center "
                            style={{ maxHeight: '100px', fontSize: "17px" }}>
                            <Nav.Link href="/" className="text-white">Home</Nav.Link>
                            <Nav.Link href="/products" className="text-white">Products</Nav.Link>
                            <Nav.Link href="/allorders" className="text-white">Order</Nav.Link>
                        </Container>

                        {/* <Form className="d-flex ml-auto">
                            <FormControl
                                type="search"
                                placeholder="Search"

                                aria-label="Search"
                            />
                        </Form>&nbsp; */}

                        l <Button variant="light" ><a  style={{ textDecoration: 'none'}} className="text-dark d-flex"  href="/cart" >
                            <BsCartFill style={{ fontSize: "20px" }} />&nbsp;<i>{length}</i></a>
                        </Button>&nbsp;

                        <DropdownButton variant="light" title={<FaUserEdit size={22} />}>
                            {sessionStorage.getItem('_token') == undefined ? <>

                                <Dropdown.Item href="/login">Login</Dropdown.Item>

                                <Dropdown.Item href="/register">Register</Dropdown.Item>

                            </> : 
                            <>

                                <Dropdown.Item href="/profile">My Profile</Dropdown.Item>

                                <Dropdown.Item href="/login" onClick={logout}>Logout</Dropdown.Item>
                            </>}

                        </DropdownButton>


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Headers
