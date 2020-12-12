import React from 'react';

import { SimilarDetail } from '../../components';

const PropertySimilar = ({ similar, similars, onSimilar, onDetail }) => {
  return (
    <div key='similar1' className='si-container'>
      <span className='dt-title'>Similar Listings:</span>
      <div className='si-buttons'>
        <button key="ForSale" onClick={() => onSimilar('For Sale')} className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'For Sale' ? 'white' : '#BBB' }}>
          <span>For Sale</span>
        </button>
        <button key="Sold" onClick={() => onSimilar('Sold')} className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'Sold' ? 'white' : '#BBB' }}>
          <span>Sold</span>
        </button>
        <button key="Rented" onClick={() => onSimilar('Rented')} className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'Rented' ? 'white' : '#BBB' }}>
          <span>Rented</span>
        </button>
      </div>

      <div className='si-scrollview'>
        {similars.map((listing, key) => (
          <SimilarDetail listing={listing} index={key} onClick={(id)=>onDetail(id)} />
        ))}
      </div>
    </div>
  );
};

export default PropertySimilar;