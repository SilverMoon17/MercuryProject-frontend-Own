import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMemo } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { axiosInstance } from '../../../API/axios';

import './ProductCreating.css';
import defaultImage from '../../../resources/default_image.png';
import logo from "../../../resources/logo(black).svg";
import ErrorModal from '../../errorModal/ErrorModal';
import SuccessModal from '../../successModal/SuccessModal';

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
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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

	const thumbs = files.slice(0, 8).map((file) => (
		<div className="thumb" key={file.name}>
			<div className='thumb-inner'>
				<img src={file.preview} className="img" alt={file.name} />
			</div>
			<CloseButton onClick={removeFile(file)} style={{ outline: 'none' }} />
		</div>
	));


	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[]
	);

	const productCreatingSchema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		iconUrl: yup.string(),
		price: yup.number().typeError("You must specify a number").min(0.01, "Must be greater then 0.01").required("Price field is required"),
		stockLevel: yup.number().typeError("You must specify a number").integer("Stock level must be integer").min(1, "Must be greater then 0").required("Stock level is required"),
		category: yup.string().notOneOf(['Choose category'], 'You must choose category')
	});

	const onSubmit = async (values) => {
		let data = {
			"name": values.title,
			"description": values.description,
			"price": values.price,
			"stock": values.stockLevel,
			"category": values.category,
			"iconUrl": values.iconUrl
		}
		await axiosInstance.post('/product', data)
			.then(() => {
				setError(false);
				setShowModal(true);	
			})
			.catch((error) => {
				console.log(error);
				setErrorMessage(error.response.data.title ? error.response.data.title : error.message);
				setError(true)
			});
	}

	return (
		<Container>
			<Row>
				<Col md={12}>
					{error && <ErrorModal message={errorMessage} error = {error} setError = {setError}/>}
					<SuccessModal showModal = {showModal} setShowModal = {setShowModal}/>
					<img src={logo} alt="logo" className='logo-product-creating' width={306} />
					<div className="product-creating-block d-flex justify-content-between">
						<div className="product-image-upload">
							<Image fluid rounded width={400} src={files[0] ? files[0].preview : defaultImage} alt={files[0] ? files[0].name : 'defaultImage'} className="main-img" />
							<aside className="thumbs-container">{thumbs}</aside>
							<Form.Label style={{'color': 'red'}}>Temporarily unavailable</Form.Label>
							<br />
							<Form.Label>Upload your images</Form.Label>

							{/* <div {...getRootProps({ style })}> */}
							<div >
								<p className="">Drag 'n' drop zone</p>
							</div>
						</div>
						<Formik
							validationSchema={productCreatingSchema}
							onSubmit={(values) => {onSubmit(values, files);}}
							initialValues={{
								title: '',
								description: '',
								iconUrl: '',
								price: 0,
								stockLevel: 0,
								category: 'Choose category',
							}}
						>
							{({
								handleSubmit,
								handleChange,
								handleBlur,
								values,
								touched,
								isValid,
								errors,
							}) => (
								<Form className="product-info-inputs d-block" onSubmit={handleSubmit}>
									<InputGroup className="mb-3">
										<InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
										<Form.Control
											placeholder="Product title"
											aria-label="Product title"
											aria-describedby="basic-addon1"
											name="title"
											value={values.title}
											onChange={handleChange}
											isValid={touched.title && !errors.title}
											isInvalid={!!errors.title}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.title}
										</Form.Control.Feedback>
									</InputGroup>
									<InputGroup>
										<InputGroup.Text>Description</InputGroup.Text>
										<Form.Control as="textarea" aria-label="Description" name="description"
											value={values.description}
											onChange={handleChange}
											isValid={touched.description && !errors.description}
											isInvalid={!!errors.description}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.description}
										</Form.Control.Feedback>
									</InputGroup>
									<InputGroup className="mt-3">
										<InputGroup.Text id="basic-addon1">iconUrl</InputGroup.Text>
										<Form.Control
											placeholder="Product iconUrl"
											aria-label="Product iconUrl"
											aria-describedby="basic-addon1"
											name="iconUrl"
											value={values.iconUrl}
											onChange={handleChange}
											isValid={touched.iconUrl && !errors.iconUrl}
											isInvalid={!!errors.iconUrl}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.iconUrl}
										</Form.Control.Feedback>
									</InputGroup>
									<Row>
										<div className="product-creating-inputs d-flex align-items-flex-start mt-3">
											<InputGroup>
												<InputGroup.Text>$</InputGroup.Text>
												<Form.Control aria-label="Amount (to the nearest dollar)" style={{ minWidth: '10%', marginRight: '20px' }}
													name="price"
													value={values.price}
													onChange={handleChange}
													isValid={touched.price && !errors.price}
													isInvalid={!!errors.price}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.price}
												</Form.Control.Feedback>
											</InputGroup>
											<InputGroup>
												<InputGroup.Text>Stock</InputGroup.Text>
												<Form.Control aria-label="Amount (to the nearest dollar)" style={{ minWidth: '10%', marginRight: '20px' }} name="stockLevel"
													value={values.stockLevel}
													onChange={handleChange}
													isValid={touched.stockLevel && !errors.stockLevel}
													isInvalid={!!errors.stockLevel}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.stockLevel}
												</Form.Control.Feedback>
											</InputGroup>
											<Form.Group as={Col} controlId="category" style={{ minWidth: '40%' }}>
												<Form.Select
													name="category"
													value={values.category}
													onChange={handleChange}
													isValid={touched.category && !errors.category}
													isInvalid={!!errors.category}
												>
													<option>Choose category</option>
													<option>T-Shirt</option>
													<option>Mug</option>
													<option>Backpack</option>
													<option>Hoodie</option>
													<option>Other</option>
												</Form.Select>
												<Form.Control.Feedback type="invalid">
													{errors.category}
												</Form.Control.Feedback>
											</Form.Group>
										</div>
									</Row>
									<button className="create-button" type='submit'>Create</button>
								</Form>
							)}
						</Formik>
					</div>
				</Col>
			</Row>
		</Container>
	);
}