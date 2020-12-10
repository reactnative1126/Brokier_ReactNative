import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = (props) => {
	return (
		props.loading ? (
			<div className='loading-overlay'>
				<Loader
					type='ThreeDots'
					color='white'
					width={50}
					height={50}
				/>
			</div>
		) : null
	)
}

export default Loading;
