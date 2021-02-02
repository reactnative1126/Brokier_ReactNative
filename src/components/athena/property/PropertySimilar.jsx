import React from 'react';

import { SimilarDetail } from '../../../components';

const PropertySimilar = ({ similar, similars, onSimilar, onDetail }) => {
  return (
    <div key='similar1' className='property-similar-container'>
      <span className='property-similar-title'>Similar Listings:</span>
      <div className='property-similar-buttons'>
        <button key="ForSale" onClick={() => onSimilar('For Sale')} className='property-similar-button'
          style={{ width: '30%', backgroundColor: similar === 'For Sale' ? 'white' : '#BBB' }}>
          <span>For Sale</span>
        </button>
        <button key="Sold" onClick={() => onSimilar('Sold')} className='property-similar-button'
          style={{ width: '30%', backgroundColor: similar === 'Sold' ? 'white' : '#BBB' }}>
          <span>Sold</span>
        </button>
        <button key="Rented" onClick={() => onSimilar('Rented')} className='property-similar-button'
          style={{ width: '30%', backgroundColor: similar === 'Rented' ? 'white' : '#BBB' }}>
          <span>Rented</span>
        </button>
      </div>

      <div className='property-similar-scrollview'>
        {similars.map((listing, key) => (
          <SimilarDetail key={key} listing={listing} index={key} onClick={(id, streetNumber, streetName, streetSuffix)=>onDetail(id, streetNumber, streetName, streetSuffix)} />
        ))}
      </div>
    </div>
  );
};

export default PropertySimilar;