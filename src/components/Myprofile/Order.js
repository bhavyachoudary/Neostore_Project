import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel, Card } from 'react-bootstrap'
import { getOrderdata } from '../../config/Myservice';
import MyAccount from './MyAccount';
import { useNavigate } from 'react-router';

export default function Order() {
    let [temp, settemp] = useState([]);
    let [items, setitems] = useState([])

    useEffect(() => {
        getOrderdata(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data1 = res.data.user;
                    settemp(data1);
                    console.log(data1)

                }
                else {
                    console.log(res.data.err)
                }
            })
    }, [])
    console.log(temp)

    const navigate = useNavigate();

    const singleitem = (id) => {
        console.log(id)

        navigate('/invoicepdf', { state: { id: id } })

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
                        <Card style={{ width: "550px" }} className="pl-4 mb-2">
                            <section >

                                <Row className="pt-1">
                                    <h4>All Orders</h4>


                                </Row>
                                < hr className="mr-3" />
                            </section>


                            <section >
                                {temp.map((value, index) => {
                                    return (
                                        <p key={index} >
                                            <Card style={{ width: "500px", height: "250px" }} className="mt-1 p-2 mb-1" >
                                                <h5><span className='text-success'>Order No:</span> {value.Orderno}</h5>
                                                <p><span className='text-danger'>DATE&nbsp;</span>:&nbsp;<b>{value.date.substring(0, 10)}</b></p>
                                                <div className='row'>

                                                    {temp[index].items.map((val) => {

                                                        return (
                                                            <div className='row  col-4 ' >
                                                                <div className='pl-4 '>
                                                                    <img src={val.product_image} height="120px" width="120px" />
                                                                </div>

                                                            </div>
                                                        );
                                                    })
                                                    }
                                                </div>
                                                <div className="mt-1">

                                                    <button className='btn btn-danger' onClick={() => singleitem(value._id)}>INVOICE PDF</button>

                                                </div>
                                            </Card>
                                        </p>
                                    );
                                })
                                }
                            </section>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
