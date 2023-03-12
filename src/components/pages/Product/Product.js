import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from "../../../resources/logo(black).svg"
import productImage from "../../../resources/backpack.png"
import minusButton from "../../../resources/button(minus).svg"
import plusButton from "../../../resources/button(plus).svg"


import './Product.css';
import { useState } from "react";

function Product() {

    const [quantity, setQuantity] = useState(1);
    let minusDisabled = false;
    let plusDisabled = false;

    if(quantity <=1) {
        minusDisabled = true;
    }
    if(quantity >= 10) {
        plusDisabled = true;
    }
    if(quantity > 1 && quantity < 10) {
        minusDisabled = false;
        plusDisabled = false;
    }

    function increase(){
        setQuantity(quantity+1)
    }

    function decrease(){
        setQuantity(quantity-1)
    }

    return(
        <Container>
            <Row>
                <Col md={4} sm={8} className="merch-store-logo-block d-flex align-items-center">
                    <img src={logo} alt="" width={306}/>
                    <h2 className="merch-title">Store</h2>
                </Col>
            </Row>
            <Row>
                <Col md={10} sm={12} className="product-block d-flex">
                    <Image rounded fluid src={productImage} alt="backpack"/>
                    <div className="product-info-block d-block col-md-8 col-sm-8">
                        <h3 className="product-title">Engineer Backpack</h3>
                        <span className="product-price">34.99$</span>
                        <p className="quantity-text">Quantity:</p>
                        <div className=" d-flex align-items-center">
                            <Button 
                            style={{backgroundColor: "transparent", border: "none", padding:0}}
                            onClick={() => decrease()}
                            className={minusDisabled ? "disabled" : null}>
                                <img src={minusButton} alt=""/>
                            </Button>
                            <span className="quantity">{quantity}</span>
                            <Button 
                            style={{backgroundColor: "transparent", border: "none", padding:0}}
                            onClick={() => increase()}
                            className={plusDisabled ? "disabled" : null}>
                                <img src={plusButton} alt=""/>
                            </Button>
                        </div>
                        <div className="buy-buttons d-flex">
                            <Button variant="primary" 
                            style={{marginRight: 24,
                                    paddingLeft: 77,
                                    paddingRight: 77,
                                    paddingTop: 10,
                                    paddingBottom: 10}}>
                                <span className="button-text">Buy</span>
                            </Button>
                            <Button variant="outline-secondary"
                            style={{    
                                paddingLeft: 77,
                                paddingRight: 77,
                                paddingTop: 10,
                                paddingBottom: 10}}>
                                <span className="button-text">Add to cart</span>
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={12}>
                    <hr />
                    <div className="description-block">
                        <h2 className="description-title">Description</h2>
                        <p className="description-text">Lorem ipsum dolor sit amet consectetur. Ac pretium diam a nunc leo turpis tellus. 
                        Vulputate integer euismod condimentum facilisi at aliquam. Purus ut arcu sed volutpat praesent accumsan molestie 
                        leo sociis. A sit sed elit posuere felis tincidunt. Lectus proin neque scelerisque purus in proin risus. In.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Product;