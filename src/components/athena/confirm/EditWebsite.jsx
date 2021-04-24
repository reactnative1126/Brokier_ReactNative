import React from 'react';
import { useState } from 'react';
import { isEmpty, validateLength } from '../../../utils/functions';

const EditWebsite = (props) => {

	const [website, setWebsite] = useState('');
	const [errorWebsite, setErrorWebsite] = useState('');

	const onValidateWebsite = (e) => {
		setWebsite(e.target.value);
		if (isEmpty(website)) {
			setErrorWebsite('Please enter website url');
		} else {
			if (!validateLength(website, 6)) {
				setErrorWebsite('ex: https://xxx.com');
			} else {
				setErrorWebsite('');
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
								<i className='fas fa-globe f-s-16'></i>
							</div>
							<input type='text' onChange={(e) => onValidateWebsite(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorWebsite}</span>
					</div>
					<div className='profile-edit-buttons'>
						<button className='profile-cancel-button' onClick={() => props.onCancel()}>
							<span>{props.cancel}</span>
						</button>
						<button
							className={(!isEmpty(website) && isEmpty(errorWebsite)) ? 'profile-submit-button' : 'profile-disable-button'}
							disabled={isEmpty(website) || !isEmpty(errorWebsite)}
							onClick={() => props.onSave(website)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditWebsite;
