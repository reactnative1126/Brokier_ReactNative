import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RBCarousel from "react-bootstrap-carousel";
import GoogleMapReact from 'google-map-react';

import { setLoading } from '../../../modules/redux/auth/actions';
import {
	PropertyDetail,
	PropertyHistories,
	PropertyDescription,
	PropertyPrices,
	PropertyProfile,
	PropertySimilar,
	MarkerMain,
} from '../../../components';
import {
	getDetailHistories,
	getDetailSimilars,
	getDetailRooms
} from '../../../modules/services/ListingsService';
import { isEmpty } from "../../../utils/functions";
import configs from "../../../constants/configs";

const PropertyModal = ({ visible, listing, onClose, onImage, onDetail }) => {
	const dispatch = useDispatch();

	const [school, setSchool] = useState('All');
	const [histories, setHistories] = useState([]);
	const [similar, setSimilar] = useState('For Sale');
	const [similars, setSimilars] = useState([]);
	const [images, setImages] = useState([]);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		if (!isEmpty(listing)) {
			// dispatch(setLoading(true));
			var status = 'A';
			var type = 'Sale';
			var lastStatus = null;
			if (similar === 'For Sale') {
				status = 'A';
				type = 'Sale';
				lastStatus = null;
			} else if (similar === 'Sold') {
				status = 'U';
				type = null;
				lastStatus = 'Sld';
			} else {
				status = 'U';
				type = null;
				lastStatus = 'Lsd';
			}
			getDetailHistories(listing.streetNumber, listing.streetName, listing.streetSuffix, listing.unitNumber)
				.then((response) => {
					setHistories(response);
				});
			getDetailSimilars(listing.latitude, listing.longitude, status, type, lastStatus, listing.propertyType, listing.numBedrooms)
				.then((response) => {
					setSimilars(response)
				});
			getDetailRooms(listing.mlsNumber)
				.then((rooms) => {
					// dispatch(setLoading(false));
					setRooms(rooms);
				});
		}
	}, [listing, similar]);

	return (
		(visible && !isEmpty(listing)) ? (
			<a className='property-modal'>
				<div className='modal-wrapper'>
					<div className='buttons'>
						<button className='expand-button' onClick={() => onDetail(listing.id, listing.streetNumber, listing.streetName, listing.streetSuffix)}>
							<span className='expand-text'>Expand</span>
							<i className='fas fa-expand f-s-12'></i>
						</button>
						<button className='expand-button' onClick={onClose}>
							<span className='expand-text'>Close</span>
							<i className='fas fa-times-circle f-s-12'></i>
						</button>
					</div>
					<div className='mobile-buttons'>
						<button className='expand-button' onClick={onClose}>
							<i className='fas fa-chevron-left f-s-20'></i>
						</button>
						<div className='title-wrapper'>
							<span className='title'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>
							<span className='neighborhood'>{listing.neighborhood} {listing.city}</span>
						</div>
					</div>
					<div className='title-wrapper'>
						<span className='title'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>
						<span className='neighborhood'>{listing.neighborhood} {listing.city}</span>
					</div>
					<div className='property-modal-image-container'>
						<RBCarousel
							animation={true}
							autoplay={false}
							slideshowSpeed={7000}
							defaultActiveIndex={0}
							indicators={listing.images.split('#').length > 1 ? true : false}
							leftIcon={listing.images.split('#').length > 1 && <i className="fas fa-chevron-left" style={{ fontSize: '24px', color: 'white' }}></i>}
							rightIcon={listing.images.split('#').length > 1 && <i className="fas fa-chevron-right" style={{ fontSize: '24px', color: 'white' }}></i>}
							version={4}
						>
							{
								listing.images.split('#').map((image, key) => (
									<button key={key} className="property-modal-carousel-media-inner" onClick={() => onImage(listing.images, key)}>
										<img src={configs.resURL + image} alt={listing.mlsNumber} style={{ maxWidth: "100%", maxHeight: '100%' }} />
									</button>
								))
							}
						</RBCarousel>
					</div>
					<PropertyDetail listing={listing} />
					<PropertyHistories histories={histories}
						onDetail={(id, streetNumber, streetName, streetSuffix) => onDetail(id, streetNumber, streetName, streetSuffix)} />
					<div className='property-modal-map-wrapper'>
						<GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8', language: 'en', region: 'US' }}
							options={{ scrollwheel: false }}
							defaultZoom={17}
							defaultCenter={{ lat: listing.latitude, lng: listing.longitude }}
						>
							<MarkerMain
								lat={parseFloat(listing.latitude)}
								lng={parseFloat(listing.longitude)}
								item={[listing]}
								details={listing}
								onClick={() => console.log('OK')}
							/>
						</GoogleMapReact>
					</div>
					<PropertyDescription listing={listing} />
					<PropertyPrices listing={listing} />
					<PropertyProfile className='property-container' />
					<PropertySimilar
						similar={similar}
						onSimilar={(similar) => setSimilar(similar)}
						similars={similars}
						onDetail={(id, streetNumber, streetName, streetSuffix) => onDetail(id, streetNumber, streetName, streetSuffix)}
					/>
				</div>
			</a>
		) : null
	)
}

export default PropertyModal;
