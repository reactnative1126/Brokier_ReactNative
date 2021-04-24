import React from 'react';
import { useState } from 'react';
import { isEmpty, validateEmail } from '../../../utils/functions';

const EditEmail = (props) => {

	const [email, setEmail] = useState('');
	const [errorEmail, setErrorEmail] = useState('');

	const onValidateEmail = (e) => {
		setEmail(e.target.value);
		if (isEmpty(email)) {
			setErrorEmail('Please enter email');
		} else {
			if (!validateEmail(email)) {
				setErrorEmail('Please enter correct email');
			} else {
				setErrorEmail('');
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
								<i className='fas fa-envelope f-s-16'></i>
							</div>
							<input type='text' onChange={(e) => onValidateEmail(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorEmail}</span>
					</div>
					<div className='profile-edit-buttons'>
						<button className='profile-cancel-button' onClick={() => props.onCancel()}>
							<span>{props.cancel}</span>
						</button>
						<button 
						className={(!isEmpty(email) && isEmpty(errorEmail)) ? 'profile-submit-button' : 'profile-disable-button'} 
						disabled={isEmpty(email) || !isEmpty(errorEmail)}
						onClick={() => props.onSave(email)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditEmail;
