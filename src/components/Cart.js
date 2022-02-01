import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { authentication, createOrders } from "../config/Myservice";
import { MdDelete } from 'react-icons/md'
import Headers from "./Headers";
import { Windows } from "react-bootstrap-icons";

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    let items = [];
    let total = [0];

    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);



    const onAdd = (index) => {
        console.log(cart[index])
        let temp = [...cart]
        temp[index].quantity++
        setCart(temp)
        localStorage.setItem('mycart', JSON.stringify(temp))

    };

    const onRemove = (index) => {
        console.log(cart[index])
        let temp = [...cart]
        if (temp[index].quantity > 1) {
            temp[index].quantity--

            setCart(temp)
        }
        localStorage.setItem('mycart', JSON.stringify(temp))

    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
        window.location.reload(false);
    };


    const proceedBuy = () => {
        console.log(cart);
        if (cart.length === 0) {
            alert("Your Cart is Empty")

        }
        else {
            cart.map((value) => {
                let allorders = { product_name: `${value.item.product_name}`, product_cost: `${value.item.product_cost}`, product_image: `${value.item.product_image}`, quantity: `${value.quantity}` }
                items.push(allorders)
                console.log(items.product_name)
            });

            let email = sessionStorage.getItem('user')
            let orderno = Math.random().toFixed(6).split('.')[1];
            let checkout = {
                email: email,
                items: items,
                orderno: orderno,
                total: total.reduce((result, number) => result + number),
            };
            console.log(checkout);
            createOrders(checkout)
                .then((res) => {
                    console.log(res.data)
                    navigate('/checkout', { state: { orderno: orderno } })

                });
        }
    };

    return (
        <>

            <Container fluid className="text-dark mt-4 mb-5 ">
                {cart.length !== 0 ?
                    <Row>
                        <Col lg={8}>

                            <Card className="p-3">
                                <h2>My Orders</h2>

                                <Table bordered hover variant="light" size="sm" className="mt-3 text-dark">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th >Quantity</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart ? cart.map((value, index) => {
                                            return (
                                                <tr key={index}>

                                                    <td><b><img src={value.item.product_image} width="100px" height="80px" /></b></td>
                                                    <td><b>{value.item.product_name}</b></td>
                                                    <td><b>{value.item.product_cost}/-</b></td>
                                                    <td>
                                                        <Row>
                                                            <Col>
                                                                <Button variant="secondary" className="ml-2 mb-1" onClick={() => onRemove(index)}>-</Button>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="text" placeholder="Enter quantity" min="1" max="20" value={value.quantity} />
                                                            </Col>
                                                            <Col>
                                                                <Button variant="secondary" className="ml-2 mt-1" onClick={() => onAdd(index)}>+</Button>
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                    <td><b>
                                                        {value.quantity * value.item.product_cost}</b>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => onDelete(index)}><MdDelete /></Button>
                                                    </td>
                                                    {console.log(
                                                        total.push(
                                                            value.item.product_cost * value.quantity
                                                        )
                                                    )}
                                                </tr>
                                            );
                                        })
                                            : ""}
                                    </tbody>
                                </Table>
                            </Card>

                        </Col>

                        <Col lg={4}>
                            <Card className="p-3 text-dark" >
                                <h3>Review Order</h3>
                                <br />

                                <h5 className="text-left text-dark">
                                    SubTotal: &nbsp;
                                    <i> {total.reduce((result, number) => result + number)}/-</i>
                                </h5>

                                <hr />
                                <h5 className="text-left text-dark">GST%:  &nbsp;
                                    <i> {0.05 * (total.reduce((result, number) => result + number))}</i>
                                </h5>
                                <hr />
                                <h5 className="text-left text-dark">OrderTotal: &nbsp;
                                    <i> {(total.reduce((result, number) => result + number)) - 0.05 * (total.reduce((result, number) => result + number))}</i>
                                </h5>
                                <br />
                                <Button variant="success" onClick={() => proceedBuy()}> Proceed to Buy</Button>
                            </Card>
                        </Col>

                    </Row>
                    :
                    <div className="text-center">
                        <img src="images/cart.jpg" className="img-fluid" width="500px" /><br /><br />
                        <a className="btn btn-danger" href="/products">Continue your shopping</a>
                    </div>
                }
            </Container>

        </>
    );
}