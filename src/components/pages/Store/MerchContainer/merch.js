import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MerchCard from './MerchCard';
import minusButton from "../../../../resources/BM.svg"
import plusButton from "../../../../resources/BP.svg"
import Button from 'react-bootstrap/Button';
import {axiosInstance} from '../../../../API/axios'


import { useState, useEffect } from "react";

import './merch.css'
import ErrorModal from "../../../errorModal/ErrorModal";
import Spinner from "../../../spinner/Spinner";


function Merch() {

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetchData();
        const {items} = renderList(productList);
        console.log('product items: ', items);

    }, []);
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

    function fetchData() {
        axiosInstance.get("/product/getAllProducts")
        .then((data) => {
            setProductList(data.data);
            setLoading(false)
        })
        .catch((error) => {
            setErrorMessage(error.message)
            setError(true);
        }) 
      }

    function renderList(arr) {
        const items = arr.map(product => {
            const {name, category, id, description, productImageUrls, price, stock } = product
            return (
                <MerchCard 
                    name = {name} 
                    category = {category} 
                    id = {id.value}
                    key = {id.value} 
                    description={description} 
                    productImageUrls = {productImageUrls}
                    price = {price}
                    stock = {stock}
                />
            )
        })
        return {items}
    }

    const {items} = renderList(productList);
    const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError = {setError}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;


        return(
            <Container className="merch-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10} className="merch-col text-center">
                        <h3 className="merch-page-title">BUY MERCH = SUPPORT US</h3>
                        <ul className="merchCard-container">
                            {errorModal}
                            {spinner}
                            {content}
                        </ul>
                        <div className="quantity-block d-flex align-items-center mb-5">
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
                    </Col>
                </Row>
                
                
            </Container>

            
        )

        

}



export default Merch;