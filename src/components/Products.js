import React, { useState, useEffect } from 'react'
import { getProducts, getCategoriesProducts, getColorsProducts, allCategories, allColors, cartAdd } from '../config/Myservice';
import { useNavigate } from 'react-router';
//import { useHistory } from 'react-router'
import { Container, Card, Button, DropdownButton, Dropdown, Row, Col, Nav } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { BsArrowUp, BsArrowDown, BsStarFill } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function Products() {
    let email = sessionStorage.getItem('user')

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [rating, setRating] = useState('')
    const [pagenumber, setPagenumber] = useState(0);
    const [state, setState] = useState('')

    const productsPerPage = 6;
    const pageVisited = pagenumber * productsPerPage
    const pageCount = Math.ceil(products.length / productsPerPage)
    
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
    console.log(rating)
    useEffect(() => {
        getProducts()
            .then(res => {
                console.log(res.data)
                setProducts(res.data.products);
            })
        allCategories()
            .then(res => {
                console.log(res.data)
                setCategories(res.data.category)
            })
        allColors()
            .then(res => {
                console.log(res.data)
                setColors(res.data.colors)
            })

    }, [])




    const selectCategory = (id) => {
        getCategoriesProducts(id)
            .then(res => {
                setProducts(res.data.products);
                console.log(res.data.products)

            })

    }
    const selectColor = (id) => {
        getColorsProducts(id)
            .then(res => {
                setProducts(res.data.products)
                console.log(res.data.products)
            })

    }
    const getAllData = () => {
        getProducts()
            .then(res => {
                console.log(res.data)
                setProducts(res.data.products);
            })

    }


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

    const addCart = (item, id) => {
        if (localStorage.getItem('mycart') != undefined) {
            let arr = JSON.parse(localStorage.getItem('mycart'));
            console.log(arr)
            if (arr.find(x => x.id == id) != undefined) {
                let ind = arr.findIndex(x => x.id === id);
                arr[ind] = { id: id, quantity: arr[ind].quantity + 1, item: item, email: email };
                localStorage.setItem('mycart', JSON.stringify(arr));
                warning("Product quantity is increased");
            }
            else {
                arr.push({ id: id, quantity: 1, item: item, email: email });
                localStorage.setItem('mycart', JSON.stringify(arr));
                // counter()
                success("Product Added to Cart")
                setTimeout(() => {
                    window.location.reload(false)
                }, 2000);
               
            }

        }
        else {
            let arr = [];
            arr.push({ id: id, quantity: 1, item: item, email: email });
            localStorage.setItem('mycart', JSON.stringify(arr));
            // counter()
            success("Product Added to Cart")
            setTimeout(() => {
                window.location.reload(false)
            }, 2000);

        }
    }
    //  const counter=()=>{
    //     let arr = JSON.parse(localStorage.getItem('mycart'));
    //     setState(arr.length)
    //     localStorage.setItem('my',JSON.stringify(state))
    //     console.log(state)

    // }

    const sortByAsc = () => {
        const sort_products = products;
        sort_products.sort(function (a, b) {
            var nameA = a.product_cost
            var nameB = b.product_cost
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setProducts(sort_products);
        displayProducts(sort_products);
    }

    const sortByDesc = () => {
        const sort_products = products;
        sort_products.sort(function (a, b) {
            var nameA = a.product_cost
            var nameB = b.product_cost
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        setProducts(sort_products);
        displayProducts(sort_products);
    }
    const ratingChanged = () => {
        const sort_products = products;
        sort_products.sort(function (a, b) {
            var nameA = a.product_rating
            var nameB = b.product_rating
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        setProducts(sort_products);
    }

    const searchProducts = (event) => {
        setFilter(event.target.value)
    }
    let dataSearch = products.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });

    const displayProducts = dataSearch.slice(pageVisited, pageVisited + productsPerPage).map((item) =>
        <Col lg={4} md={6} sm={6} key={item._id}>
            <Card className='p-1 m-2 mb-4 mr-11' style={{ width: '18rem', textAlign: "center" }}>

                <Card.Img variant='top' src={item.product_image} onClick={() => singleitem(item._id)} width={200} height={200} />
                <Card.Body>
                    <Card.Title className="text-primary">{item.product_name}</Card.Title>
                    <Card.Text><b>Rs.{item.product_cost}</b></Card.Text>
                    <div className='d-flex justify-content-center'>

                        <Button variant='danger' className="mb-2" onClick={() => addCart(item, item._id)}>Add to Cart</Button>

                    </div>
                    <div className='d-flex justify-content-center'>
                        <ReactStars
                            count={5}
                            onChange={(e) => { setRating(e.target.value) }}
                            size={18}
                            activeColor="#ffd700"
                            className="card1 "
                            edit={true}
                            isHalf={true}
                            value={item.product_rating}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>

    )


    const changePage = ({ selected }) => {
        setPagenumber(selected)
    };


    return (
        <>
            <Container fluid className="bg-light d-flex justify-content-center"  >
                <Container className="pt-5">

                    <Row >
                        <Col lg={2} className="pt-2" >
                            <Button variant="outline-secondary" size="lg" onClick={getAllData}> All Products</Button>
                            <DropdownButton variant="outline-dark" title="Categories" className="mt-3" id="input-group-dropdown-1" size="lg">
                                {categories.map(catitem =>
                                    <Dropdown.Item key={catitem._id} onClick={() => selectCategory(catitem._id)}>{catitem.category_name}</Dropdown.Item>
                                )}
                            </DropdownButton>

                            <DropdownButton variant="outline-dark" title="Colors" className="mt-3 " id="input-group-dropdown-1" size="lg">
                                {colors.map(coloritem =>
                                    <Dropdown.Item key={coloritem._id} onClick={() => selectColor(coloritem._id)}>{coloritem.color_name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Col>


                        <Col lg={10}>
                            <div className="d-flex flex-row justify-content-end">
                                <h4 className="text-dark pr-3">Sort By:</h4>
                                <a href="#" onClick={ratingChanged} className="pr-4"><h4><BsStarFill /></h4></a>
                                <a href="#" onClick={sortByAsc} className="pr-4"><h4><BiRupee /><BsArrowUp /></h4></a>
                                <a href="#" onClick={sortByDesc} className="pr-4"><h4><BiRupee /><BsArrowDown /></h4></a>
                            </div>

                            <div className="container m-2 pt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Proucts Here"
                                    value={filter}
                                    onChange={searchProducts.bind(this)}
                                />

                            </div>
                            <Container className='mt-4'>
                                <Row >

                                    {displayProducts}

                                    <ReactPaginate
                                        previousLabel={"Prev"}
                                        nextLabel={"Next"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disbaledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />


                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

            </Container>
        </>
    )
}
