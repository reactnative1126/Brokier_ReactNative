import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut, setLoading, setUser, setVisible } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { setModal } from '../modules/redux/mobile/actions';
import { updateUser } from '../modules/services/AuthService';
import { PropertyProfile, EditPhone, EditBroker } from '../components';
import { isEmpty, generateKey } from "../utils/functions";

const Profile = (props) => {
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

	const onPhone = (value) => {
		dispatch(setLoading(true));
		setVisible1(false);
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

	const onBroker = (value1, value2) => {
		dispatch(setLoading(true));
		setVisible2(false);
		updateUser({
			user_id: user_info.id,
			unique_id: generateKey(16),
			name: user_info.user_name,
			email: user_info.user_email,
			brokerage_name: value1,
			phone: value2,
			website: user_info.user_website,
			instagram_id: user_info.user_instagram_id,
			photo: user_info.user_photo,
			role: 'agent',
			agent_unique_id: user_info.agent_unique_id
		}).then((res) => {
			dispatch(setLoading(false));
			if (res.count > 0) {
				dispatch(setUser(res.users[0]));
				document.location.href = `/agent-user`
			}
		}).catch((err) => {
			dispatch(setLoading(false));
		});
	}

	return (
		<div className='profile-wrapper'>
			<div className='profile-main-panel'>
				<div className='profile-left-panel'>
					<div className='profile-regular-title'>
						<span>{user_info.user_name}</span>
					</div>
					<div style={{height: 20}} />
					<div className='profile-contact-info'>
						<span className='profile-contact-title'>Contact Details</span>
						<div>
							<span>Email: {user_info.user_email}</span>
							<span>Phone: {user_info.user_phone} <button className='profile-phone-button' onClick={() => setVisible1(true)}>{isEmpty(user_info.user_phone) ? 'Add Phone for Text notifications' : '(Edit)'}</button></span>
						</div>
					</div>
					<div style={{height: 10}} />
					<button className='profile-item1'>
						<div>
							<i className='far fa-calendar-alt f-s-18'></i>
							<span>Selected Book a Viewing listings</span>
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
					<button className='profile-item' onClick={() => user_info.user_role == 'regular' ? setVisible2(true) : document.location.href = `/agent-user`} >
						<div>
							<i className='fas fa-user f-s-18'></i>
							<span>I'm an Agent: build profile for clients and Marketing</span>
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
			<EditPhone
				visible={visible1}
				title='Change Phone number'
				description='Would you change Phone number?'
				label1='Phone number'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible1(false)}
				onSave={(value) => onPhone(value)}
			/>
			<EditBroker
				visible={visible2}
				title='Change Agent'
				description='You should to add Brokerage name and Phone number'
				label1='Brokerage name'
				label2='Phone number'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible2(false)}
				onSave={(value1, value2) => onBroker(value1, value2)}
			/>
		</div >
	)
}

export default withRouter(Profile);
