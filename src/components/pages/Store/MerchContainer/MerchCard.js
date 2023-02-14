import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './MerchCard.css'
import cardImage1 from '../../../../resources/backpack.png'

function MerchCard() {
        return(
           <div class="CardTop">
                        <Card style={{ width: '15rem', height: '30rem'}}>
                            <div class="Bord">
                            <a href="/Product">
                                <Card.Img src={cardImage1}/>
                            </a>

                            <Card.Body>
                                <Card.Title>Engineer Backpack</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur.
                                </Card.Text>
                                <Button variant="primary" className="card-button">34.99$</Button>
                            </Card.Body>
                            </div>
                        </Card>
             </div>
        )
}

export default MerchCard; 

