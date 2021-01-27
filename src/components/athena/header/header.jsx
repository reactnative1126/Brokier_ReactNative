import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { signOut, setVisible } from '../../../modules/redux/auth/actions';
import { setLikes, setTabs } from '../../../modules/redux/lists/actions';
import { PageSettings } from '../../../constants/page-settings.js';
import { isEmpty, isCurrency } from '../../../utils/functions';
import { getSearch, getListingDetail } from '../../../modules/services/ListingsService';
import { getPlaces, getGeometry } from '../../../modules/services/MapService';

// import axios from 'axios';
// import axios from '../../../utils/axios.js';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = {
			collapseMegaMenu: false,
			search: '',
			listings: null,
			locations: null,
			tab: true
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
					<div className='components-header-wrapper'>
						<div id="header" className="header navbar-default">
							<div className="navbar-header">
								<Link to="/" className="navbar-brand"><span className='components-header-left-username'>Brokier</span></Link>
							</div>
							<div className="components-header-center">
								<input type='text' className='components-header-search-input' placeholder='Search' onChange={(e) => this.autoComplete(e)} />
								{!isEmpty(this.state.search) && (
									!isEmpty(this.state.listings) ? (
										<div className='components-header-search-result'>
											<div style={{ width: '100%' }}>
												<div style={{ fontWeight: 'bold', padding: 10 }}>Listings</div>
												{!isEmpty(this.state.listings) && this.state.listings.map((listing, key) => {
													return (
														<div key={key} className='components-header-search-item' onClick={() => document.location.href = `/detail/${listing.id}`}>
															<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
																<span style={{ fontWeight: 'bold' }}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix}</span>
																<div style={{ width: 80, alignItems: 'center' }}>
																	<div style={{ color: listing.lastStatus === 'Sus' ? 'black' : listing.lastStatus === 'Exp' ? 'black' : listing.lastStatus === 'Sld' ? 'red' : listing.lastStatus === 'Ter' ? 'black' : listing.lastStatus === 'Dft' ? 'green' : listing.lastStatus === 'Lsd' ? 'red' : listing.lastStatus === 'Sc' ? 'blue' : listing.lastStatus === 'Lc' ? 'blue' : listing.lastStatus === 'Pc' ? 'green' : listing.lastStatus === 'Ext' ? 'green' : listing.lastStatus === 'New' ? 'green' : 'black' }}>
																		{isCurrency(parseInt(listing.listPrice)).split('.')[0]}
																	</div>
																</div>
															</div>
															<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
																<div>{listing.city} {listing.state}</div>
																<div style={{ justifyContent: 'center', alignItems: 'center', width: 80, borderWidth: 1, borderColor: listing.lastStatus === 'Sus' ? 'black' : listing.lastStatus === 'Exp' ? 'black' : listing.lastStatus === 'Sld' ? 'red' : listing.lastStatus === 'Ter' ? 'black' : listing.lastStatus === 'Dft' ? 'green' : listing.lastStatus === 'Lsd' ? 'red' : listing.lastStatus === 'Sc' ? 'blue' : listing.lastStatus === 'Lc' ? 'blue' : listing.lastStatus === 'Pc' ? 'green' : listing.lastStatus === 'Ext' ? 'green' : listing.lastStatus === 'New' ? 'green' : 'black' }}>
																	<div style={{ color: listing.lastStatus === 'Sus' ? 'black' : listing.lastStatus === 'Exp' ? 'black' : listing.lastStatus === 'Sld' ? 'red' : listing.lastStatus === 'Ter' ? 'black' : listing.lastStatus === 'Dft' ? 'green' : listing.lastStatus === 'Lsd' ? 'red' : listing.lastStatus === 'Sc' ? 'blue' : listing.lastStatus === 'Lc' ? 'blue' : listing.lastStatus === 'Pc' ? 'green' : listing.lastStatus === 'Ext' ? 'green' : listing.lastStatus === 'New' ? 'green' : 'black' }}>
																		{listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
																	</div>
																</div>
															</div>
															<div>{isEmpty(listing.numBedrooms) ? '' : listing.numBedrooms + ' Bedrooms | '}{isEmpty(listing.numBathrooms) ? '' : listing.numBathrooms + ' Baths | '}{isEmpty(listing.numGarageSpaces) ? '' : listing.numGarageSpaces + ' Garage | '}{isEmpty(listing.type) ? '' : listing.type}</div>
														</div>
													)
												})}
											</div>
										</div>
									) : (<div className='components-header-search-empty'><span>Address not found</span></div>)
								)}
							</div>
							<ul className="components-header-right navbar-nav navbar-right">
								<li>
									<Link to="/home" className='components-header-right-button'>
										<i className='far fa-map f-s-16'></i>
										<span>Find Homes</span>
									</Link>
								</li>
								<li>
									<Link to="" className='components-header-right-button' onClick={() => this.props.logged ? document.location.href = `/saved` : this.props.setVisible(true)}>
										<i className='far fa-heart f-s-16'></i>
										<span>Saved</span>
									</Link>
								</li>
								<li>
									<Link to="/" className='components-header-right-button'>
										<i className='fas fa-dollar-sign f-s-16'></i>
										<span>Mortgage</span>
									</Link>
								</li>
								<li>
									<Link to="/" className='components-header-right-button'>
										<i className='fas fa-chart-bar f-s-16'></i>
										<span>Market stats</span>
									</Link>
								</li>
								<li>
									<Link to="" className='components-header-right-button' onClick={() => this.props.logged ? this.signOut() : this.props.setVisible(true)}>
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
		logged: state.auth.logged,
		tabs: state.lists.tabs
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
		setTabs: (data) => {
			dispatch(setTabs(data));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
