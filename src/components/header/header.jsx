import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { isEmpty, isCurrency } from './../../utils/functions';
import { PageSettings } from './../../constants/page-settings.js';
import { getSearch, getListingDetail } from './../../modules/services/ListingsService';
import { getPlaces, getGeometry } from './../../modules/services/MapService';
import { setLikes } from './../../modules/redux/lists/actions';
import { signOut } from './../../modules/redux/auth/actions';

// import axios from 'axios';
// import axios from './../../utils/axios.js';

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

		// if (typeof this.listingCancelToken !== typeof undefined) {
		// 	this.listingCancelToken.cancel('Operation canceled due to new request.');
		// }
		// this.listingCancelToken = axios.CancelToken.source();
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
					<div className='header-wrapper'>
						<div id="header" className="header navbar-default">
							<div className="navbar-header">
								<Link to="/home" className="navbar-brand"><span className='header-left-username'>Brokier</span></Link>
							</div>
							<div className="navbar-center">
								<input type='text' className='header-center-searchbox' placeholder='Search' onChange={(e) => this.autoComplete(e)} />
								{!isEmpty(this.state.search) && (
									!isEmpty(this.state.listings) ? (
										<div className='hd-search-view'>
											<div style={{ width: '100%' }}>
												<div style={{ fontWeight: 'bold', padding: 10 }}>Listings</div>
												{!isEmpty(this.state.listings) && this.state.listings.map((listing, key) => {
													return (
														<div key={key} className='hd-search-item' onClick={() => document.location.href = `/detail/${listing.id}`}>
															<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
																<span style={{fontWeight: 'bold'}}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix}</span>
																<div style={{ width: 80, alignItems: 'center' }}>
																	<div style={{ color: listing.lastStatus === 'Sus' ? 'black' : listing.lastStatus === 'Exp' ? 'black' : listing.lastStatus === 'Sld' ? 'red' : listing.lastStatus === 'Ter' ? 'black' : listing.lastStatus === 'Dft' ? 'green' : listing.lastStatus === 'Lsd' ? 'red' : listing.lastStatus === 'Sc' ? 'blue' : listing.lastStatus === 'Lc' ? 'blue' : listing.lastStatus === 'Pc' ? 'green' : listing.lastStatus === 'Ext' ? 'green' : listing.lastStatus === 'New' ? 'green' : 'black' }}>
																		{isCurrency(parseInt(listing.listPrice)).split('.')[0]}
																	</div>
																</div>
															</div>
															<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
									) : (<div className='hd-empty-view'><span>Address not found</span></div>)
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
									<Link to="/" className='header-right-btn' onClick={()=>this.signOut()}>
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
const mapDispatchToProps = dispatch => {
  return {
    signOut: (data) => {
      dispatch(signOut(data))
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(undefined, mapDispatchToProps)(Header);
