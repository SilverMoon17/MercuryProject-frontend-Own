import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ErrorModal from "../../errorModal/ErrorModal";
import Spinner from "../../spinner/Spinner";
import SuccessModal from "../../successModal/SuccessModal";
import logo from "../../../resources/logo(black).svg"
import defaultImage from "../../../resources/default_image.png"
import Carousel from 'react-bootstrap/Carousel';
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
        productImageUrls: []
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [index, setIndex] = useState(0);


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

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        axiosInstance.get(`/product/${id}`)
            .then(res => {
                console.log(res.data);
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

    const addProductInCart = () => {
        const data = {
            "productId": id,
            "quantity": quantity
        }
        axiosInstance.post(`/cartItem`, data)
            .then(() => {
                setShowModal(true)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
                setError(true);
            })
    }

    const renderImages = (arr, name) => {
        const images = arr.map(imageUrl => {
            return (
                <Carousel.Item key={imageUrl + name}>
                    <Image
                        className="d-block w-100 slide-img"
                        src={require('../../../resources/' + imageUrl)}
                        alt="Second slide"
                        rounded
                    />
                </Carousel.Item>
            )
        })
        return { images }
    }

    // const { name, description, category, price, stock, iconUrl } = productInfo;

    function product(productInfo) {
        const { name, description, category, price, stock, productImageUrls } = productInfo;
        const { images } = productImageUrls.length ? renderImages(productImageUrls, name) : ""
        return (
            <>
                <Row className="d-flex justify-content-between">
                    {/* <Image rounded fluid src={productImageUrls.length ? require('../../../resources/productImages/' + name + "/" + productImageUrls[0]) : defaultImage} alt={category} style={{ width: "50%" }} /> */}
                    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark' className='mt-5' style={{ width: "50%" }}>
                        {images ? images : <Carousel.Item>
                            <Image
                                className="d-block w-100 slide-img"
                                src={defaultImage}
                                alt="Second slide"
                                rounded
                            />
                        </Carousel.Item>}
                    </Carousel>
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
                            <Button variant="outline-secondary" onClick={addProductInCart}
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
    const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError={setError} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? productRender : null;

    return (
        <Container>
            <Row>
                <Col md={4} sm={8} className="merch-store-logo-block d-flex align-items-center">
                    <img src={logo} alt="" width={306} />
                    <h2 className="merch-title">Store</h2>
                </Col>
            </Row>
            <SuccessModal showModal={showModal} setShowModal={setShowModal} message="Product successfully added in cart!" />
            {errorModal}
            {spinner}
            {content}
        </Container>
    )
}

export default Product;