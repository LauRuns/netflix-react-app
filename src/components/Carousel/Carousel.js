import React, { useRef, useState, useEffect } from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/UIElements/Button/Button';
import './Carousel.scss';
import Testimage from '../../assets/netflix_logo_circle.png';
import Logo from '../../components/Logo/Logo';

const Carousel = ({ list, itemClicked }) => {
	const [currentCard, setCurrentCard] = useState(0);
	const cardCarouselRef = useRef();

	const testLog = (e) => {
		console.log('Card item was clicked____::');
		console.log(e);
	};

	const nextHandler = () => {
		console.log('Next button clicked____::');
		setCurrentCard(currentCard + 1);
		console.log(currentCard);
	};

	const previousHandler = () => {
		console.log('Previous button clicked____::');
	};

	return (
		<div className="carousel-container">
			<div ref={cardCarouselRef} className="carousel-card-container">
				{list &&
					list.map((item) => {
						let id = Math.random(); // just setting a random num as key to satisfy React
						return (
							<div key={id} className="img-card">
								<Card onClick={() => itemClicked(item)}>
									<h3>{item.title}</h3>
									{item.img && <img src={item.img} alt={item.title} />}
								</Card>
							</div>
						);
					})}
			</div>
			<div className="carousel-actions">
				<Button size="small" onClick={previousHandler}>
					Previous
				</Button>
				<Button size="small" onClick={nextHandler}>
					Next
				</Button>
			</div>
		</div>
	);
};

export default Carousel;
