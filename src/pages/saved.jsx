import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setLoading } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { PropertyProfile, PropertyItem1, PropertyModal, PropertyImage } from '../components';
import { getFavoriteList, getLike, getListingDetail, setLike, getSearches } from '../modules/services/ListingsService';
import { isEmpty } from "../utils/functions";

const Saved = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);
	const { likes } = useSelector(state => state.lists);

	const [listings, setListings] = useState([]);
	const [searches, setSearches] = useState([]);
	const [offset, setOffset] = useState(0);
	const [visible, setVisible] = useState(false);
	const [detail, setDetail] = useState(null);
	const [imageVisible, setImageVisible] = useState(false);
	const [images, setImages] = useState([]);
	const [imageIndex, setImageIndex] = useState(0);
	const [type, setType] = useState(true);

	useEffect(() => {
		dispatch(setLoading(true));
		const getSaved = async () => {
			var listingsTemp = await getFavoriteList(user_info.id, offset);
			setListings([...listings, ...listingsTemp]);
			var likes = await getLike(user_info.id);
			dispatch(setLikes(likes));
			dispatch(setLoading(false));
			var searchesTemp = await getSearches(user_info.id);
			setSearches(searchesTemp);
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

	const onMap = (search) => {
		window.region = JSON.parse(search.region);
		window.filters = JSON.parse(search.filters);
		window.locations = search.locations;
		window.coordinates = JSON.parse(search.coordinates);
		window.description = search.description;
		document.location.href = `/home`
	}

	return (
		<div className='de-main-panel1'>
			<div className='de-wrapper1'>
				<div className='de-left-panel1'>
					<div className='sv-modal-main'>
						<div className='sv-top-panel'>
							<button className={type ? "active" : ""} onClick={() => setType(true)}>Saved Listings</button>
							<button className={!type ? "active" : ""} onClick={() => setType(false)}>Saved Searches</button>
						</div>
						{type ? (
							<div className='sv-estate-list'>
								{!isEmpty(listings) && listings.map((listing, key) => (
									<PropertyItem1
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
						) : (
								<div className='sv-searches-list'>
									{!isEmpty(searches) && searches.map((search, key) => (
										<div className='sv-search-item' onClick={() => onMap(search)}>
											<span style={{ fontSize: 12 }}>Name: {search.name}</span>
											<span style={{ fontSize: 12 }}>Location: {search.location}</span>
											<span style={{ fontSize: 12 }}>Filters: {search.description}</span>
										</div>
									))}
								</div>
							)}
					</div>
				</div>
				<div className='de-right-panel1'>
					<PropertyProfile className='de-profile' />
				</div>
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
