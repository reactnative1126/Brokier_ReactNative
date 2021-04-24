import React from 'react';
import { useState } from 'react';
import { isEmpty, validateLength } from '../../../utils/functions';

const EditName = (props) => {

	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState('');

	const onValidateName = (e) => {
		setName(e.target.value);
		if (isEmpty(name)) {
			setErrorName('Please enter user name');
		} else {
			if (!validateLength(name, 2)) {
				setErrorName('Please enter 2+ characters');
			} else {
				setErrorName('');
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
							<input type='text' onChange={(e) => onValidateName(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorName}</span>
					</div>
					<div className='profile-edit-buttons'>
						<button className='profile-cancel-button' onClick={() => props.onCancel()}>
							<span>{props.cancel}</span>
						</button>
						<button 
						className={(!isEmpty(name) && isEmpty(errorName)) ? 'profile-submit-button' : 'profile-disable-button'} 
						disabled={isEmpty(name) || !isEmpty(errorName)}
						onClick={() => props.onSave(name)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditName;
