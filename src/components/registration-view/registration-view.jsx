import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Card,
	CardGroup,
	Container,
	Col,
	Row,
	Form,
} from 'react-bootstrap';
export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthdate);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onRegistration(username);
	};

	return (
		<Form>
			<Form.Group controlId="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formEmail">
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type="email"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formBirthDate">
				<Form.Label>BirthDate:</Form.Label>
				<Form.Control
					type="date"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
}

RegistrationView.propTypes = {
	onRegistration: PropTypes.func.isRequired,
};
