import React from 'react';

const MarkerCircle = ({ item, borderColor, backgroundColor, onClick }) => {
	var wrapperClass = 'mk-cluster-wrapper ';
	var clusterClass = 'mk-cluster-marker ';
	if (item[0].count > 10000) {
		wrapperClass += 'wh56';
		clusterClass += 'wh48';
	} else if (item[0].count > 1000) {
		wrapperClass += 'wh50';
		clusterClass += 'wh42';
	} else if (item[0].count > 100) {
		wrapperClass += 'wh44';
		clusterClass += 'wh38';
	} else {
		wrapperClass += 'wh40';
		clusterClass += 'wh34';
	}
	return (
		<div key={item[0].id} className={wrapperClass} style={{ backgroundColor: borderColor }}>
			<div className={clusterClass} style={{ backgroundColor: backgroundColor }}>
				<span className='mk-marker-count'>{item[0].count}</span>
			</div>
		</div>
	)
}

export default MarkerCircle;
