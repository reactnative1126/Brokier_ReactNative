import React from 'react';

import { connect } from "react-redux";
import { PageSettings } from '../../../constants/page-settings.js';
import { signOut, setVisible } from '../../../modules/redux/auth/actions';
import { setModal } from '../../../modules/redux/mobile/actions';
import { setLikes } from '../../../modules/redux/lists/actions';

class MobilePopUp extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = {
			collapseMegaMenu: false,
		};
	}

	toggleMegaMenu() {
		this.setState({ collapseMegaMenu: !this.state.collapseMegaMenu });
	}

	render() {
		return (
			<PageSettings.Consumer>
				{({ toggleRightSidebar, pageTwoSidebar }) => (
					<div>
						<div className='mobile-popup-wrapper' onClick={() => this.props.setModal(false)}></div>
						<div className='mobile-popup-container' >
							<div className='mobile-popup-header'>
								<span style={{ fontSize: 20, fontWeight: 'bold', color: '#555' }}>See Brokier in...</span>
							</div>
							<div className='mobile-popup-main'>
								<div className='mobile-popup-items'>
									<span style={{ fontSize: 20, fontWeight: '700', color: 'grey' }}>Brokier App</span>
									<button className='mobile-popup-open' onClick={() => {
										window.location.href = `brokier://path/into/app?agentId=${window.homeUrl.agentId}&address=${window.homeUrl.address}&mlsNumber=${window.homeUrl.mlsNumber}&listingId=${window.homeUrl.listingId}`
									}}>
										<span style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>OPEN</span>
									</button>
								</div>
								<div className='mobile-popup-items'>
									<span style={{ fontSize: 20, fontWeight: '700', color: 'grey' }}>Brokier Web</span>
									<button className='mobile-popup-open' onClick={() => this.props.setModal(false)}>
										<span style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>CONTINUE</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</PageSettings.Consumer>
		)
	}
}

const mapStateToProps = state => {
	return {
		logged: state.auth.logged
	}
}
const mapDispatchToProps = dispatch => {
	return {
		signOut: (data) => dispatch(signOut(data)),
		setLikes: (data) => dispatch(setLikes(data)),
		setVisible: (data) => dispatch(setVisible(data)),
		setModal: (data) => dispatch(setModal(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePopUp);
