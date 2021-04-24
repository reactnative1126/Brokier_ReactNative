import React from 'react';

const Confirm = (props) => {
	return (
		props.visible ? (
			<div className='components-confirm-overlay'>
				<div className='components-confirm-wrapper'>
					<div className='components-confirm-title'>
						<span>{props.title}</span>
					</div>
					<div className='components-confirm-description'>
						<span>{props.description}</span>
					</div>
					{(props.action === 3 || props.action === 7) ? (
						<div className='components-confirm-buttons1'>
							<button className='components-confirm-button1' onClick={() => props.onConfirm()}>
								<span>{props.confirm}</span>
							</button>
							<button className='components-cancel-button1' onClick={() => props.onCancel()}>
								<span>{props.cancel}</span>
							</button>
						</div>
					) : (
							<div className='components-confirm-buttons'>
								{props.cancel !== '' && (
									<button className='components-cancel-button' onClick={() => props.onCancel()}>
										<span>{props.cancel}</span>
									</button>
								)}
								<button className={props.cancel !== '' ? 'components-confirm-button' : 'components-ok-button'} onClick={() => props.onConfirm()}>
									<span>{props.confirm}</span>
								</button>
							</div>
						)}
				</div>
			</div>
		) : null
	)
}

export default Confirm;
