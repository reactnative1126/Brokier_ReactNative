import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut, setLoading, setUser } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { setModal } from '../modules/redux/mobile/actions';
import { updateUser } from '../modules/services/AuthService';
import { PropertyProfile, EditWebsite, EditInstagram } from '../components';
import { isEmpty, generateKey } from "../utils/functions";

const AgentUser = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);

	useEffect(() => {
		dispatch(setModal(false));
	}, []);

	const logOut = () => {
		dispatch(signOut());
		dispatch(setLikes([]));
		document.location.href = `/`
	}

	const onWebsite = (value) => {
		dispatch(setLoading(true));
		setVisible1(false);
		updateUser({
			user_id: user_info.id,
			unique_id: user_info.unique_id,
			name: user_info.user_name,
			email: user_info.user_email,
			brokerage_name: user_info.brokerage_name,
			phone: user_info.user_phone,
			website: value,
			instagram_id: user_info.user_instagram_id,
			photo: user_info.user_photo,
			role: user_info.user_role,
			agent_unique_id: user_info.agent_unique_id
		}).then((res) => {
			dispatch(setLoading(false));
			if (res.count > 0) {
				dispatch(setUser(res.users[0]));
			}
		}).catch((err) => {
			dispatch(setLoading(false));
		});
	}

	const onInstagram = (value) => {
		dispatch(setLoading(true));
		setVisible2(false);
		updateUser({
			user_id: user_info.id,
			unique_id: user_info.unique_id,
			name: user_info.user_name,
			email: user_info.user_email,
			brokerage_name: user_info.brokerage_name,
			phone: user_info.user_phone,
			website: user_info.user_website,
			instagram_id: value,
			photo: user_info.user_photo,
			role: user_info.user_role,
			agent_unique_id: user_info.agent_unique_id
		}).then((res) => {
			dispatch(setLoading(false));
			if (res.count > 0) {
				dispatch(setUser(res.users[0]));
			}
		}).catch((err) => {
			dispatch(setLoading(false));
		});
	}

	return (
		<div className='profile-wrapper'>
			<div className='profile-main-panel'>
				<div className='profile-left-panel'>
					<div className='profile-header-title'>
						<div className='profile-agent-title'>
							<div>
								<span>{user_info.user_name} Agent <button className='profile-link-button' onClick={() => document.location.href = `/agent-view`}>VIEW PROFILE</button></span>
							</div>
							<div>
								<span style={{ fontSize: 12, fontWeight: 'normal' }}>{user_info.brokerage_name}: Broerage <button className='profile-link-button' onClick={() => document.location.href = `/agent-edit`}>(Edit)</button></span>
							</div>
						</div>
					</div>
					<div className='profile-linking'>
						<span>Share your unique Brokier Profile Link and new users using your link to download this app will become your connections. Your connections will see your image on listings and all book a viewing requests are ONLY sent to you.</span>
						<div className='profile-link-wrapper'>
							<button className='profile-share-link'>Share My Unique Link</button>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Contact Details:</span>
						<div>
							<span>Phone: {user_info.user_phone}</span>
							<span>Email: {user_info.user_email}</span>
							<span>Website: {user_info.user_website} <button className='profile-phone-button' onClick={() => setVisible1(true)}>{isEmpty(user_info.user_website) ? '(Add)' : '(Edit)'}</button></span>
							<span>Instagram: {user_info.user_instagram_id} <button className='profile-phone-button' onClick={() => setVisible2(true)}>{isEmpty(user_info.user_instagram_id) ? '(Add)' : '(Edit)'}</button></span>
						</div>
					</div>
					<div className='profile-contact-info' style={{ marginTop: 0 }}>
						<span className='profile-contact-title'>Marketing Profile:</span>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Listing Service offerings:</span>
						<div>
							<span>1% full service listings with free staging consultation, 3D virtual Tours. <button className='profile-phone-button'>(Edit)</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Buyer Service offerings:</span>
						<div>
							<span>Offers 50% of agents commission as cash back <button className='profile-phone-button'>(Edit)</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Area of specialty:</span>
						<div>
							<span>Chesterfield and Surounding areas <button className='profile-phone-button'>(Edit)</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Designations:</span>
						<div>
							<span><button className='profile-phone-button'>Add Designations to stand out</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Awards and Achievements:</span>
						<div>
							<span>#1 agent in remax office 2017, 2018 <button className='profile-phone-button'>(Edit)</button></span>
						</div>
					</div>

					<button className='profile-item1'>
						<div>
							<i className='far fa-edit f-s-18'></i>
							<span>Edit Profile and Marketing Details</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<button className='profile-item' onClick={() => document.location.href = `/saved`}>
						<div>
							<i className='fas fa-search f-s-18'></i>
							<span>Saved Searched</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<button className='profile-item' onClick={() => document.location.href = `/saved`}>
						<div>
							<i className='fas fa-heart f-s-18'></i>
							<span>Saved Listings</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<button className='profile-item' onClick={() => document.location.href = `/referred`}>
						<div>
							<i className='fas fa-users f-s-18'></i>
							<span>Referred Connections</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<button className='profile-item' onClick={() => document.location.href = `/settings`}>
						<div>
							<i className='fas fa-cog f-s-18'></i>
							<span>Settings and Password</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<button className='profile-item' onClick={() => logOut()}>
						<div>
							<i className='fas fa-sign-out-alt f-s-18'></i>
							<span>Log Out</span>
						</div>
						<i className="fas fa-chevron-right"></i>
					</button>
					<div style={{display: 'flex', width: '100%', height: 300, backgroundColor: 'white'}} />
				</div>
				<div className='detail-right-panel'>
					{/* <PropertyProfile className='detail-profile' /> */}
				</div>
			</div>
			<EditWebsite
				visible={visible1}
				title='Change Website'
				description='Would you change Website?'
				label1='Website URL'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible1(false)}
				onSave={(value) => onWebsite(value)}
			/>
			<EditInstagram
				visible={visible2}
				title='Change Instagram Id'
				description='Would you change Instagram Id?'
				label1='Instagram Id'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible2(false)}
				onSave={(value) => onInstagram(value)}
			/>
		</div >
	)
}

export default withRouter(AgentUser);
