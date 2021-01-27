import React from 'react';
import RBCarousel from "react-bootstrap-carousel";

import { isEmpty } from "../../../utils/functions";
import configs from "../../../constants/configs";

const PropertyImage = ({ visible, images, index, onClose }) => {

	return (
		(visible && !isEmpty(images)) ? (
			<div className='property-full-image-container'>
				<RBCarousel
					animation={true}
					autoplay={false}
					slideshowSpeed={7000}
					defaultActiveIndex={index}
					indicators={images.split('#').length > 1 ? true : false}
					leftIcon={images.split('#').length > 1 && <i className="fas fa-chevron-left" style={{ fontSize: '24px', color: 'white' }}></i>}
					rightIcon={images.split('#').length > 1 && <i className="fas fa-chevron-right" style={{ fontSize: '24px', color: 'white' }}></i>}
					version={4}
				>
					{
						images.split('#').map((image, key) => (
							<button key={key} className="property-full-media-inner">
								<img src={configs.resURL + image} alt={image} style={{ maxWidth: "100%", maxHeight: '100%' }} />
							</button>
						))
					}
				</RBCarousel>
				<button className='property-full-close-button' onClick={onClose}>
					<i className='fas fa-times f-s-18' style={{ color: 'white', zIndex: 9002 }}></i>
				</button>
			</div>
		) : null
	)
}

export default PropertyImage;
