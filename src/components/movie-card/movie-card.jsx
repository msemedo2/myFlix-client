import React from 'react';
import { Button, Card } from 'react-bootstrap/';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './movie-card.scss';
export class MovieCard extends React.Component {
	addMovie(movie, user) {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		console.log(movie);
		console.log(token);

		axios
			.post(
				`https://mikeflix2.herokuapp.com/users/${username}/movies/${movie._id}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				this.setState({
					user: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movie, user } = this.props;

		return (
			<Card id="movie-card">
				<Link to={`/movies/${movie._id}`}>
					<Card.Img variant="top" src={movie.ImagePath} />
				</Link>
				{/* <Card.Body> */}
				{/* <Card.Title id="card-title">{movie.Title}</Card.Title> */}

				{/* <Link to={`/movies/${movie._id}`}>
            <Button className="button" size="sm">
              Open
            </Button> */}
				{/* </Link> */}
				{/* <Button
            className="button ml-2"
            size="sm"
            onClick={() => {
              this.addMovie(movie, user);
            }}
          >
            Add
          </Button>
        </Card.Body> */}
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			BirthDate: PropTypes.string.isRequired,
			Death: PropTypes.string,
		}),
	}).isRequired,
};
