import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { isEmpty, isCurrency } from '../../../utils/functions';
import { PageSettings } from '../../../constants/page-settings.js';
import { getSearch, getListingDetail } from '../../../modules/services/ListingsService';
import { getPlaces, getGeometry } from '../../../modules/services/MapService';
import { signOut, setVisible, setVisible1 } from '../../../modules/redux/auth/actions';
import { setLikes } from '../../../modules/redux/lists/actions';

// import axios from 'axios';
// import axios from '../../../utils/axios.js';

class MobilePopUp extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = {
			collapseMegaMenu: false,
			search: '',
			listings: null,
			locations: null
		};
	}

	toggleMegaMenu() {
		this.setState({ collapseMegaMenu: !this.state.collapseMegaMenu });
	}

	render() {
		return (
			<PageSettings.Consumer>
				{({ toggleRightSidebar, pageTwoSidebar }) => (
					<div className='mobile-popup-wrapper' onClick={() => {
						this.props.setVisible1(false)
					}}>
						<div className='mobile-popup-container' >
							<div className='mobile-popup-header'>
								<span style={{ fontSize: 20, fontWeight: 'bold', color: '#555' }}>See Brokier in...</span>
							</div>
							<div className='mobile-popup-main'>
								<div className='mobile-popup-items'>

								</div>
								<div className='mobile-popup-items'>

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
		signOut: (data) => {
			dispatch(signOut(data))
		},
		setLikes: (data) => {
			dispatch(setLikes(data));
		},
		setVisible: (data) => {
			dispatch(setVisible(data));
		},
		setVisible1: (data) => {
			dispatch(setVisible1(data));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePopUp);
