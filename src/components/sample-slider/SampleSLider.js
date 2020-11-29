import React, { useState } from 'react';

import { ImageContainer } from '../../shared/components/UIElements/image-container/ImageContainer';
import { Icon } from '../Icon/Icon';
import { Header } from '../../shared/components/UIElements/header/Header';
import './SampleSlider.scss';

export const SampleSlider = ({ slideList, onClick }) => {
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
						<Icon icon="chevron_left" size={64} disabled={x === 0} style={{ zIndex: '90' }} />
					</div>
				)}
				{slideList && (
					<div id="goRight" onClick={goRight}>
						<Icon icon="chevron_right" size={64} disabled={x === 0} style={{ zIndex: '90' }} />
					</div>
				)}
			</div>
		</>
	);
};
