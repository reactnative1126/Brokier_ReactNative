import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { isEmpty, isCurrency } from '../../utils/functions';
import { PageSettings } from '../../constants/page-settings.js';
import { getSearch, getListingDetail } from '../../modules/services/ListingsService';
import { getPlaces, getGeometry } from '../../modules/services/MapService';
import { signOut, setVisible } from '../../modules/redux/auth/actions';
import { setLikes } from '../../modules/redux/lists/actions';

// import axios from 'axios';
// import axios from './../../utils/axios.js';

class MobileTab extends React.Component {
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

	autoComplete(e) {
		e.persist();
		this.setState({ search: e.target.value });
		this.searchResult(e.target.value);
	}

	async searchResult(search) {
		// await getPlaces(search).then(result => {
		// 	this.setState({ locations: result.predictions });
		// }).catch(error => console.log(error)).finally(() => this.setState({ loading: false }));
		await getSearch(search).then(listings => {
			this.setState({ listings });
		}).catch(error => console.log(error)).finally(() => this.setState({ loading: false }));
	}

	async onMap(address) {
		await getGeometry(address.replace(/ /g, '+')).then(result => {
			var region = result.results[0];
			// window.region = {
			// 	latitude: region.geometry.location.lat,
			// 	longitude: region.geometry.location.lng,
			// 	latitudeDelta: configs.latitudeDelta,
			// 	longitudeDelta: configs.longitudeDelta
			// }
		}).catch(error => console.log(error)).finally(() => this.setState({ loading: false }));
	}

	signOut() {
		this.props.signOut();
		this.props.setLikes([]);
	}

	render() {
		return (
			<PageSettings.Consumer>
				{({ toggleRightSidebar, pageTwoSidebar }) => (
					<div className='header-wrapper mb-tab'>
						<div id="header" className="header navbar-default">
							<ul className="navbar-nav navbar-right" style={{ display: 'flex', justifyContent: 'center' }}>
								<li>
									<Link to="/home" className='header-right-btn'>
										<i className='far fa-map f-s-16'></i>
										<span>Find Homes</span>
									</Link>
								</li>
								<li>
									<Link to="" className='header-right-btn' onClick={() => this.props.logged ? document.location.href = `/saved` : this.props.setVisible(true)}>
										<i className='far fa-heart f-s-16'></i>
										<span>Saved</span>
									</Link>
								</li>
								<li>
									<Link to="/" className='header-right-btn'>
										<i className='fas fa-dollar-sign f-s-16'></i>
										<span>Mortgage</span>
									</Link>
								</li>
								<li>
									<Link to="/" className='header-right-btn'>
										<i className='fas fa-chart-bar f-s-16'></i>
										<span>Market stats</span>
									</Link>
								</li>
								<li>
									<Link to="" className='header-right-btn' onClick={() => this.props.logged ? this.signOut() : this.props.setVisible(true)}>
										<i className='far fa-user f-s-16'></i>
										<span>Profile</span>
									</Link>
								</li>
							</ul>
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTab);
