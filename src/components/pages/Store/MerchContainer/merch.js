import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MerchCard from './MerchCard';
import minusButton from "../../../../resources/BM.svg"
import plusButton from "../../../../resources/BP.svg"
import Button from 'react-bootstrap/Button';


import { useState } from "react";

import './merch.css'


function Merch() {

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

            <Container className="merch-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10} className="merch-col text-center">
                        <h3>BUY MERCH = SUPPORT US</h3>

                    
                        <MerchCard/>
                        <MerchCard/>
                        <MerchCard/>

                        
                        <MerchCard/>
                        <MerchCard/>
                        <MerchCard/>

                        


                    </Col>
                </Row>
                
                <div className="quantity-block d-flex align-items-center">
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
            </Container>

            
        )

        

}



export default Merch;