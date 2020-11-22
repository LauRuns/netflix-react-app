import React, { useState } from 'react';

import { ImageContainer } from '../../shared/components/UIElements/image-container/ImageContainer';
import './SampleSlider.scss';

export const SampleSlider = ({ slideList }, props) => {
	const [x, setX] = useState(0);

	const goLeft = () => {
		console.log('GO LEFT___', x);

		// setX(x + 100);
		if (x !== 0) {
			// x === 0 ? setX(slideList.length - 1) : setX(x + 100);
			setX(x + 100);
		}
		if (x === 0) return;
	};

	const goRight = () => {
		console.log('GO RIGHT___', x);
		x === -100 * (slideList.length - 1) ? setX(0) : setX(x - 100);
	};

	const onItemClickHandler = (e) => {
		console.log(e);
	};

	return (
		<>
			<div className="slider-container">
				{!slideList ? (
					<div className="no-data">
						<h2>No slide data available</h2>
					</div>
				) : (
					// <div>{props.children}</div>
					<div className="slide-container">
						{slideList.map((item, index) => {
							return (
								<div
									key={index}
									className="slide"
									style={{
										transform: `translateX(${x}%)`,
										height: `auto`
									}}
								>
									<ImageContainer
										onClick={() => onItemClickHandler(item)}
										src={item.img ? item.img : item.poster}
										alt={item.title}
									/>
								</div>
							);
						})}
					</div>
				)}
				<button id="goLeft" onClick={goLeft} disabled={x === 0}>
					LEFT
				</button>
				<button id="goRight" onClick={goRight} disabled={x === slideList.length - 1}>
					RIGHT
				</button>
			</div>
		</>
	);
};
