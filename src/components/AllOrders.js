import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { getOrderdata } from '../config/Myservice'



export default function AllOrders() {
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

    return (
        <>

            <Container className="pt-3 pb-3">
                <Row>
                    <Col lg={10}>

                        <Container>
                            {temp.map((value, index) => {
                                return (
                                    <p key={index} >
                                        <p><span className='text-danger'>DATE&nbsp;</span>:<b>&nbsp;{value.date.substring(0, 10)}</b></p>
                                        <div>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {temp[index].items.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td> <img src={val.product_image} height="90px" width="120px" /></td>
                                                                <td>{val.product_name}</td>
                                                                <td>{val.quantity}</td>
                                                                <td> {val.product_cost}</td>

                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>


                                    </p>
                                );
                            })
                            }
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
