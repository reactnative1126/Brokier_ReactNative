import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut, setLoading, setUser } from '../modules/redux/auth/actions';
import { setLikes } from '../modules/redux/lists/actions';
import { setModal } from '../modules/redux/mobile/actions';
import { getReferral } from '../modules/services/AuthService';
import { PropertyProfile, EditWebsite, EditInstagram } from '../components';
import { isEmpty, generateKey } from "../utils/functions";

const Referred = (props) => {
	const dispatch = useDispatch();
	const { user_info } = useSelector(state => state.auth);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		dispatch(setModal(false));
		dispatch(setLoading(true));
		getReferral({
			uniqueId: user_info.unique_id
		}).then((res) => {
			dispatch(setLoading(false));
			if (res.count > 0) {
				setUsers(res.users);
			}
		}).catch((err) => {
			dispatch(setLoading(false));
		});
	}, []);

	return (
		<div className='profile-wrapper'>
			<div className='profile-main-panel'>
				<div className='profile-left-panel'>
					<div className='profile-header-title'>
						<button style={{ border: 'none', backgroundColor: '#E5E5E5' }} onClick={() => document.location.href = `/agent-user`}>
							<i className="fas fa-chevron-left"></i>
						</button>
						<span>Connected Users</span>
						<div style={{ width: 30 }} />
					</div>
					{users.map((item, key) => (
						<div className='referred-item'>
							<div className='referred-name-part'>
								<span><b>{item.user_name}</b></span>
								<span>{item.user_email}</span>
							</div>
							<button className='referred-viewing-part' onClick={() => document.location.href = `/viewings/${item.id}/${item.user_name}/${item.agent_unique_id}`}>
								<i className="fas fa-calendar-alt"></i>
								<span>Booked Viewings</span>
								<div style={{ width: 5 }} />
							</button>
						</div>
					))}
					<div style={{ display: 'flex', width: '100%', height: 500, backgroundColor: 'white' }} />
				</div>
				<div className='detail-right-panel'>
					{/* <PropertyProfile className='detail-profile' /> */}
				</div>
			</div>
		</div >
	)
}

export default withRouter(Referred);
