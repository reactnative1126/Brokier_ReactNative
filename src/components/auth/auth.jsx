import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, validateEmail, validateLength } from '../../utils/functions';
import { setUser1, getUser, getEmail } from '../../modules/services/AuthService';
import { getLike } from '../../modules/services/ListingsService';
import { setLoading, setVisible, setUser } from '../../modules/redux/auth/actions';
import { setLikes } from '../../modules/redux/lists/actions';

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
			// dispatch(setLoading(true));
			await getUser({
				email,
				password
			}).then(async (res) => {
				// dispatch(setLoading(false));
				if (res.count > 0) {
					dispatch(setUser(res.users[0]));
					var likes = await getLike(res.users[0].id);
					dispatch(setLikes(likes));
					dispatch(setVisible(false));
				} else {
					alert("User email or password is wrong.");
				}
			});
		}
	}

	const SIGNUP = async () => {
		if (!isEmpty(name1) && !isEmpty(email1) && !isEmpty(password1) && isEmpty(errorName1) && isEmpty(errorEmail1) && isEmpty(errorPassword1)) {
			// dispatch(setLoading(true));
			await getEmail(email).then(async (response) => {
				if (response.count === 0) {
					await setUser1({
						name: name1,
						email: email1,
						password: password1
					}).then(async (res) => {
						// dispatch(setLoading(false));
						if (res.count > 0) {
							dispatch(setUser(res.users[0]));
							var likes = await getLike(res.users[0].id);
							dispatch(setLikes(likes));
							dispatch(setVisible(false));
						}
					})
				} else {
					// dispatch(setLoading(false));
					alert("Email has already registed");
				}
			});
		}
	}

	return (
		props.visible ? (
			<div className='loading-overlay'>
				{type === 1 ? (
					<div className='cm-auth-modal'>						
						<button style={{display: 'flex', width: '100%', border: 'none', backgroundColor: 'transparent', justifyContent: 'flex-end'}} onClick={() => dispatch(setVisible(false))}>
							<i className='fas fa-times-circle f-s-16'></i>
						</button>
						<span className='cm-auth-title'>Sign In</span>
						<span className='cm-input-title'>Email</span>
						<div className='cm-input-wrapper'>
							<div className='cm-icon-wrapper'>
								<i className='far fa-envelope f-s-18'></i>
							</div>
							<input type='text' className='cm-input-box' onChange={(e) => setEmail(e.target.value)} />
						</div>
						<span className='cm-auth-error'>{errorEmail}</span>
						<span className='cm-input-title'>Password</span>
						<div className='cm-input-wrapper'>
							<div className='cm-icon-wrapper'>
								<i className='fas fa-lock f-s-18'></i>
							</div>
							<input type='password' className='cm-input-box' onChange={(e) => setPassword(e.target.value)} />
						</div>
						<span className='cm-auth-error'>{errorPassword}</span>
						<button className='cm-submit-button' onClick={() => SIGNIN()}>
							<span className='cm-submit-title'>Sign In</span>
						</button>
						<span className='cm-policy-text'><Link>Forgot password?</Link></span>
						<button className='cm-facebook-button'>
							<span className='cm-facebook-title'>Sign in Facebook</span>
						</button>
						<button className='cm-google-button'>
							<span className='cm-google-title'>Sign in Google</span>
						</button>
						<span className='cm-policy-text'>Don't have account? <Link onClick={() => setType(2)}>Sign up</Link></span>
					</div>
				) : (
						<div className='cm-auth-modal'>					
						<button style={{display: 'flex', width: '100%', border: 'none', backgroundColor: 'transparent', justifyContent: 'flex-end'}} onClick={() => dispatch(setVisible(false))}>
							<i className='fas fa-times-circle f-s-16'></i>
						</button>
							<span className='cm-auth-title'>Create Account</span>
							<span className='cm-input-title'>Name</span>
							<div className='cm-input-wrapper'>
								<div className='cm-icon-wrapper'>
									<i className='far fa-user-circle f-s-18'></i>
								</div>
								<input type='text' className='cm-input-box' onChange={(e) => setName1(e.target.value)} />
							</div>
							<span className='cm-auth-error'>{errorName1}</span>
							<span className='cm-input-title'>Email</span>
							<div className='cm-input-wrapper'>
								<div className='cm-icon-wrapper'>
									<i className='far fa-envelope f-s-18'></i>
								</div>
								<input type='text' className='cm-input-box' onChange={(e) => setEmail1(e.target.value)} />
							</div>
							<span className='cm-auth-error'>{errorEmail1}</span>
							<span className='cm-input-title'>Password</span>
							<div className='cm-input-wrapper'>
								<div className='cm-icon-wrapper'>
									<i className='fas fa-lock f-s-18'></i>
								</div>
								<input type='password' className='cm-input-box' onChange={(e) => setPassword1(e.target.value)} />
							</div>
							<span className='cm-auth-error'>{errorPassword1}</span>
							<button className='cm-submit-button' onClick={() => SIGNUP()}>
								<span className='cm-submit-title'>Sign Up</span>
							</button>
							<span className='cm-policy-text'>by registering you accept <Link>our terms of use</Link> and <Link>privacy policy</Link></span>
							<button className='cm-facebook-button'>
								<span className='cm-facebook-title'>Sign in Facebook</span>
							</button>
							<button className='cm-google-button'>
								<span className='cm-google-title'>Sign in Google</span>
							</button>
							<span className='cm-policy-text'>Have already account? <Link onClick={() => setType(1)}>Sign In</Link></span>
						</div>
					)}
			</div>
		) : null
	)
}

export default Auth;
