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
import { Formik } from 'formik';
import * as yup from 'yup';

import './IdeaCreating.css';
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

export default function IdeaCreating(props) {
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

	const ideaCreatingSchema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		price: yup.number().typeError("You must specify a number").min(0.01, "Must be greater then 0.01").required("Price field is required"),
		stockLevel: yup.number().typeError("You must specify a number").integer("Stock level must be integer").min(1, "Must be greater then 0").required("Stock level is required"),
		category: yup.string().notOneOf(['Choose category'], 'You must choose category')
	});

	return (
		<Container>
			<Row>
				<Col md={12}>
					<img src={logo} alt="logo" className='logo-idea-creating' width={306} />
					<div className="idea-creating-block d-flex justify-content-between">
						<div className="idea-image-upload">
							<Image fluid rounded width={400} src={files[0] ? files[0].preview : defaultImage} alt={files[0] ? files[0].name : 'defaultImage'} className="main-img" />
							<aside className="thumbs-container">{thumbs}</aside>
							<Form.Label>Upload 3 images</Form.Label>
							<div {...getRootProps({ style })}>
								<p className="">Drag 'n' drop zone</p>
							</div>
						</div>
						<Formik
							validationSchema={ideaCreatingSchema}
							onSubmit={console.log}
							initialValues={{
								title: '',
								description: '',
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
												<Form.Control aria-label="Amount (to the nearest dollar)" style={{ minWidth: '30%'}}
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
												<Form.Control.Feedback type="invalid">
													{errors.stockLevel}
												</Form.Control.Feedback>
											</InputGroup>

                                                <Button href="" variant="primary" class="btn btn-primary btn-lg">Rules</Button>

                                            </div>
											<Form.Group as={Col} controlId="category" style={{ minWidth: '40%'}}>
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