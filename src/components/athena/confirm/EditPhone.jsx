import React from 'react';
import { useState } from 'react';
import { isEmpty, validateMobile } from '../../../utils/functions';

const EditPhone = (props) => {

	const [phone, setPhone] = useState('');
	const [errorPhone, setErrorPhone] = useState('');

	const onValidatePhone = (e) => {
		setPhone(e.target.value);
		if (isEmpty(phone)) {
			setErrorPhone('Please enter phone number');
		} else {
			if (!validateMobile(phone)) {
				setErrorPhone('Please enter correct number');
			} else {
				setErrorPhone('');
			}
		}
	}

	return (
		props.visible ? (
			<div className='profile-edit-overlay'>
				<div className='profile-edit-wrapper'>
					<div className='profile-edit-title'>
						<span>{props.title}</span>
					</div>
					<div className='profile-edit-description'>
						<span>{props.description}</span>
					</div>
					<div className='profile-edit-input-container'>
						<span>{props.label1}</span>
						<div>
							<div>
								<i className='fas fa-phone-alt f-s-16'></i>
							</div>
							<input type='text' onChange={(e) => onValidatePhone(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorPhone}</span>
					</div>
					<div className='profile-edit-buttons'>
						<button className='profile-cancel-button' onClick={() => props.onCancel()}>
							<span>{props.cancel}</span>
						</button>
						<button 
						className={(!isEmpty(phone) && isEmpty(errorPhone)) ? 'profile-submit-button' : 'profile-disable-button'} 
						disabled={isEmpty(phone) || !isEmpty(errorPhone)}
						onClick={() => props.onSave(phone)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditPhone;
