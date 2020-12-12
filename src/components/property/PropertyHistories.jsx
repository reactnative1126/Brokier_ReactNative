import React from "react";
import moment from 'moment';

import { isEmpty, isCurrency } from "../../utils/functions";

const PropertyHistories = ({ histories }) => {
  var historiesItemClass = 'hi-wrapper ';
  if (histories.length > 5) {
    historiesItemClass += 'hi-200'
  }

  return (
    <div className='hi-container'>
      <div className='hi-top-button'>
        <button className='hi-one-button'>
          <span>Estimated Home Value</span>
        </button>
        <button className='hi-one-button'>
          <span>Estimated Rental Price</span>
        </button>
      </div>
      <div className='hi-header'>
        <div className='hi-title'>
          <span>Property History</span>
        </div>
        <div className='hi-content'>
          <span>List Price</span>
        </div>
        <div className='hi-content'>
          <span>Sold Price</span>
        </div>
        <div className='hi-content'>
          <span>MLS #</span>
        </div>
      </div>
      {isEmpty(histories) ? <div style={{ height: 10 }} /> :
        <div className={historiesItemClass}>
          {histories.map((listing, key) => {
            return (
              <div key={key} className='hi-item'>
                <div className='hi-item-first'>
                  <div className='hi-item-first-wrapper'>
                    <div className='hi-item-first-view' style={{ borderColor: (listing.status === 'A' && listing.type === 'Sale') ? '#549E65' : (listing.status === 'U' && listing.lastStatus === 'Sld') ? '#E45757' : (listing.status === 'A' && listing.lastStatus === 'Ter') ? 'black' : listing.status === 'A' && listing.type === 'Lease' ? '#4E9EE9' : (listing.status === 'U' && listing.lastStatus === 'Lsd') ? '#FF9900' : 'black' }} >
                      <span className='hi-item-first-text' style={{ color: (listing.status === 'A' && listing.type === 'Sale') ? '#549E65' : (listing.status === 'U' && listing.lastStatus === 'Sld') ? '#E45757' : (listing.status === 'A' && listing.lastStatus === 'Ter') ? 'black' : listing.status === 'A' && listing.type === 'Lease' ? '#4E9EE9' : (listing.status === 'U' && listing.lastStatus === 'Lsd') ? '#FF9900' : 'black' }} >{(listing.status === 'A' && listing.type === 'Sale') ? 'For Sale' : (listing.status === 'U' && listing.lastStatus === 'Sld') ? 'Sold' : (listing.status === 'A' && listing.lastStatus === 'Ter') ? 'Terminated' : listing.status === 'A' && listing.type === 'Lease' ? 'For Rent' : (listing.status === 'U' && listing.lastStatus === 'Lsd') ? 'Rented' : 'Other'}</span>
                    </div>
                    {(listing.status === 'U' && listing.lastStatus === 'Sld') ? null : (
                        <span style={{ fontSize: 12, fontWeight: '500', color: '#4E9EE9', textDecorationLine: 'underline', marginLeft: 10, cursor: 'pointer' }}  onClick={() => alert(listing.id)}>View</span>
                    )}
                  </div>
                  <div className='hi-item-first-date'><span>{moment(listing.listDate).format('DD/MM/YYYY')}-{isEmpty(listing.soldDate) ? moment().format('DD/MM/YYYY') : moment(listing.soldDate).format('DD/MM/YYYY')}</span></div>
                </div>
                <div className='hi-price'>
                  <span>{isCurrency(listing.listPrice).split('.')[0]}</span>
                </div>
                <div className='hi-price'>
                  <span>{isCurrency(listing.soldPrice) === '$0.00' ? '' : isCurrency(listing.soldPrice).split('.')[0]}</span>
                </div>
                <div className='hi-price'>
                    <span style={{ fontSize: 12, fontWeight: '500', color: '#4E9EE9', textDecorationLine: 'none', marginLeft: 10, cursor: 'pointer' }} onClick={() => alert(listing.id)}>{listing.mlsNumber}</span>
                </div>
              </div>
            );
          })}
        </div>}
    </div>
  );
};

export default PropertyHistories;