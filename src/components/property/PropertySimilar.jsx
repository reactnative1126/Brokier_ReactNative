import React from 'react';

const PropertySimilar = ({ similar, similars, onSimilar }) => {
  return (
    <div index='similar' className='si-container'>
      <span className='dt-title'>Similar Listings:</span>
      <div className='si-buttons'>
        <button key="ForSale" onClick={() => onSimilar('For Sale')}
          className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'For Sale' ? 'white' : '#BBB' }}>
          <span>For Sale</span>
        </button>
        <button key="Sold" onClick={() => onSimilar('Sold')}
          className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'Sold' ? 'white' : '#BBB' }}>
          <span>Sold</span>
        </button>
        <button key="Rented" onClick={() => onSimilar('Rented')}
          className='si-button'
          style={{ width: '30%', backgroundColor: similar === 'Rented' ? 'white' : '#BBB' }}>
          <span>Rented</span>
        </button>
      </div>

      {/* <FlatList
        horizontal={true}
        // scrollEnabled={false}
        data={similars}
        renderItem={(listing) => (
          <SimilarDetail navigation={navigation} listing={listing.item} />
        )}
      /> */}
    </div>
  );
};

export default PropertySimilar;