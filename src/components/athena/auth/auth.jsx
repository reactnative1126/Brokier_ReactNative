import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setVisible, setUser } from '../../../modules/redux/auth/actions';
import { setLikes } from '../../../modules/redux/lists/actions';
import { isEmpty, validateEmail, validateLength } from '../../../utils/functions';
import { setUser1, getUser, getEmail } from '../../../modules/services/AuthService';
import { getLike } from '../../../modules/services/ListingsService';

const Auth = (props) => {
	const dispatch = useDispatch();

	const [type, setType] = useState(1);
	const [email, setEmail] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorPassword, setErrorPassword] = useState('');

	const [name1, setName1] = useState('');
	const [errorName1, setErrorName1] = useState('');
	const [email1, setEmail1] = useState('');
	const [errorEmail1, setErrorEmail1] = useState('');
	const [password1, setPassword1] = useState('');
	const [errorPassword1, setErrorPassword1] = useState('');

	useEffect(() => {
		if (isEmpty(email)) {
			setErrorEmail('Please enter email');
		} else {
			if (!validateEmail(email)) {
				setErrorEmail('Invaild email, please enter correct email again');
			} else {
				setErrorEmail('');
			}
		}
		if (isEmpty(password)) {
			setErrorPassword('Please enter password');
		} else {
			if (!validateLength(password, 6)) {
				setErrorPassword('Please enter 6+ characters');
			} else {
				setErrorPassword('');
			}
		}

	}, [email, password]);

	useEffect(() => {
		if (isEmpty(name1)) {
			setErrorName1('Please enter name');
		} else {
			if (!validateLength(name1, 2)) {
				setErrorName1('Please enter 2+ characters');
			} else {
				setErrorName1('');
			}
		}
		if (isEmpty(email1)) {
			setErrorEmail1('Please enter email');
		} else {
			if (!validateEmail(email1)) {
				setErrorEmail1('Invaild email, please enter correct email again');
			} else {
				setErrorEmail1('');
			}
		}
		if (isEmpty(password1)) {
			setErrorPassword1('Please enter password');
		} else {
			if (!validateLength(password1, 6)) {
				setErrorPassword1('Please enter 6+ characters');
			} else {
				setErrorPassword1('');
			}
		}

	}, [name1, email1, password1]);

	const SIGNIN = async () => {
		if (!isEmpty(email) && !isEmpty(password) && isEmpty(errorEmail) && isEmpty(errorPassword)) {
			getUser({
				email,
				password
			}).then(async (res) => {
				if (res.count > 0) {
					dispatch(setUser(res.users[0]));
					var likes = await getLike(res.users[0].id);
					dispatch(setLikes(likes));
					if (window.homeUrl.agentId === undefined && window.homeUrl.address === undefined && window.homeUrl.mlsNumber === undefined && window.homeUrl.listingId === undefined) {
						dispatch(setVisible(false));
						return;
					} else {
						window.location.href = `/home/${window.homeUrl.agentId}/${window.homeUrl.address}/${window.homeUrl.mlsNumber}/${window.homeUrl.listingId}`;
						dispatch(setVisible(false));
						return;
					}
				} else {
					alert("User email or password is wrong.");
				}
			});
		}
	}

	const SIGNUP = async () => {
		if (!isEmpty(name1) && !isEmpty(email1) && !isEmpty(password1) && isEmpty(errorName1) && isEmpty(errorEmail1) && isEmpty(errorPassword1)) {
			getEmail(email).then(async (response) => {
				if (response.count === 0) {
					setUser1({
						unique_id: Date.now(),
						name: name1,
						email: email1,
						password: password1
					}).then(async (res) => {
						if (res.count > 0) {
							dispatch(setUser(res.users[0]));
							var likes = await getLike(res.users[0].id);
							dispatch(setLikes(likes));
							if (window.homeUrl.agentId === undefined && window.homeUrl.address === undefined && window.homeUrl.mlsNumber === undefined && window.homeUrl.listingId === undefined) {
								dispatch(setVisible(false));
								return;
							} else {
								window.location.href = `/home/${window.homeUrl.agentId}/${window.homeUrl.address}/${window.homeUrl.mlsNumber}/${window.homeUrl.listingId}`;
								dispatch(setVisible(false));
								return;
							}
						}
					})
				} else {
					alert("Email has already registed");
				}
			});
		}
	}

	return (
		props.visible ? (
			<div className='components-auth-overlay'>
				{type === 1 ? (
					<div className='components-auth-modal'>
						<button className='components-auth-close-button' onClick={() => dispatch(setVisible(false))}>
							<i className='fas fa-times-circle f-s-18'></i>
						</button>
						<span className='components-auth-title'>Sign In</span>
						<span className='components-auth-input-title'>Email</span>
						<div className='components-auth-input-wrapper'>
							<div className='components-auth-icon-wrapper'>
								<i className='far fa-envelope f-s-18'></i>
							</div>
							<input type='text' className='components-auth-input-box' onChange={(e) => setEmail(e.target.value)} />
						</div>
						<span className='components-auth-error'>{errorEmail}</span>
						<span className='components-auth-input-title'>Password</span>
						<div className='components-auth-input-wrapper'>
							<div className='components-auth-icon-wrapper'>
								<i className='fas fa-lock f-s-18'></i>
							</div>
							<input type='password' className='components-auth-input-box' onChange={(e) => setPassword(e.target.value)} />
						</div>
						<span className='components-auth-error'>{errorPassword}</span>
						<button className='components-auth-submit-button' onClick={() => SIGNIN()}>
							<span className='components-auth-submit-title'>Sign In</span>
						</button>
						<span className='components-auth-policy-text'><Link>Forgot password?</Link></span>
						<button className='components-auth-facebook-button'>
							<span className='components-auth-facebook-title'>Sign in Facebook</span>
						</button>
						<button className='components-auth-google-button'>
							<span className='components-auth-google-title'>Sign in Google</span>
						</button>
						<span className='components-auth-policy-text'>Don't have account? <Link onClick={() => {
							setType(2)
						}}>Sign up</Link></span>
					</div>
				) : (
						<div className='components-auth-modal'>
							<button className='components-auth-close-button' onClick={() => dispatch(setVisible(false))}>
								<i className='fas fa-times-circle f-s-16'></i>
							</button>
							<span className='components-auth-title'>Create Account</span>
							<span className='components-auth-input-title'>Name</span>
							<div className='components-auth-input-wrapper'>
								<div className='components-auth-icon-wrapper'>
									<i className='far fa-user-circle f-s-18'></i>
								</div>
								<input type='text' className='components-auth-input-box' onChange={(e) => setName1(e.target.value)} />
							</div>
							<span className='components-auth-error'>{errorName1}</span>
							<span className='components-auth-input-title'>Email</span>
							<div className='components-auth-input-wrapper'>
								<div className='components-auth-icon-wrapper'>
									<i className='far fa-envelope f-s-18'></i>
								</div>
								<input type='text' className='components-auth-input-box' onChange={(e) => setEmail1(e.target.value)} />
							</div>
							<span className='components-auth-error'>{errorEmail1}</span>
							<span className='components-auth-input-title'>Password</span>
							<div className='components-auth-input-wrapper'>
								<div className='components-auth-icon-wrapper'>
									<i className='fas fa-lock f-s-18'></i>
								</div>
								<input type='password' className='components-auth-input-box' onChange={(e) => setPassword1(e.target.value)} />
							</div>
							<span className='components-auth-error'>{errorPassword1}</span>
							<button className='components-auth-submit-button' onClick={() => SIGNUP()}>
								<span className='components-auth-submit-title'>Sign Up</span>
							</button>
							<span className='components-auth-policy-text'>by registering you accept <Link to="">our terms of use</Link> and <Link to="">privacy policy</Link></span>
							<button className='components-auth-facebook-button'>
								<span className='components-auth-facebook-title'>Sign in Facebook</span>
							</button>
							<button className='components-auth-google-button'>
								<span className='components-auth-google-title'>Sign in Google</span>
							</button>
							<span className='components-auth-policy-text'>Have already account? <Link to="" onClick={() => {
								setType(1)
							}}>Sign In</Link></span>
						</div>
					)}
			</div>
		) : null
	)
}

export default Auth;
