import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ErrorModal from "../../errorModal/ErrorModal";
import Spinner from "../../spinner/Spinner";

import logo from "../../../resources/logo(black).svg"
import defaultImage from "../../../resources/default_image.png"
import minusButton from "../../../resources/button(minus).svg"
import plusButton from "../../../resources/button(plus).svg"


import './Product.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../API/axios";

function Product() {
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);
    const [productInfo, setProductInfo] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        iconUrl: null
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let minusDisabled = false;
    let plusDisabled = false;

    if (quantity <= 1) {
        minusDisabled = true;
    }
    if (quantity >= 10) {
        plusDisabled = true;
    }
    if (quantity > 1 && quantity < 10) {
        minusDisabled = false;
        plusDisabled = false;
    }

    useEffect(() => {
        axiosInstance.get(`/product/${id}`)
            .then(res => {
                setProductInfo(res.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
                setError(true);
            })
    }, [id])

    function increase() {
        setQuantity(quantity + 1)
    }

    function decrease() {
        setQuantity(quantity - 1)
    }

    // const { name, description, category, price, stock, iconUrl } = productInfo;

    function product(productInfo) {
        const { name, description, category, price, stock, iconUrl } = productInfo;
        return (
            <>
                <Row className="d-flex justify-content-between">
                    <Image rounded fluid src={iconUrl ? iconUrl : defaultImage} alt={category} style={{ width: "50%" }} />
                    <Col md={5} className="product-block">
                        <div className="product-info-block">
                            <h3 className="product-title">{name}</h3>
                            <label className='category product-category'>{category}</label>
                            <span className="product-price">{price}$</span>
                            <p className="quantity-text">Quantity:</p>
                            <div className=" d-flex align-items-center">
                                <Button
                                    style={{ backgroundColor: "transparent", border: "none", padding: 0 }}
                                    onClick={() => decrease()}
                                    className={minusDisabled ? "disabled" : null}>
                                    <img src={minusButton} alt="" />
                                </Button>
                                <span className="quantity">{quantity}</span>
                                <Button
                                    style={{ backgroundColor: "transparent", border: "none", padding: 0 }}
                                    onClick={() => increase()}
                                    className={plusDisabled ? "disabled" : null}>
                                    <img src={plusButton} alt="" />
                                </Button>
                            </div>
                        </div>
                        <div className="buy-buttons d-flex">
                            <Button variant="primary"
                                style={{
                                    marginRight: 24,
                                    paddingLeft: 77,
                                    paddingRight: 77,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                <span className="button-text">Buy</span>
                            </Button>
                            <Button variant="outline-secondary"
                                style={{
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                <span className="button-text">Add to cart</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <hr />
                        <div className="description-block">
                            <h2 className="description-title">Description</h2>
                            <p className="description-text">{description}</p>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }

    const productRender = product(productInfo);
    const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError = {setError}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? productRender : null;

    return (
        <Container>
            <Row>
                <Col md={4} sm={8} className="merch-store-logo-block d-flex align-items-center">
                    <img src={logo} alt="" width={306} />
                    <h2 className="merch-title">Store</h2>
                </Col>
            </Row>
                {errorModal}
                {spinner}
                {content}
        </Container>
    )
}

export default Product;