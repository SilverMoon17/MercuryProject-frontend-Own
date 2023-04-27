import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../../modules/cart/cart.css';
import Image from 'react-bootstrap/Image';
import myImage from '../../../resources/avatar.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cart.css';
import logo from "../../../resources/logo(black).svg";
import { axiosInstance } from '../../../API/axios';
import Spinner from '../../spinner/Spinner';
import ErrorModal from '../../errorModal/ErrorModal';
import { Modal } from 'react-bootstrap';


function ConfirmationModal({ show, setShow, id }) {


  const handleClose = () => setShow(false);

  const handleOnDelete = async (id) => {
      console.log(id);
      await axiosInstance.delete(`/cartItem/${id}`)
      .then(() => {
          setShow(false);
          window.location.reload();
      })
      .catch((error) => {
          console.log(error);
      }) 
  }

  return (
      <>
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
          >
              <Modal.Header closeButton>
                  <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  Click Ok if you really want to remove this product
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                      Close
                  </Button>
                  <Button variant="success" onClick={() => { handleOnDelete(id) }}>Ok</Button>
              </Modal.Footer>
          </Modal>
      </>
  );
}

export default function Cart() {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    getCartItems();
  }, []);

  // const handleQuantityChange = (itemId, newQuantity) => {
  //   setShoppingCartItems(prevItems =>
  //     prevItems.map(item => {
  //       if (item.id === itemId) {
  //         return { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const handleIncrement = (itemId) => {
  //   setShoppingCartItems(prevItems =>
  //     prevItems.map(item => {
  //       if (item.id === itemId) {
  //         return { ...item, quantity: item.quantity + 1 };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const handleDecrement = (itemId) => {
  //   setShoppingCartItems(prevItems =>
  //     prevItems.map(item => {
  //       if (item.id === itemId && item.quantity > 1) {
  //         return { ...item, quantity: item.quantity - 1 };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const calculateTotal = () => {
  //   return shoppingCartItems.reduce((total, item) => {
  //     return total + item.price * item.quantity;
  //   }, 0);
  // };

  const getCartItems = () => {
    axiosInstance.get("/shoppingCart/active")
      .then((data) => {
        setTotal(data.data.total);
        setShoppingCartItems(data.data.cartItems);
        setLoading(false)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setError(true);
      })
  }

  const handleClickOnDeleteIcon = (id) => {
    setShowModal(true)
    setItemId(id)
  }

  function renderList(arr) {
    const items = arr.map(cartItem => {
      const {cartItemId, quantity, product} = cartItem
      const {name, iconUrl, price} = product
      let {description} = product
      console.log(cartItemId);
      if (description.length > 225) {
        description = description.slice(0, 225) + '...';
      }
      return (
        <>
        <div key={cartItemId} className="cart-item">
        <span className="delete-icon" onClick={() => handleClickOnDeleteIcon(cartItemId)}></span>
          <Row>
            <Col md={3}>
              <Image src={iconUrl} thumbnail />
            </Col>
            <Col md={6}>
              <h3>{name}</h3>
              <div className="item-description">
                {description}
              </div>
              <p>Price: ${price}</p>
              <span className="quantity-block1">Quantity:{quantity}</span>
            </Col>
            <Col md={3}>
              <h3>Total: ${price * quantity}</h3>
            </Col>
          </Row>
        </div>
        </>
      )
    })
    return { items }
  }

  const { items } = renderList(shoppingCartItems);
  const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError={setError} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <Container style={{ backgroundColor: 'white' }}>
      {showModal ? <ConfirmationModal show={showModal} setShow={setShowModal} id={itemId} /> : null}
      <Row>
        <Col md={4} sm={8} className="ideas-logo-block d-flex align-items-center">
          <img src={logo} alt="" width={306} />
          <h2 className="merch-title">Cart</h2>
        </Col>
      </Row>
      {errorModal}
      {spinner}
      {content}
      <hr />
      <h3>Total: ${total}</h3>
    </Container>
  );
};
