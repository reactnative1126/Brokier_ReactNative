import React from "react";
import { useSelector } from 'react-redux';
import moment from 'moment';

import { isEmpty, isCurrency } from "../../utils/functions";
import configs from "../../constants/configs";

const PropertyItem = ({ listing, onClick, onLogin }) => {
    const {logged} = useSelector(state => state.auth);
    return (
        <div key={listing.id} className='pr-property-item' onClick={() => (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && !logged ? onLogin() : onClick(listing)}>
            <div className='title-wrapper'>
                <span className='title'>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</span>
                <span className='neighborhood'>{listing.neighborhood} {listing.city}</span>
            </div>
            <div className='image-container'>
                {!isEmpty(listing) && (
                    <img className='image' src={configs.resURL + listing.images.split('#')[0]} alt={listing.mlsNumber} style={{width: '100%', height: '100%'}}/>
                )}
            </div>
            <div className='pr-detail'>
                <div className='pr-top'>
                    <div className='pr-list-price'>
                        <span className='text'>Listed:</span>
                        <span className={(listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') ? 'price-line' : 'price'}>
                            {isCurrency(listing.listPrice).split('.')[0]}
                        </span>
                    </div>
                    {isCurrency(listing.soldPrice).split('.')[0] !== '$0' && (
                        <div className='pr-sold-price'>
                            <span className='text'>Sold:</span>
                            <span className='price'>
                                {logged ? isCurrency(listing.soldPrice).split('.')[0] : 'Login'}
                            </span>
                        </div>
                    )}
                    <div className='pr-days-on-market'>
                        <div className='day'>
                            <span className='text'>{listing.daysOnMarket} Days on Market</span>
                        </div>
                    </div>
                </div>
                <div className='pr-middle'>
                    <div className={listing.lastStatus === 'Sus' ? 'status-black' : listing.lastStatus === 'Exp' ? 'status-black' : listing.lastStatus === 'Sld' ? 'status-red' : listing.lastStatus === 'Ter' ? 'status-black' : listing.lastStatus === 'Dft' ? 'status-green' : listing.lastStatus === 'Lsd' ? 'status-red' : listing.lastStatus === 'Sc' ? 'status-blue' : listing.lastStatus === 'Lc' ? 'status-blue' : listing.lastStatus === 'Pc' ? 'status-green' : listing.lastStatus === 'Ext' ? 'status-green' : listing.lastStatus === 'New' ? 'status-green' : ''}>
                        <span className={listing.lastStatus === 'Sus' ? 'status-font-black' : listing.lastStatus === 'Exp' ? 'status-font-black' : listing.lastStatus === 'Sld' ? 'status-font-red' : listing.lastStatus === 'Ter' ? 'status-font-black' : listing.lastStatus === 'Dft' ? 'status-font-green' : listing.lastStatus === 'Lsd' ? 'status-font-red' : listing.lastStatus === 'Sc' ? 'status-font-blue' : listing.lastStatus === 'Lc' ? 'status-font-blue' : listing.lastStatus === 'Pc' ? 'status-font-green' : listing.lastStatus === 'Ext' ? 'status-font-green' : listing.lastStatus === 'New' ? 'status-font-green' : ''}>
                            {listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
                            {listing.lastStatus === 'Sld' && ' ' + moment(listing.soldDate).format('MMM YYYY')}
                        </span>
                    </div>
                </div>
                <div className='pr-bottom'>
                    <span className='bottom-font-grey'>
                        {listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus} Beds</span>
                    <div className='bottom-line-grey' />
                    <span className='bottom-font-grey'>
                        {listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus} Baths</span>
                    <div className='bottom-line-grey' />
                    <span className='bottom-font-grey'>
                        {listing.numParkingSpaces} Parking</span>
                    <div className='bottom-line-grey' />
                    <span className='bottom-font-grey'>
                        {listing.type}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyItem;