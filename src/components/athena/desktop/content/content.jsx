import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import routes from '../../../../constants/page-route.jsx';
import { PageSettings } from '../../../../constants/page-settings.js';

function setTitle(path, routeArray) {
	var pageTitle;
	for (var i=0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			pageTitle = 'Borkier | Brokier Real Estates';
		}
	}
	document.title = (pageTitle) ? pageTitle : 'Borkier | Brokier Real Estates';
}

class Content extends React.Component {
	componentDidMount() {
		setTitle(this.props.history.location.pathname, routes);
	}
	componentWillMount() {
    this.props.history.listen(() => {
			setTitle(this.props.history.location.pathname, routes);
    });
  }
  
	render() {
		return (
			<PageSettings.Consumer>
				{({pageContentFullWidth, pageContentClass, pageContentInverseMode}) => (
					<div>
						{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>
						))}
					</div>
				)
			}
			</PageSettings.Consumer>
		)
	}
}

export default withRouter(Content);
