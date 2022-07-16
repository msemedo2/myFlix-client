import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import './profile-view.scss';

export function ProfileView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState({});
	const [email, setEmail] = useState('');
	const [birthdate, setBirthDate] = useState('');

	const [user, setUserData] = useState('');
	const [movies, setMovies] = useState([]);
	const User = localStorage.getItem('user');
	const token = localStorage.getItem('token');
	const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

	const getUserData = () => {
		let user = localStorage.getItem('user');
		let token = localStorage.getItem('token');
		axios
			.get(`https://mikeflix2.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setUsername(response.data.Username);
				setEmail(response.data.Email);
				setUserData(response.data);
				setFavoriteMoviesList(response.data.FavoriteMovies);
				console.log(response);

				response.data.FavoriteMovies.forEach((movie_id) => {
					let favMovies = props.movies.filter(
						(movie) => movie._id === movie_id
					);
					setMovies(favMovies);
				});
			})
			.catch((error) => console.error(error));
	};

	// Delete Profile
	const handleDelete = (e) => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios.delete(`https://mikeflix2.herokuapp.com/users/${user}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		alert(`The account ${user.Username} was successfully deleted.`);
		localStorage.clear();
		window.open('/register', '_self');
	};
	// Update Profile
	const handleUpdate = () => {
		let user = localStorage.getItem('user');
		let token = localStorage.getItem('token');

		axios
			.put(
				`https://mikeflix2.herokuapp.com/users/${user}`,
				{
					Username: username,
					Password: password,
					Email: email,
					BirthDate: birthdate,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			.then((response) => {
				alert('Your profile has been updated');
				localStorage.setItem('user', response.data.Username),
					console.log(response.data);
				window.open('/', '_self');
			})
			.catch((e) => {
				console.log('Error');
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<Container>
			<Row>
				<h3>Profile</h3>
			</Row>
			<Form>
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username:</Form.Label>
					<Form.Control
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						type="text"
						placeholder="username"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						value={password}
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Enter new email"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="birthdate">
					<Form.Label>BirthDate:</Form.Label>
					<Form.Control
						onChange={(e) => setBirthDate(e.target.value)}
						value={birthdate}
						type="date"
						placeholder="birthdate"
					/>
				</Form.Group>
			</Form>
			<Button className="mt-2" onClick={handleUpdate}>
				Update your profile
			</Button>
			<Button className="mt-2 ml-4" onClick={handleDelete}>
				Delete your profile
			</Button>
			<h4>Favorite movies:</h4>
			<Card className="fav-list">
				<Card.Body>
					{favoriteMoviesList.map((movie) => {
						return (
							<div key={movie._id}>
								<img src={movie.ImagePath} alt={movie.Title} />
								<Link to={`/movies/${movie._id}`}>
									<h4>{movie.Title}</h4>
								</Link>
							</div>
						);
					})}
				</Card.Body>
			</Card>
		</Container>
	);
}

ProfileView.propTypes = {
	profileView: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		BirthDate: PropTypes.string,
	}),
};
