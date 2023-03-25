import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';

export default function SuccessModal({showModal, setShowModal}) {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body><Alert variant="success">Product added successfully</Alert></Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}