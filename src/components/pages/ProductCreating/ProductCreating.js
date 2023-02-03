import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import {useMemo} from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import './ProductCreating.css';
import defaultImage from '../../../resources/default_image.png';
import logo from "../../../resources/logo(black).svg";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
  
export default function ProductCreating(props) {
    const [files, setFiles] = useState([]);
    const {
        getRootProps, 
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png']
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);
  
    const removeFile = (file) => () => {
      const newFiles = [...files];
      newFiles.splice(newFiles.indexOf(file), 1);
      setFiles(newFiles);
    };

    const thumbs = files.slice(0,8).map((file) => (
      <div className="thumb" key={file.name}>
        <div className='thumb-inner'>
          <img src={file.preview} className="img" alt={file.name} />
        </div>
        <CloseButton onClick={removeFile(file)} style={{outline:'none'}}/>
      </div>
    ));
    
  
    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      },
      []
    );
  
    return (
    <Container>
        <Row>
            <Col md={12}>
                <img src={logo} alt="logo" className='logo-product-creating' width={306}/>
                <div className="product-creating-block d-flex justify-content-between">
                    <div className="product-image-upload">
                        <Image fluid rounded width={400} src={files[0] ? files[0].preview : defaultImage } alt={files[0] ? files[0].name : 'defaultImage'} className="main-img"/> 
                        <aside className="thumbs-container">{thumbs}</aside>
                        <Form.Label>Upload your images</Form.Label>
                        <div {...getRootProps({style})}>
                            <p className="">Drag 'n' drop zone</p>
                        </div>
                    </div>
                    <div className="product-info-inputs d-block">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <Form.Control
                            placeholder="Product title"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                            <InputGroup>
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="Description" />
                        </InputGroup>
                        <Row>
                            <div className="product-creating-inputs d-flex mt-3">
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" style={{minWidth: '10%', marginRight: '20px'}}/>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Stock</InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" style={{minWidth: '10%', marginRight: '20px'}}/>
                                </InputGroup>
                                <Form.Group as={Col} controlId="category" onChange={(e) => {(console.log(e.target.value))}} style={{minWidth: '50%'}}>
                                    <Form.Select>
                                        <option>Choose category</option>
                                        <option>T-Shirt</option>
                                        <option>Mug</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Row>
                        <Button className="create-button">Create</Button>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
    );
  }