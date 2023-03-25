import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';

export default function ErrorModal({message, error, setError}) {
  const handleClose = () => setError(false);

  return (
    <>
      <Modal show={error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body><Alert variant="danger">{message}</Alert></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}