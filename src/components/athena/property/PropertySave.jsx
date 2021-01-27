import React, { useState, Fragment } from "react";

import 'rc-slider/assets/index.css';

const PropertySave = (props) => {
  const [name, setName] = useState('');

  return (
    <Fragment>
      <div className='property-save-search-wrapper' onClick={() => props.onClose()} />
      <div id='save-container' className='property-save-search-container'>
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ marginTop: 10 }}>
            <div index={12} className='property-save-search-card'>
              <div className='property-save-search-box'>
                <span style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, backgroundColor: '#eee' }}>Save search</span>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 'bold' }}>Name<span style={{ color: 'red' }}>*</span>:</span>
                  <input type='text' className='property-save-search-input' placeholder='Enter search name' onChange={(e) => setName(e.target.value)} />
                </div>

                <div style={{ marginTop: 15, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 'bold' }}>Location: </span>
                  <span className='property-save-search-right'>{window.locations}</span>
                </div>
                <div style={{ marginTop: 15, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Current map filters: </span>
                </div>
                <div style={{ marginTop: 5, width: '100%' }}>
                  <span style={{ color: 'blue', fontSize: 16 }}>{window.description}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='property-save-search-bottom-buttons'>
          <button className='property-save-search-clear-button' onClick={() => props.onClose()}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>CANCEL</span>
          </button>
          <button className='property-save-search-apply-button' onClick={() => props.onSave(name)}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SAVE SEARCH</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default PropertySave;