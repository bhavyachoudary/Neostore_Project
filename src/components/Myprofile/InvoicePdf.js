import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { getpdf, sendMail } from '../../config/Myservice';
import { useLocation } from "react-router";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
                setDatas(res.data.pdf)

            });
    }, []);


    console.log(datas)
    //console.log(datas.items)
    const sendmail = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "/images/2.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            console.log("calling");

            sendMail(formData).then((res) => {
                console.log(res);
                console.log("in response");
            });
            console.log("call finished");
        });
    };

    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "/images/2.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };
    return (
        <div>

            <Container>
                <div className="text-center mt-3">

                    <Button variant="success" onClick={() => generatePdf()}>
                        Click To PDF
                    </Button>
                    &nbsp;
                    <Button variant="primary" onClick={() => sendmail()}>
                        Send To Email
                    </Button>
                </div>
            </Container>
            <br />
            <Container
                style={{
                    border: "1px solid black",
                    width: "700px",
                }}
                ref={ref}
                id="divToPrint"
            >
                <div style={{ backgroundColor: "lightpink" }}>
                    <Row>
                        <Col md={9}>

                            <Image
                                src="/images/neo.jpg"
                                width="100px"
                                height="100px"
                            />

                        </Col>
                        <Col md={3}>
                            <h2>Neostore</h2>
                            <h6>{}</h6>

                        </Col>
                    </Row>
                </div>
                <div>

                    <Row className="pt-3 mb-3">
                        <Col md={9} >
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
                                                    {value.selectaddr.state} ,
                                                    {value.selectaddr.country}
                                                </p>
                                            </span>
                                        </>
                                    );
                                })}
                            </p>
                        </Col>
                        <Col md={3}>
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
                                                    color: "red",
                                                }}
                                            >
                                                {/* {value.status} */}
                                                paid
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
                                                {value.date}
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
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {/* {value.dueDate} */}
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

                <Col lg={12}>

                    <Container>
                        {datas.map((value, index) => {
                            return (
                                <p key={index} >
                                    {/* <p><span className='text-danger'>DATE</span>:{value.date}</p> */}
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

                                                {datas[index].items.map((val, index) => {
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
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms:</span>
                    <br />
                    Please pay the amount within 30 days.
                </div>
                <br />
            </Container>
        </div>
    )
}