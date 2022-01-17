import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getOrderdata } from '../config/Myservice';
import { authentication } from '../config/Myservice';
import Headers from './Headers';
import { useLocation } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
  const [cnumber, setCnumber] = useState(0);
  const [cart, setCart] = useState([]);
  const { state } = useLocation();


  useEffect(() => {
    if (sessionStorage.getItem('_token') != undefined) {
      authentication(sessionStorage.getItem("_token")).then(res => {
        if (res.data.msg) {
          alert(res.data.msg)
        }
      })
    }
    else {
      alert('Login is Required');
      navigate('/login')
    }

    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);

  }, [])

  const checkout = () => {
    navigate('/address', { state: { orderno: state.orderno } })
 
  }

  return (

    <>
     
      <Container className="mt-3">
        <h2>Check out</h2>
        <Form>
          <Form.Group className="mb-3" as={Row} >
            <Form.Label column sm={2}>Credit card</Form.Label>
            <Col sm={7}>
              <Form.Control type="number" placeholder="Enter credit card number" name="cnumber" onChange={(e) => { setCnumber(e.target.value) }} />
              {cnumber != '' && cnumber.length < 16 && <span className="text-danger">Enter creidt card number correctly</span>}</Col>
            {/* <h4 className="mt-4">Order total: </h4> */}
          </Form.Group>
          <Button variant="secondary" className="mb-2" onClick={() => checkout()}>Check out </Button>
        </Form>
      </Container>
    </>
  )
}