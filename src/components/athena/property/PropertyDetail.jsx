import React from "react";
import moment from 'moment';

import { isEmpty, isCurrency } from "../../../utils/functions";

const PropertyDetail = ({ listing }) => {
  var listClass = 'property-detail-list-price>span.text ';
  var statusClass = 'property-detail-status-container ';
  var statusTextClass = 'property-detail-status-text '

  if (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') {
    listClass += 'property-detail-list-price>span.line'
  }

  if (listing.lastStatus === 'Sus') {
    statusClass += 'bc1';
    statusTextClass += 'fc1';
  } else if (listing.lastStatus === 'Exp') {
    statusClass += 'bc1';
    statusTextClass += 'fc1';
  } else if (listing.lastStatus === 'Sld') {
    statusClass += 'bc2';
    statusTextClass += 'fc2';
  } else if (listing.lastStatus === 'Ter') {
    statusClass += 'bc1';
    statusTextClass += 'fc1';
  } else if (listing.lastStatus === 'Dft') {
    statusClass += 'bc3';
    statusTextClass += 'fc3';
  } else if (listing.lastStatus === 'Lsd') {
    statusClass += 'bc5';
    statusTextClass += 'fc5';
  } else if (listing.lastStatus === 'Sc') {
    statusClass += 'bc4';
    statusTextClass += 'fc4';
  } else if (listing.lastStatus === 'Lc') {
    statusClass += 'bc4';
    statusTextClass += 'fc4';
  } else if (listing.lastStatus === 'Pc') {
    statusClass += 'bc3';
    statusTextClass += 'fc3';
  } else if (listing.lastStatus === 'Ext') {
    statusClass += 'bc3';
    statusTextClass += 'br2';
  } else if (listing.lastStatus === 'New') {
    statusClass += 'bc3';
    statusTextClass += 'fc3';
  }

  return (
    <div className='property-detail-container'>
      <div className='top-wrapper'>
        <div className='list-price'>
          <span className='text'>Listed:</span>
          <span className={(listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') ? 'line' : 'price'}>
            {isCurrency(listing.listPrice).split('.')[0]}
          </span>
          {/* <span className={listClass}>{isCurrency(listing.listPrice).split('.')[0]}</span> */}
        </div>
        {isCurrency(listing.soldPrice).split('.')[0] !== '$0' ?
          <div className='sold-price'>
            <span className='text'>Sold:</span>
            <span className='price'>{isCurrency(listing.soldPrice).split('.')[0]}</span>
          </div> : <div className='sold-price' />}
        <div className='days-wrapper'>
          <div className='day'>
            <span className='text'>{listing.daysOnMarket} Days on Market</span>
          </div>
        </div>
      </div>
      <div className='property-detail-middle'>
        <div className={statusClass}>
          <span className={statusTextClass} >
            {listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
            {listing.lastStatus === 'Sld' && ' ' + moment(listing.soldDate).format('MMM YYYY')}
            {listing.lastStatus === 'Lsd' && ' ' + moment(listing.soldDate).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
      <div className='property-detail-bottom'>
        <span className='text'>{listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus} Beds</span>
        <div className='line' />
        <span className='text'>{listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus} Baths</span>
        <div className='line' />
        <span className='text'>
          {listing.numParkingSpaces} Parking</span>
        <div className='line' />
        <span className='text'>{listing.type}</span>
      </div>
    </div>
  );
};

export default PropertyDetail;