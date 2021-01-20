import React from 'react';

import { isEmpty, isCurrency } from "../../../../utils/functions";
import configs from "../../../../constants/configs";

const SimilarDetail = ({ index, listing, onClick }) => {

	return (
		<div key={`sim${index}`} className='similar-detail-wrapper' key={listing.id.toString()}>
			<button className='similar-detail-button' onClick={() => onClick(listing.id)}>
				<img className='similar-detail-image' src={configs.resURL + listing.images.split('#')[0]} alt={listing.images.split('#')[0]} />
				<div className='similar-detail-content'>
					<div className='content-top'>
						<span className={(listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') ? 'title' : 'line'}>{isCurrency(listing.listPrice).split('.')[0]}</span>
						{isCurrency(listing.soldPrice).split('.')[0] !== '$0' ? <span className='sold'>{isCurrency(listing.soldPrice).split('.')[0]}</span> : null}
						<span style={{ fontSize: 8, fontWeight: "normal" }}>{listing.daysOnMarket} Days on Market</span>
					</div>
					<span className='content-status'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>
					<div className='content-bottom'>
						<span key='br' style={{ fontSize: 8, fontWeight: "500", color: 'gery', marginRight: 5 }}>
							{listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && '+' + listing.numBedroomsPlus} Br</span>
						<span key='bath' style={{ fontSize: 8, fontWeight: "500", color: 'gery', marginRight: 5 }} >
							{listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && '+' + listing.numBathroomsPlus} Bath</span>
						<span key='parking' style={{ fontSize: 8, fontWeight: "500", color: 'gery', marginRight: 5 }}>
							{listing.numParkingSpaces} Parking</span>
						<span key='type' style={{ fontSize: 8, fontWeight: "500", color: 'gery', marginRight: 5 }}>
							{listing.type}
						</span>
					</div>
				</div>
			</button>
		</div>
	)
}

export default SimilarDetail;
