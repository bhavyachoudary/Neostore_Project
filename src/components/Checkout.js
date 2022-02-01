import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getOrderdata } from '../config/Myservice';
import { authentication } from '../config/Myservice';
import { useLocation } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function Checkout() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
  const [cnumber, setCnumber] = useState(0);
  const [cart, setCart] = useState([]);
  const { state } = useLocation();

const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });


  useEffect(() => {
    if (sessionStorage.getItem('_token') != undefined) {
      authentication(sessionStorage.getItem("_token")).then(res => {
        if (res.data.msg) {
          success(res.data.msg)
        }
      })
    }
    else {
      warning('Login is Required');
      navigate('/login')
    }

    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);

  }, [])

  const checkout = () => {
    if (cnumber.length == undefined) {
      failure("please enter credit cart number")
    }
    else if (cnumber.length <= 16) {
      warning("enter 16 digits ")
    }
    else {
      navigate('/address', { state: { orderno: state.orderno } })

    }

  }

  return (

    <>
      <Container className="mt-3 w-50">
        <h2>Check out</h2>
        <Form>
          <Form.Group className="mb-3" as={Row} >
            <Form.Label column sm={2}>Credit card</Form.Label>
            <Col sm={7}>
              <Form.Control type="number" placeholder="Enter credit card number" name="cnumber" onChange={(e) => { setCnumber(e.target.value) }} required />
              {cnumber != '' && cnumber.length <= 16 && <span className="text-danger">Enter creidt card number correctly</span>}</Col>
            {/* <h4 className="mt-4">Order total: </h4> */}
          </Form.Group>
          <Button variant="secondary" className="mb-2" onClick={() => checkout()}>Checkout </Button>
        </Form>
      </Container>
    </>
  )
}