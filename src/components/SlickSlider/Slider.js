import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import './Slider.scss';

export const SlickSlider = (props) => {
	return (
		<div>
			<h3>Slider works</h3>
			{props.listitems && (
				<Slider
					dots={props.dots}
					infinite={props.infinite}
					speed={props.speed}
					slidesToShow={props.slidesToShow}
					slidesToScroll={props.slidesToScroll}
					onClick={props.onClick}
				>
					{props.children}
				</Slider>
			)}
		</div>
	);
};
