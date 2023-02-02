import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../../../../resources/logo(black).svg'
import image_1 from '../../../../resources/image1.png'
import './Info.css'


function Info() {
        return(
            <Container className="info-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10} className="info-col text-center">
                        <img src={logo} alt="logo" className="info-logo" width="260" height="55" />
                        <p className="info-text">Lorem ipsum dolor sit amet consectetur. Lacus leo nulla eget eget tortor massa vel ultricies. 
                        A mollis metus egestas faucibus sed molestie ut. 
                        Dignissim tellus purus sed elit egestas eget ornare fermentum. In lorem consequat arcu vitae. Maecenas.</p>
                        <img src={image_1} alt="City of future" className="info-img" />
                        <p className="info-text" style={{marginBottom: '130px'}}>Lorem ipsum dolor sit amet consectetur. Proin maecenas volutpat adipiscing commodo vitae nulla quis a. 
                        Ac viverra non pulvinar eget nec. Viverra sagittis integer elementum imperdiet vitae nisl dolor. Tellus arcu maecenas mauris pretium 
                        facilisis et elementum commodo sed.
                        Non neque euismod aliquet cras. Ornare vel enim tellus diam dictum congue nunc ut sed. Sem enim velit adipiscing fermentum eu mollis tellus vel ultrices. 
                        Tincidunt magna aliquet cursus ut condimentum augue bibendum. Lectus pellentesque adipiscing dui tempor et. Vel ultrices mauris lorem egestas maecenas. 
                        Auctor quis enim congue nunc sed amet. Turpis nulla mauris sed velit felis eu leo lacinia diam. Bibendum libero amet blandit sem maecenas ut cras. Rhoncus sed viverra pretium metus sed. 
                        Volutpat in et odio tristique at elit amet commodo ut.
                        Et sem enim consectetur nisl gravida volutpat fermentum vitae. Donec.</p>
                    </Col>
                </Row>
            </Container>
        )
}

export default Info;