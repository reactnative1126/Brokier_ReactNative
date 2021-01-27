import React from 'react';

import { isNumber } from '../../../utils/functions';
const MarkerMain = ({ item, details, onClick }) => {
    var markerName = 'marker-main-wrapper ';
    var triangleName = 'marker-main-triangle ';

    if (details.length > 0 && item[0].id === window.details[0].id) {
        markerName += 'bb1';
        triangleName += 'br1';
    } else if (item[0].status === 'A' && item[0].type === 'Sale') {
        markerName += 'bb2';
        triangleName += 'br2';
    } else if (item[0].status === 'U' && item[0].lastStatus === 'Sld') {
        markerName += 'bb3';
        triangleName += 'br3';
    } else if (item[0].status === 'A' && item[0].type === 'Lease') {
        markerName += 'bb4';
        triangleName += 'br4';
    } else if (item[0].status === 'U' && item[0].lastStatus === 'Lsd') {
        markerName += 'bb5';
        triangleName += 'br5';
    }

    return (
        <div key={item[0].id} className='marker-main-default' onClick={onClick}>
            <div className={markerName}>
                <span className='marker-count'>{item.length > 1 ? `${item.length}Units` : isNumber(parseFloat(item[0].listPrice))}</span>
            </div>
            <div className={triangleName} />
        </div>
    )
}

export default MarkerMain;
