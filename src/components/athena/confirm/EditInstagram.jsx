import React from 'react';
import { useState } from 'react';
import { isEmpty, validateLength } from '../../../utils/functions';

const EditInstagram = (props) => {

	const [instagram, setInstagram] = useState('');
	const [errorInstagram, setErrorInstagram] = useState('');

	const onValidateInstagram = (e) => {
		setInstagram(e.target.value);
		if (isEmpty(instagram)) {
			setErrorInstagram('Please enter instagram id');
		} else {
			if (!validateLength(instagram, 2)) {
				setErrorInstagram('Please enter 2+ characters');
			} else {
				setErrorInstagram('');
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
								<i className='fab fa-instagram f-s-16'></i>
							</div>
							<input type='text' onChange={(e) => onValidateInstagram(e)} />
						</div>
						<span className='profile-edit-input-error'>{errorInstagram}</span>
					</div>
					<div className='profile-edit-buttons'>
						<button className='profile-cancel-button' onClick={() => props.onCancel()}>
							<span>{props.cancel}</span>
						</button>
						<button
							className={(!isEmpty(instagram) && isEmpty(errorInstagram)) ? 'profile-submit-button' : 'profile-disable-button'}
							disabled={isEmpty(instagram) || !isEmpty(errorInstagram)}
							onClick={() => props.onSave(instagram)}>
							<span>{props.confirm}</span>
						</button>
					</div>
				</div>
			</div>
		) : null
	)
}

export default EditInstagram;
