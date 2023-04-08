import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMemo } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import { axiosInstance } from '../../../API/axios';

import './IdeaCreating.css';
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


export default function IdeaCreating(props) {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	function handleImageChange(index, e, arrayHelpers) {
		const newImages = [...arrayHelpers.form.values.images];
		newImages[index].url = e.target.value;
		arrayHelpers.form.setFieldValue(`images.${index}.url`, e.target.value);
	}
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


	const createIdea = async (values) => {
		let imageUrls = values.images.map(({ url }) => url)
		let data = {
			"title": values.title,
			"description": values.description,
			"goal": values.goal,
			"category": values.category,
			"iconUrls": imageUrls
		}
		axiosInstance.post("/idea", data)
			.then((response) => {
				setError(false);
				setShowModal(true);
			})
			.catch((error) => {
				// console.log(error);
				setErrorMessage(error.response.data.title ? error.response.data.title : error.message);
				setError(true)
			})
	}

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[]
	);

	const ideaCreatingSchema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		goal: yup.number().moreThan(1000).required(),
		category: yup.string().notOneOf(['Choose category'], 'You must choose category'),
		images: yup.array().of(
			yup.object().shape({
				url: yup.string().url('Please enter a valid URL').required('Please enter an image URL'),
			})
		)
	});

	return (
		<Container>
			<Row>
				<Col md={12}>
					{error && <ErrorModal message={errorMessage} error = {error} setError = {setError}/>}
					<SuccessModal showModal = {showModal} setShowModal = {setShowModal}/>
					<img src={logo} alt="logo" className='logo-idea-creating' width={306} />
					<div className="idea-creating-block d-flex justify-content-between">
						<div className="idea-image-upload">
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
							validationSchema={ideaCreatingSchema}
							onSubmit={(values) => {
								createIdea(values)
							}}
							initialValues={{
								title: '',
								description: '',
								goal: 0,
								category: 'Choose category',
								images: [{ url: '' }]
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
								<Form className="idea-info-inputs d-block" onSubmit={handleSubmit}>
									<InputGroup className="mb-3">
										<InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
										<Form.Control
											placeholder="idea title"
											aria-label="idea title"
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
										<Form.Control as="textarea" aria-label="Description" name="description" placeholder='1000-3000 symbols'
											value={values.description}
											onChange={handleChange}
											isValid={touched.description && !errors.description}
											isInvalid={!!errors.description}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.description}
										</Form.Control.Feedback>
									</InputGroup>
									<Row>
										<div className="idea-creating-inputs d-flex align-items-flex-start mt-3">
											<InputGroup>
												<InputGroup.Text>Your goal</InputGroup.Text>
												<Form.Control aria-label="Amount (to the nearest dollar)" style={{ minWidth: '30%' }}
													name="goal"
													value={values.goal}
													onChange={handleChange}
													isValid={touched.goal && !errors.goal}
													isInvalid={!!errors.goal}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.goal}
												</Form.Control.Feedback>
											</InputGroup>

											<Button href="" variant="primary" className="btn btn-primary btn-lg">Rules</Button>

										</div>
										<Form.Group as={Col} className="mb-3" controlId="category" style={{ minWidth: '40%' }}>
											<Form.Select
												name="category"
												value={values.category}
												onChange={handleChange}
												isValid={touched.category && !errors.category}
												isInvalid={!!errors.category}>

												<option>Choose category</option>
												<option>IT</option>
												<option>Communication</option>
												<option>Agriculture</option>
												<option>Transport</option>
												<option>Optimisation</option>
											</Form.Select>
											<Form.Control.Feedback type="invalid">
												{errors.category}
											</Form.Control.Feedback>
										</Form.Group>
										<FieldArray name="images">
											{(arrayHelpers) => (
												<>
													{values.images.map((image, index) => (
														<div key={index} className="d-flex align-items-center mb-3">
															<InputGroup>
																<InputGroup.Text>Your goal</InputGroup.Text>
																<Form.Control
																	type="text"
																	placeholder="Enter image URL"
																	name={`images.${index}.url`}
																	value={image.url}
																	onChange={(e) => {
																		handleImageChange(index, e, arrayHelpers);
																	}}
																	isInvalid={errors.images && errors.images[index] && touched.images && touched.images[index]}
																/>
																<Form.Control.Feedback type="invalid">{errors.images && errors.images[index]?.url}</Form.Control.Feedback>
															</InputGroup>
															<Button variant="danger" onClick={() => arrayHelpers.remove(index)}>
																Remove
															</Button>
														</div>
													))}
													<Button variant="primary" onClick={() => arrayHelpers.push({ url: '' })}>
														Add Image
													</Button>
												</>
											)}
										</FieldArray>

									</Row>
									<button className="create-button" type='submit'>Submit</button>
								</Form>
							)}
						</Formik>
					</div>
				</Col>
			</Row>
		</Container>
	);
}