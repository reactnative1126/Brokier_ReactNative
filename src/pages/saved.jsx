import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setLoading } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { PropertyProfile, PropertyItem, PropertyModal, PropertyImage } from '../components';
import { getFavoriteList, getLike, getListingDetail, setLike } from '../modules/services/ListingsService';
import { isEmpty } from "../utils/functions";

const Saved = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);
	const { likes } = useSelector(state => state.lists);

	const [listings, setListings] = useState([]);
	const [offset, setOffset] = useState(0);
	const [visible, setVisible] = useState(false);
	const [detail, setDetail] = useState(null);
	const [imageVisible, setImageVisible] = useState(false);
	const [images, setImages] = useState([]);
	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		dispatch(setLoading(true));
		const getSaved = async () => {
			var listingsTemp = await getFavoriteList(user_info.id, offset);
			setListings([...listings, ...listingsTemp]);
			var likes = await getLike(user_info.id);
			dispatch(setLikes(likes));
			dispatch(setLoading(false));
		}
		getSaved();
	}, [offset]);

	const onDetail = async (id) => {
		dispatch(setLoading(true));
		var listing = await getListingDetail(id);
		setDetail(listing);
		dispatch(setLoading(false));
		setVisible(true);
	}

	const onLike = async (id) => {
		await setLike(user_info.id, id).then((response) => {
			dispatch(setLikes(response));
		})
	}

	return (
		<div className='de-main-panel'>
			<div className='de-wrapper'>
				<div className='sv-left-panel'>
					<div className='sv-top-panel'>
						<button className="active">Saved Listings</button>
						<button>Saved Searches</button>
					</div>
					<div className='sv-estate-list'>
						{!isEmpty(listings) && listings.map((listing, key) => (
							<PropertyItem
								key={key}
								listing={listing}
								likes={likes}
								onLike={(id) => onLike(id)}
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
				{/* <div className='sv-right-panel'>
					<PropertyProfile className='de-profile' />
				</div> */}
			</div>
			<PropertyModal
				visible={visible}
				listing={detail}
				onClose={() => setVisible(false)}
				onDetail={(id) => {
					const win = window.open(`/detail/${id}`, '_blank');
					win.focus();
				}}
				onImage={(images, index) => {
					setImages(images);
					setImageIndex(index);
					setImageVisible(true);
				}}
			/>
			<PropertyImage
				visible={imageVisible}
				images={images}
				index={imageIndex}
				onClose={() => setImageVisible(false)}
			/>
		</div>
	)
}

export default withRouter(Saved);
