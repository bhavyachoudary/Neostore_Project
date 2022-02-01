import React, { useState, useEffect } from 'react'
import { getProducts } from '../config/Myservice';
import ReactStars from "react-rating-stars-component";
import { Container, Card, Button, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function Dashboard() {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then(res => {
                console.log(res.data)
                setProducts(res.data.products);

            })
    }, [])

    const navigate = useNavigate();

    const singleitem = (id) => {
        console.log(id)
        navigate(
            '/productdetails',
            {
                state: { id: id }
            }
        )
    }

    return (
        <>

            <Carousel>
                <Carousel.Item interval={1000} >
                    <img
                        className="d-block w-100"
                        style={{ height: "400px", width: "100%" }}
                        src="images/fur.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        style={{ height: "400px", width: "100%" }}
                        src="images/fur4.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="images/fur5.jpg"
                        style={{ height: "400px", width: "100%" }}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Container className="mt-3">
                <h2 className="text-center pt-3">Popular Products</h2>
                <Row>

                    {products.map(item =>
                        <Col lg={4} md={6} sm={6} key={item._id}>
                            <Card className='p-1 m-2 mb-4 mr-11 ml-3 ' style={{ width: '18rem', textAlign: "center" }}>
                                <Card.Img variant="top" src={item.product_image} onClick={() => singleitem(item._id)} width="200" height="200" />
                                <Card.Body>
                                    <Card.Title className="text-info">{item.product_name}</Card.Title>
                                    <Card.Text>
                                        <b>Rs.{item.product_cost}</b>
                                    </Card.Text>
                                    <Container className="d-flex justify-content-center">
                                        <Button variant="danger" className="btn btn-danger mb-2">Add to cart</Button><br />

                                    </Container>
                                    <Container className="d-flex justify-content-center">
                                        <ReactStars
                                            count={5}

                                            size={18}
                                            activeColor="#ffd700"
                                            className="card1 "
                                            edit={true}
                                            isHalf={true}
                                            value={item.product_rating}
                                        />
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>


        </>
    )
}
