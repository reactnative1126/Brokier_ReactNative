import React from 'react';
import { useState } from 'react';
import { isEmpty, validateMobile, validateLength } from '../../../utils/functions';

const EditBroker = (props) => {

	const [broker, setBroker] = useState('');
	const [errorBroker, setErrorBroker] = useState('');
	const [phone, setPhone] = useState('');
	const [errorPhone, setErrorPhone] = useState('');


	const onValidateBroker = (e) => {
		setBroker(e.target.value);
		if (isEmpty(broker)) {
			setErrorBroker('Please enter brokerage name');
		} else {
			if (!validateLength(broker, 2)) {
				setErrorBroker('Please enter 2+ characters');
			} else {
				setErrorBroker('');
			}
		}
	}

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
								<i className='fas fa-user f-s-16'></i>
							</div>
							<input type='text' onChange={(e) => onValidateBroker(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorBroker}</span>
					</div>
					<div className='profile-edit-input-container'>
						<span>{props.label2}</span>
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
							className={(!isEmpty(broker) && !isEmpty(phone) && isEmpty(errorBroker) && isEmpty(errorPhone)) ? 'profile-submit-button' : 'profile-disable-button'}
							disabled={isEmpty(broker) || isEmpty(phone) || !isEmpty(errorBroker) || !isEmpty(errorPhone)}
							onClick={() => props.onSave(broker, phone)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditBroker;
