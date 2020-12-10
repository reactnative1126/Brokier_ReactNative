import React from 'react';
import { isEmpty, isCurrency, mortgageCalc } from '../../utils/functions';

const InterestRate = 2.5;
const LengthOfLoan = 25;

const PropertyPrices = ({ listing }) => {
  return (
    <div index={listing.id} className='ps-container'>
      <div className='ps-wrapper'>
        <div style={{ width: "65%" }}>
          <div style={{ flexDirection: "row", width: '100%', alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 'bold', width: '70%' }}>Total Monthly expenses</span>
            <span style={{ width: '30%', fontSize: 18, textAlign: 'right', fontWeight: "500", marginRight: 5 }} >
              {!isEmpty(listing.monthlyExpenses) && isCurrency(listing.monthlyExpenses)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: "row", width: '100%', alignItems: "center", marginTop: 5 }}>
            <span style={{ fontSize: 12, width: "70%" }}>Mortgate Payments</span>
            <span style={{ fontSize: 12, width: "30%", textAlign: "right" }}>
              {!isEmpty(mortgageCalc(parseFloat(listing.listPrice), InterestRate, LengthOfLoan)) && isCurrency(mortgageCalc(parseFloat(listing.listPrice), InterestRate, LengthOfLoan))}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: "row", width: '100%', alignItems: "center", marginTop: 5 }}>
            <span style={{ fontSize: 12, width: "70%" }}>Property</span>
            <span style={{ fontSize: 12, width: "30%", textAlign: "right" }}>{!isEmpty(listing.propertyTaxes) && isCurrency(listing.propertyTaxes)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: "row", width: '100%', alignItems: "center", marginTop: 5 }}>
            <span style={{ fontSize: 12, width: "70%" }}>Maintenance Fees</span>
            <span style={{ fontSize: 12, width: "30%", textAlign: "right" }}>{!isEmpty(listing.maintenanceFees) && isCurrency(listing.maintenanceFees)}</span>
          </div>
        </div>

        <div className='mortage-rate'>
          <span style={{ fontSize: 20, fontWeight: "300", marginRight: 5 }}>{"2.5"}%</span>
          <span style={{ fontSize: 8, textAlign: 'center' }}>View Mortgage rates and Ienders</span>
        </div>
      </div>

      <div className='hi-top-button'>
        <button className='hi-one-button'>
          <span>Edit Payment Calculator</span>
        </button>
        <button className='hi-one-button'>
          <span>Get Pre-Qualified for Mortgage</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyPrices;