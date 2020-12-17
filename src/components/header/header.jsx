import React from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from './../../utils/functions';
import { PageSettings } from './../../constants/page-settings.js';
import { getSearch, getListingDetail } from './../../modules/services/ListingsService';
import { getPlaces, getGeometry } from './../../modules/services/MapService';

import axios from 'axios';
// import axios from './../../utils/axios.js';

// let listingCancelToken;

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = {
			collapseMegaMenu: false,
			search: '',
			listings: null,
			locations: null
		};
		this.listingCancelToken = axios.CancelToken.source();
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
		await getPlaces(search).then(result => {
			this.setState({ locations: result.predictions });
		}).catch(error => console.log(error)).finally(() => this.setState({ loading: false }));

		if (typeof this.listingCancelToken !== typeof undefined) {
			this.listingCancelToken.cancel('Operation canceled due to new request.');
		}
		this.listingCancelToken = axios.CancelToken.source();
		await getSearch(search, this.listingCancelToken).then(listings => {
			this.setState({ listings });
			console.log(listings);
		}).catch(error => console.log(error)).finally(() => this.setState({ loading: false }));
	}

	async onDetail(id) {
		var listing = await getListingDetail(id);
		// this.props.navigation.navigate('PropertiesDetail', { listing });
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

	render() {
		return (
			<PageSettings.Consumer>
				{({ toggleRightSidebar, pageTwoSidebar }) => (
					<div className='header-wrapper'>
						<div id="header" className="header navbar-default">
							<div className="navbar-header">
								<Link to="/home" className="navbar-brand"><span className='header-left-username'>Brokier</span></Link>
							</div>
							<div className="navbar-center">
								<input type='text' className='header-center-searchbox' placeholder='Search' onChange={(e) => this.autoComplete(e)} />
								{!isEmpty(this.state.search) && (
									<div className='hd-search-view'>

									</div>
								)
								}
							</div>
							<ul className="navbar-nav navbar-right" style={{ display: 'flex', justifyContent: 'center' }}>
								<li>
									<Link to="/home" className='header-right-btn'>
										<i className='far fa-map f-s-16'></i>
										<span>Find Homes</span>
									</Link>
								</li>
								<li>
									<Link to="/" className='header-right-btn'>
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
									<Link to="/" className='header-right-btn'>
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

export default Header;
