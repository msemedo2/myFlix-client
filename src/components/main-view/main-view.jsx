import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import {
	Button,
	Card,
	CardGroup,
	Container,
	Col,
	Row,
	Form,
} from 'react-bootstrap';

export class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			registered: null,
		};
	}

	componentDidMount() {
		axios
			.get('https://mikeflix2.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

	onLoggedIn(user) {
		this.setState({
			user,
		});
	}

	onRegistration(registered) {
		this.setState({
			registered,
		});
	}

	render() {
		const { movies, selectedMovie, user, registered } = this.state;

		if (!user)
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		if (!registered)
			return (
				<RegistrationView
					onRegistration={(registered) => this.onRegistration(registered)}
				/>
			);

		if (movies.length === 0) return <div className="main-view" />;

		return (
			<Container>
				<div className="main-view">
					{selectedMovie ? (
						<Row className="justify-content-md-center">
							<Col md={8}>
								<MovieView
									movie={selectedMovie}
									onBackClick={(newSelectedMovie) => {
										this.setSelectedMovie(newSelectedMovie);
									}}
								/>
							</Col>
						</Row>
					) : (
						<Row className="justify-content-md-center">
							{movies.map((movie) => (
								<Col md={3}>
									<MovieCard
										key={movie._id}
										movie={movie}
										onMovieClick={(newSelectedMovie) => {
											this.setSelectedMovie(newSelectedMovie);
										}}
									/>
								</Col>
							))}
						</Row>
					)}
				</div>
			</Container>
		);
	}
}
