import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './Carousel.scss';
/* Swiper SCSS */
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Carousel = ({ list, itemClicked }) => {
	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={4}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			onSlideChange={(swiper) => console.log('slide change', swiper.activeIndex)}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{list &&
				list.map((item, index) => {
					return (
						<SwiperSlide key={index} onClick={() => itemClicked(item)}>
							<img src={item.img} alt="poster" style={{ maxWidth: '100%', height: 'auto' }} />
						</SwiperSlide>
					);
				})}
		</Swiper>
	);
};
