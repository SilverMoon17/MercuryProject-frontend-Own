import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

import './MerchCard.css'
import defaultImage from '../../../../resources/default_image.png';

function MerchCard({name,description, iconUrl, price}) {

    const [validDescription, setValidDescription] = useState(description);

    useEffect(() => {
        if(description.length > 100) {
            setValidDescription(description.slice(0, 100) + '...');
        }
    }, [description])
    return(
        <a href="/Product" className='card-link'>
                <Card className='text-align-center'>
                    <div className="Bord" style={{ width: '19rem', height: '37rem' }}>

                        <Card.Img src={iconUrl ? iconUrl : defaultImage} />


                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                                {validDescription}
                            </Card.Text>
                            <Button variant="primary" className="card-button">{price}$</Button>
                        </Card.Body>
                    </div>
                </Card>
        </a>
    )
}

export default MerchCard; 

