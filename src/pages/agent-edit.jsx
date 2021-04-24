import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut, setLoading, setUser } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { setModal } from '../modules/redux/mobile/actions';
import { updateUser } from '../modules/services/AuthService';
import { PropertyProfile, EditName, EditEmail, EditPhone, EditWebsite, EditInstagram } from '../components';
import { isEmpty, generateKey } from "../utils/functions";

const AgentEdit = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);

	useEffect(() => {
		dispatch(setModal(false));
	}, []);

	const onName = (value) => {
		dispatch(setLoading(true));
		setVisible1(false);
		updateUser({
			user_id: user_info.id,
			unique_id: user_info.unique_id,
			name: value,
			email: user_info.user_email,
			brokerage_name: user_info.brokerage_name,
			phone: user_info.user_phone,
			website: user_info.user_website,
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

	const onPhone = (value) => {
		dispatch(setLoading(true));
		setVisible2(false);
		updateUser({
			user_id: user_info.id,
			unique_id: user_info.unique_id,
			name: user_info.user_name,
			email: user_info.user_email,
			brokerage_name: user_info.brokerage_name,
			phone: value,
			website: user_info.user_website,
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

	const onEmail = (value) => {
		dispatch(setLoading(true));
		setVisible3(false);
		updateUser({
			user_id: user_info.id,
			unique_id: user_info.unique_id,
			name: user_info.user_name,
			email: value,
			brokerage_name: user_info.brokerage_name,
			phone: user_info.user_phone,
			website: user_info.user_website,
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
	const onWebsite = (value) => {
		dispatch(setLoading(true));
		setVisible4(false);
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
		setVisible5(false);
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
						<button style={{ border: 'none', backgroundColor: '#E5E5E5' }} onClick={() => document.location.href = `/agent-user`}>
							<i className="fas fa-chevron-left"></i>
						</button>
						<span>Edit Agent Profile</span>
						<div style={{ width: 30 }} />
					</div>
						<div style={{ height: 20 }} />
					<div className='profile-contact-info'>
						<span className='profile-contact-title'><h3>Name:</h3></span>
						<span className='profile-contact-title'><h3>{user_info.user_name} Agent</h3></span>
						<div style={{height: 5}} />
						<div>
							<span><b>Brokerage Name:</b></span>
							<span>{user_info.user_name} <button className='profile-phone-button' onClick={() => setVisible1(true)}>(Edit)</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Contact Details:</span>
						<div>
							<span>Phone: {user_info.user_phone} <button className='profile-phone-button' onClick={() => setVisible2(true)}>{isEmpty(user_info.user_phone) ? '(Add)' : '(Edit)'}</button></span>
							<span>Email: {user_info.user_email} <button className='profile-phone-button' onClick={() => setVisible3(true)}>{isEmpty(user_info.user_email) ? '(Add)' : '(Edit)'}</button></span>
							<span>Website: {user_info.user_website} <button className='profile-phone-button' onClick={() => setVisible4(true)}>{isEmpty(user_info.user_website) ? '(Add)' : '(Edit)'}</button></span>
							<span>Instagram: {user_info.user_instagram_id} <button className='profile-phone-button' onClick={() => setVisible5(true)}>{isEmpty(user_info.user_instagram_id) ? '(Add)' : '(Edit)'}</button></span>
						</div>
					</div>
					<div className='profile-contact-info'>
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

					<div style={{display: 'flex', width: '100%', height: 300, backgroundColor: 'white'}} />
				</div>
				<div className='detail-right-panel'>
					{/* <PropertyProfile className='detail-profile' /> */}
				</div>
			</div>
			<EditName
				visible={visible1}
				title='Change User Name'
				description='Would you change User Name?'
				label1='User Name'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible1(false)}
				onSave={(value) => onName(value)}
			/>
			<EditPhone
				visible={visible2}
				title='Change User Phone number'
				description='Would you change Phone number?'
				label1='Phone number'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible2(false)}
				onSave={(value) => onPhone(value)}
			/>
			<EditEmail
				visible={visible3}
				title='Change User Email'
				description='Would you change User Email?'
				label1='User Email'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible3(false)}
				onSave={(value) => onEmail(value)}
			/>
			<EditWebsite
				visible={visible4}
				title='Change Website'
				description='Would you change Website?'
				label1='Website URL'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible4(false)}
				onSave={(value) => onWebsite(value)}
			/>
			<EditInstagram
				visible={visible5}
				title='Change Instagram Id'
				description='Would you change Instagram Id?'
				label1='Instagram Id'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible5(false)}
				onSave={(value) => onInstagram(value)}
			/>
		</div >
	)
}

export default withRouter(AgentEdit);
