import React from 'react';
import { Link } from 'react-router-dom';

import { PageSettings } from './../../constants/page-settings.js';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = { collapseMegaMenu: false };
	}

	toggleMegaMenu() {
		this.setState({ collapseMegaMenu: !this.state.collapseMegaMenu });
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
							<input type='text' className='header-center-searchbox' placeholder='Search' />
						</div>
						<ul className="navbar-nav navbar-right" style={{ display: 'flex', justifyContent: 'center'}}>
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
