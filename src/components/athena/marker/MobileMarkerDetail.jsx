import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty, isCurrency } from "../../../utils/functions";
import configs from "../../../constants/configs";

const MobileMarkerDetail = ({ details, onClick, onLogin }) => {
	const { logged } = useSelector(state => state.auth);
	const [status, setStatus] = useState(false);
	return (
		<div key='overMarker' className={details.length > 1 ? status ? 'mobile-marker-detail3' : 'mobile-marker-detail2' : 'mobile-marker-detail1'} style={{ overflowY: details.length <= 2 ? 'hidden' : 'scroll' }}>
			{details.length > 1 && (
				<div className='mobile-marker-status' onClick={() => setStatus(!status)}>
					<i className={status ? 'fas fa-angle-down f-s-20' : 'fas fa-angle-up f-s-20'}></i>
					<span>{details.length} Units (Swipe to view all)</span>
					<div style={{ width: 30 }}></div>
				</div>
			)}
			{details.map((listing, key) => (
				<div key={listing.id} className='marker-detail-item' style={{ borderBottom: '1px dotted black' }} onClick={() => (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && !logged ? onLogin() : onClick(listing)}>
					<div className='marker-detail-wrapper'>
						{!isEmpty(listing) && (
							<img key={key} className='marker-detail-image' src={configs.resURL + listing.images.split('#')[0]} alt={listing.mlsNumber} />
						)}
						<div className='item-details'>
							<div className='left-wrapper'>
								<div className='list-price'>
									<span className={(listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') ? 'line' : 'price'}>
										{isCurrency(listing.listPrice).split('.')[0]}
									</span>
								</div>
								<span className='mobile-address'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>

								{isCurrency(listing.soldPrice).split('.')[0] !== '$0' && (
									<div className='sold-price'>
										<span className='price'>
											<span className={listing.lastStatus === 'Sus' ? 'status-font-black' : listing.lastStatus === 'Exp' ? 'status-font-black' : listing.lastStatus === 'Sld' ? 'status-font-red' : listing.lastStatus === 'Ter' ? 'status-font-black' : listing.lastStatus === 'Dft' ? 'status-font-green' : listing.lastStatus === 'Lsd' ? 'status-font-red' : listing.lastStatus === 'Sc' ? 'status-font-blue' : listing.lastStatus === 'Lc' ? 'status-font-blue' : listing.lastStatus === 'Pc' ? 'status-font-green' : listing.lastStatus === 'Ext' ? 'status-font-green' : listing.lastStatus === 'New' ? 'status-font-green' : ''}>
												{listing.lastStatus === 'Sus' ? 'Suspended For: ' : listing.lastStatus === 'Exp' ? 'Expires For: ' : listing.lastStatus === 'Sld' ? 'Sold For: ' : listing.lastStatus === 'Ter' ? 'Terminated For: ' : listing.lastStatus === 'Dft' ? 'Deal For: ' : listing.lastStatus === 'Lsd' ? 'Leased For: ' : listing.lastStatus === 'Sc' ? 'Sold Con For: ' : listing.lastStatus === 'Lc' ? 'Leased Con For: ' : listing.lastStatus === 'Pc' ? 'Price Change For: ' : listing.lastStatus === 'Ext' ? 'Extended For: ' : listing.lastStatus === 'New' ? 'For Sale For: ' : null}
											</span>
											{logged ? isCurrency(listing.soldPrice).split('.')[0] : 'Login'}
										</span>
									</div>
								)}
							</div>
							<div className='bottom-wrapper'>
								<span className='font-white'>
									{listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus}<br />Beds</span>
								<div className='line-white' />
								<span className='font-white'>
									{listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus}<br />Baths</span>
								<div className='line-white' />
								<span className='font-white'>
									{listing.numParkingSpaces}<br />Parking</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default MobileMarkerDetail;
