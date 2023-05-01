import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../API/axios";
import { Formik } from 'formik';
import * as yup from 'yup';

import './Profile.css';
import logo from "../../../resources/logo(black).svg";
import ErrorModal from "../../errorModal/ErrorModal";
import Spinner from "../../spinner/Spinner";


export default function ProfilePage() {
	const { id } = useParams();
	const [userInfo, setUserInfo] = useState({
		username: '',
		fullName: '',
		role: '',
		email: '',
		mobile: '',
	})
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [editMode, setEditMode] = useState(false);
	const toggleEditMode = () => setEditMode(!editMode);

	const handleFormSubmit = (values) => {
		const data = {
			"username" : values.username,
			"fullname" : values.fullName,
			"email" : values.email,
			"mobile" : values.mobile,
		}
		axiosInstance.put(`/user/`, data)
			.then(() => {
				toggleEditMode();
				window.location.reload();
			})
			.catch((error) => {
				console.log(error)
				setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
				setError(true);
			})
	};

	const userUpdatingSchema = yup.object().shape({
		username: yup.string().min(5, "Minimal 5 symbols").max(25).required('Username field is requierd'),
		fullName: yup.string().required(),
		email: yup.string().email('Invalid e-mail').required('E-mail is required'),
		mobile: yup
			.string()
			.matches(/^(373|\+373|0)(6|7)(\d{7})$/, 'Invalid mobile number format')
			.nullable()
	});

	useEffect(() => {
		axiosInstance.get(`/user/${id}`)
			.then(res => {
				setUserInfo(res.data);
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
				setError(true);
			})
	}, [])

	const renderUserInfo = () => {
		const { username, fullName, role, email, mobile } = userInfo
		return (
			<div className="main-body">
				<Row className="gutters-sm">
					<Col md={4} className='mb-3'>
						<Card>
							<Card.Body>
								<div className="d-flex flex-column align-items-center text-center">
									<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="User avatar" className="rounded-circle" width="150" />
									<div className="mt-3">
										<h4>{username}</h4>
										<p className="text-secondary mb-1">{role}</p>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
					{editMode ?
						<Col md={8}>
							<Card className="mb-3">
								<Card.Body>
									<Formik
										validationSchema={userUpdatingSchema}
										onSubmit={(values) => { handleFormSubmit(values); }}
										initialValues={{
											username: userInfo.username,
											fullName: userInfo.fullName,
											email: userInfo.email,
											mobile: userInfo.mobile || ''
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
											<Form onSubmit={handleSubmit}><InputGroup className="mb-3">
												<InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
												<Form.Control
													placeholder="Username"
													aria-label="Username"
													aria-describedby="basic-addon1"
													name="username"
													value={values.username}
													onChange={handleChange}
													isValid={touched.username && !errors.username}
													isInvalid={!!errors.username}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.username}
												</Form.Control.Feedback>
											</InputGroup>
												<InputGroup className="mb-3">
													<InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
													<Form.Control
														placeholder="Full name"
														aria-label="Full name"
														aria-describedby="basic-addon1"
														name="fullName"
														value={values.fullName}
														onChange={handleChange}
														isValid={touched.fullName && !errors.fullName}
														isInvalid={!!errors.fullName}
													/>
													<Form.Control.Feedback type="invalid">
														{errors.fullName}
													</Form.Control.Feedback>
												</InputGroup>
												<InputGroup className="mb-3">
													<InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
													<Form.Control
														placeholder="Email"
														aria-label="Email"
														aria-describedby="basic-addon1"
														name="email"
														value={values.email}
														onChange={handleChange}
														isValid={touched.email && !errors.email}
														isInvalid={!!errors.email}
													/>
													<Form.Control.Feedback type="invalid">
														{errors.email}
													</Form.Control.Feedback>
												</InputGroup>
												<InputGroup className="mb-3">
													<InputGroup.Text id="basic-addon1">Mobile</InputGroup.Text>
													<Form.Control
														placeholder="Mobile"
														aria-label="Mobile"
														aria-describedby="basic-addon1"
														name="mobile"
														value={values.mobile}
														onChange={handleChange}
														isValid={touched.mobile && !errors.mobile}
														isInvalid={!!errors.mobile}
													/>
													<Form.Control.Feedback type="invalid">
														{errors.mobile}
													</Form.Control.Feedback>
												</InputGroup>
												<Row>
													<Col sm={12}>
														<div className="edit-buttons">
															<Button variant="success" style={{ marginRight: "10px" }} type='submit'>Save</Button>
															<Button variant="danger" onClick={toggleEditMode}>Cancel</Button>
														</div>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</Card.Body>
							</Card>
						</Col>
						:
						<Col md={8}>
							<Card className="mb-3">
								<Card.Body>
								<Row>
										<Col sm={3}>
											<h6 className="mb-0">Username</h6>
										</Col>
										<Col sm={9} className="text-secondary">
											{username}
										</Col>
									</Row>
									<hr />
									<Row>
										<Col sm={3}>
											<h6 className="mb-0">Full Name</h6>
										</Col>
										<Col sm={9} className="text-secondary">
											{fullName}
										</Col>
									</Row>
									<hr />
									<Row>
										<Col sm={3}>
											<h6 className="mb-0">Email</h6>
										</Col>
										<Col sm={9} className="text-secondary">
											{email}
										</Col>
									</Row>
									<hr />
									<Row>
										<Col sm={3}>
											<h6 className="mb-0">Mobile</h6>
										</Col>
										<Col sm={9} className="text-secondary">
											{mobile || "-"}
										</Col>
									</Row>
									<hr />
									<Row>
										<Col sm={12}>
											<Button className="btn-info" onClick={toggleEditMode}>Edit</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					}
				</Row>
			</div>
		)
	}

	const userRender = renderUserInfo(userInfo);
	const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError={setError} /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? userRender : null;

	return (
		<Container>
			<Col md={4} sm={8} className="ideas-logo-block d-flex align-items-center">
				<img src={logo} alt="" width={306} />
				<h2 className="merch-title">Profile</h2>
			</Col>
			{errorModal}
			{spinner}
			{content}
		</Container>
	);
}