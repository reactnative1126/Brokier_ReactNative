import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { setLoading } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { PropertyProfile, PropertyItem } from '../components';
import { getFavoriteList, getLike, getListingDetail, getDetailHistories, getDetailSimilars, getDetailRooms } from '../modules/services/ListingsService';
import { isEmpty } from "../utils/functions";
import configs from "../constants/configs";

const Saved = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);
	const { likes } = useSelector(state => state.lists);

	const [listings, setListings] = useState([]);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		dispatch(setLoading(true));
		try {
			var listingsTemp = getFavoriteList(user_info.id, offset);
			// alert(JSON.stringify(listingsTemp))
			var likes = getLike(user_info.id);
			dispatch(setLikes(likes));
			setListings([...listings, ...listingsTemp]);
			setOffset(offset + 1);
			console.log('......', listings);
		} catch (error) {
			console.log(error.message);
		} finally {
			dispatch(setLoading(false));
		}
	}, [offset]);

	const onDetail = () => {

	}

	return (
		<div className='de-main-panel'>
			<div className='de-wrapper'>
				<div className='de-left-panel'>
					<div className='de-modal-main'>
						<div className='pr-modal-image-container'>

							<div className='hm-right-panel'>
								<div className='hm-estate-list'>
									{!isEmpty(listings) && listings.map((listing, key) => (
										<PropertyItem
											key={key}
											listing={listing}
											likes={likes}
											onClick={(item) => onDetail(item.id)}
										/>
									))}
									{!isEmpty(listings) && (
										<div className='hm-load-more-wrapper'>
											<button className='hm-load-more-button' onClick={() => {
												setOffset(offset + 1);
												dispatch(setLoading(true));
											}}><span>Load more</span></button>
										</div>)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='de-right-panel'>
					<PropertyProfile className='de-profile' />
				</div>
			</div>
		</div>
	)
}

export default withRouter(Saved);
