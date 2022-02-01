import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table,Card} from "react-bootstrap";
import { getpdf, sendMail } from '../../config/Myservice';
import { useLocation } from "react-router";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { BsArrowDown } from "react-icons/bs";

const ref = React.createRef();

export default function Invoicepdf() {
    const [items, setItems] = useState([]);
    const [datas, setDatas] = useState([]);
    const { state } = useLocation();
   
    useEffect(() => {
        console.log(state.id);
        getpdf(state.id)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.pdf);
                console.log(res.data.pdf);
                console.log(res.data.pdf.Orderno);
                setDatas(res.data.pdf)

            });
    }, []);


    console.log(datas)
    console.log(datas.Orderno)

    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            console.log(pdf)
            const img = canvas.toDataURL();
            console.log(img)
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("Neostore.pdf");
        });
    };
    return (
        <div>
            <Container fluid className="w-100 d-flex justify-content-center ">
                <div className="text-center mt-3">
                
                    <Button variant="success" onClick={() => generatePdf()}>Click To PDF<span><BsArrowDown /></span></Button>
                    &nbsp;

                </div>
            </Container>
            <br />
            <Card
                style={{
                    padding:"30px",
                    backgroundColor: "white",
                    maxWidth: "800px",
                    borderStyle: "10px solid black",
                    margin: "10px auto",
                    height: "auto"
                   
                }}
                className="mb-5"
                ref={ref}
                id="divToPrint"
            >
                <div>
                    <Row>
                        <Col md={8} >
                        <h2 className='display-6 mt-2' style={{ color: 'dark' }}>Neo<span style={{ color: 'red' }}>STORE</span></h2>
                            {/* <Image
                                src="/images/neos.jpg"
                                width="200px"
                                height="100px"
                                className="p-2"
                            /> */}

                        </Col>
                        <Col md={4} className='display-6 mt-2' >
                      
                            {datas.map((value) => {
                                return (
                                    <h4 className="text-dark"><span >OrderNo:&nbsp;</span>{value.Orderno}</h4>

                                )
                            }
                            )}

                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>

                    <Row className="pt-3 mb-3">
                        <Col md={10} >
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    FROM To
                                </span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                    Doyle, Kuhlman and Zboncak
                                </span>
                                <br />
                                edibbert@johnston.com
                                <br />
                                8884569076
                            </p>
                            <br />
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    BILL TO
                                </span>
                                <br />
                                {datas.map((value, index) => {
                                    return (
                                        <>
                                            <span
                                                style={{ fontWeight: "bold" }}>
                                                {value.email}

                                                <p>{value.selectaddr.address},
                                                    {value.selectaddr.pincode}<br />
                                                    {value.selectaddr.state} 
                                                    {value.selectaddr.country}
                                                </p>
                                            </span>
                                        </>
                                    );
                                })}
                            </p>
                        </Col>

                        <Col md={2}>
                            {datas.map((value, index) => {
                                return (
                                    <div>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                STATUS
                                            </span>
                                            <br />
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "green",
                                                }}
                                            >
                                                {/* {value.status} */}
                                                Paid
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                DATE
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.date.substring(0, 10)}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                DUE DATE
                                            </span>
                                            <br/>
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                             2022-02-10
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                AMOUNT
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                &#8377; {value.total}
                                            </span>
                                            <br />
                                        </p>
                                    </div>
                                );
                            })}
                        </Col>
                    </Row>
                </div>

                     {datas.map((value, index) => {
                            return (
                                <p key={index} >
                                    {/* <p><span className='text-danger'>DATE</span>:{value.date}</p> */}
                                    <div>
                                        <Table  bordered hover size="sm" brd>
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

                                                {datas[index].items.map((val, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><img src={val.product_image} height="90px" width="120px" /></td>
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
                
                
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms:</span>
                    <br />
                    Please pay the amount within 30 days.
                </div>
                <br />
            </Card>
        </div>
    )
}