import React from 'react';
import Button from 'react-bootstrap/Button';
import {
	Button,
	Card,
	CardGroup,
	Container,
	Col,
	Row,
	Form,
} from 'react-bootstrap';

export class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<Container className="movie-view">
				<Row>
					<Col>
						<div className="movie-poster">
							<img src={movie.ImagePath} />
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="movie-title">
							<span className="label">Title: </span>
							<span className="value">{movie.Title}</span>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="movie-description">
							<span className="label">Description: </span>
							<span className="value">{movie.Description}</span>
						</div>
					</Col>
				</Row>
				<Button
					onClick={() => {
						onBackClick(null);
					}}
					variant="link"
				>
					Back
				</Button>
			</Container>
		);
	}
}
