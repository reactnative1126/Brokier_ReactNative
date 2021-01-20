import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { isEmpty, isCurrency } from "../../../../utils/functions";
import configs from "../../../../constants/configs";

const MarkerDetail = ({ details, onClick, onLogin }) => {
	const { logged } = useSelector(state => state.auth);
	return (
		<div key='overMarker' className={details.length > 2 ? 'marker-detail3' : details.length === 2 ? 'marker-detail2' : 'marker-detail1'} style={{ overflowY: details.length <= 2 ? 'hidden' : 'scroll' }}>
			{details.map((listing, key) => (
				<div key={listing.id} className='marker-detail-item' style={{ borderBottom: '1px dotted black' }} onClick={() => (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && !logged ? onLogin() : onClick(listing)}>
					<div className='title-wrapper'>
						<span className='title'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>
						<div>
							<span className='marker-detail-days'>{listing.daysOnMarket} Days on Market</span>
						</div>
					</div>
					<div className='marker-detail-wrapper'>
						{!isEmpty(listing) && (
							<img key={key} className='marker-detail-image' src={configs.resURL + listing.images.split('#')[0]} alt={listing.mlsNumber} />
						)}
						<div className='item-details'>
							<div className='top-wrapper'>
								<div className='list-price'>
									<span className='text'>Listed:</span>
									<span className={(listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') ? 'line' : 'price'}>
										{isCurrency(listing.listPrice).split('.')[0]}
									</span>
								</div>
								{isCurrency(listing.soldPrice).split('.')[0] !== '$0' && (
									<div className='sold-price'>
										<span className='text'>Sold:</span>
										<span className='price'>
											{logged ? isCurrency(listing.soldPrice).split('.')[0] : 'Login'}
										</span>
									</div>
								)}
							</div>
							<div className='middle-wrapper'>
								<div className={listing.lastStatus === 'Sus' ? 'status-black' : listing.lastStatus === 'Exp' ? 'status-black' : listing.lastStatus === 'Sld' ? 'status-red' : listing.lastStatus === 'Ter' ? 'status-black' : listing.lastStatus === 'Dft' ? 'status-green' : listing.lastStatus === 'Lsd' ? 'status-red' : listing.lastStatus === 'Sc' ? 'status-blue' : listing.lastStatus === 'Lc' ? 'status-blue' : listing.lastStatus === 'Pc' ? 'status-green' : listing.lastStatus === 'Ext' ? 'status-green' : listing.lastStatus === 'New' ? 'status-green' : ''}>
									<span className={listing.lastStatus === 'Sus' ? 'status-font-black' : listing.lastStatus === 'Exp' ? 'status-font-black' : listing.lastStatus === 'Sld' ? 'status-font-red' : listing.lastStatus === 'Ter' ? 'status-font-black' : listing.lastStatus === 'Dft' ? 'status-font-green' : listing.lastStatus === 'Lsd' ? 'status-font-red' : listing.lastStatus === 'Sc' ? 'status-font-blue' : listing.lastStatus === 'Lc' ? 'status-font-blue' : listing.lastStatus === 'Pc' ? 'status-font-green' : listing.lastStatus === 'Ext' ? 'status-font-green' : listing.lastStatus === 'New' ? 'status-font-green' : ''}>
										{listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
										{listing.lastStatus === 'Sld' && ' ' + moment(listing.soldDate).format('MMM YYYY')}
									</span>
								</div>
							</div>
							<div className='bottom-wrapper'>
								<span className='font-grey'>
									{listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus} BE</span>
								<div className='line-grey' />
								<span className='font-grey'>
									{listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus} BA</span>
								<div className='line-grey' />
								<span className='font-grey'>
									{listing.numParkingSpaces} PA</span>
								<div className='line-grey' />
								<span className='font-grey'>
									{listing.type}</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default MarkerDetail;
