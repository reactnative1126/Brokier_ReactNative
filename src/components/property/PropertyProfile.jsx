import React from 'react';

const PropertyProfile = ({className}) => {
  return (
    <div className={className}>
      <span style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Ben Johnson Long Name</span>
      <img src={require('../../assets/img/athena/avatar.jpg')} className='ps-avatar'/>
      <span style={{ fontSize: 12 }}>Re-Max Realtron</span>
      <span style={{ fontSize: 12, marginBottom: 5 }}>Sales Representative</span>
      <div className='ps-buttons'>
        <button style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 30, borderWidth: 0.5, borderRadius: 3, backgroundColor: 'white' }}>
          <span style={{ fontSize: 12, }}>Call Agent</span>
        </button>
        <div style={{width: 10}} />
        <button style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 30, borderWidth: 0.5, borderRadius: 3, backgroundColor: 'white' }}>
          <span style={{ fontSize: 12, }}>Message Agent</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyProfile;