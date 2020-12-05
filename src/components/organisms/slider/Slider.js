import React, { useState } from 'react';

import { ImageContainer } from '../../../components/uiElements';
import { Icon, Header } from '../../atoms';

import './Slider.scss';

export const Slider = ({ slideList, onClick }) => {
	const [x, setX] = useState(0);

	const goLeft = () => {
		if (x !== 0) {
			setX(x + 100);
		} else {
			return;
		}
	};

	const goRight = () => {
		x === -100 * (slideList.length - 1) ? setX(0) : setX(x - 100);
	};

	return (
		<>
			<div className="slider-container">
				{!slideList ? (
					<Header md center>
						<h3>Sorry, no data available at the moment...</h3>
					</Header>
				) : (
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
										onClick={() => onClick(item)}
										src={item.img ? item.img : item.poster || item.imdbposter}
										alt={item.title}
									/>
								</div>
							);
						})}
					</div>
				)}
				{slideList && (
					<div id="goLeft" onClick={goLeft}>
						<Icon icon="chevron_left" size={64} disabled={x === 0} style={{ zIndex: '80' }} />
					</div>
				)}
				{slideList && (
					<div id="goRight" onClick={goRight}>
						<Icon icon="chevron_right" size={64} disabled={x === 0} style={{ zIndex: '80' }} />
					</div>
				)}
			</div>
		</>
	);
};
