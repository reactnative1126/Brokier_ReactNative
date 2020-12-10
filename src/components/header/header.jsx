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
					<div id="header" className="header navbar-default flex-around vertical-center">
						<div className="navbar-header">
							<Link to="/" className="navbar-brand"><span className='header-left-username'>Johnson Agent / User Name</span></Link>
						</div>
						<ul className="navbar-center">
							<input type='text' className='header-center-searchbox' placeholder='Search' />
						</ul>
						<ul className="navbar-nav navbar-right" style={{ display: 'flex', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px'}}>
							<li>
								<Link to="/" className='header-right-btn'>
									<i className='far fa-map f-s-26'></i>
									<span>Find Homes</span>
								</Link>
							</li>
							<li>
								<Link to="/" className='header-right-btn'>
									<i className='fas fa-heart f-s-26'></i>
									<span>Saved</span>
								</Link>
							</li>
							<li>
								<Link to="/" className='header-right-btn'>
									<i className='fas fa-dollar-sign f-s-26'></i>
									<span>Mortgage</span>
								</Link>
							</li>
							<li>
								<Link to="/" className='header-right-btn'>
									<i className='fas fa-chart-bar f-s-26'></i>
									<span>Market stats</span>
								</Link>
							</li>
							<li>
								<Link to="/" className='header-right-btn'>
									<i className='fas fa-user f-s-26'></i>
									<span>Profile</span>
								</Link>
							</li>
						</ul>
					</div>
				)}
			</PageSettings.Consumer>
		)
	}
}

export default Header;
