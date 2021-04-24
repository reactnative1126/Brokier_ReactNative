import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setLoading, setUser } from '../modules/redux/auth/actions';
import { setModal } from '../modules/redux/mobile/actions';
import { updateUser } from '../modules/services/AuthService';
import { EditName, EditPhone, EditEmail } from '../components';

const Settings = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);

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

	const onEmail = (value) => {
		dispatch(setLoading(true));
		setVisible2(false);
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

	const onPhone = (value) => {
		dispatch(setLoading(true));
		setVisible3(false);
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

	return (
		<div className='profile-wrapper'>
			<div className='profile-main-panel'>
				<div className='profile-left-panel'>
					<div className='profile-header-title'>
						<button style={{ border: 'none', backgroundColor: '#E5E5E5' }} onClick={() => user_info.user_role === 'regular' ? document.location.href = `/profile` : document.location.href = `/agent-user`}>
							<i className="fas fa-chevron-left"></i>
						</button>
						<span>Account Settings</span>
						<div style={{ width: 30 }} />
					</div>
					<div className='profile-item3'>
						<div>
							<span style={{ fontWeight: 'bold', marginRight: 10 }}>Name: </span>
							<span>{user_info.user_name}</span>
						</div>
						<button className='profile-phone-button' onClick={() => setVisible1(true)}>Edit</button>
					</div>
					<div className='profile-item3'>
						<div>
							<span style={{ fontWeight: 'bold', marginRight: 10 }}>Email: </span>
							<span>{user_info.user_email}</span>
						</div>
						<button className='profile-phone-button' onClick={() => setVisible2(true)}>Edit</button>
					</div>
					<div className='profile-item3'>
						<div>
							<span style={{ fontWeight: 'bold', marginRight: 10 }}>Phone: </span>
							<span>{user_info.user_phone}</span>
						</div>
						<button className='profile-phone-button' onClick={() => setVisible3(true)}>Edit</button>
					</div>
					<div style={{display: 'flex', width: '100%', height: 500, backgroundColor: 'white'}} />
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
			<EditEmail
				visible={visible2}
				title='Change User Email'
				description='Would you change User Email?'
				label1='User Email'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible2(false)}
				onSave={(value) => onEmail(value)}
			/>
			<EditPhone
				visible={visible3}
				title='Change User Phone number'
				description='Would you change Phone number?'
				label1='Phone number'
				cancel='Discard'
				confirm='Change'
				onCancel={() => setVisible3(false)}
				onSave={(value) => onPhone(value)}
			/>
		</div>
	)
}

export default withRouter(Settings);
