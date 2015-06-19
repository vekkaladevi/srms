import React from 'react';  
import Router from "react-router";
import mui from 'material-ui';

import '../less/style.less';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import SignupHandler from './components/Signup';
import LoginHandler from './components/Login';
import LogoutHandler from './components/Logout';
import SettingsHandler from './components/Settings';
import Dashboard from './components/Dashboard';	
import MainMenu from './components/MainMenu';
import Tenant from './components/Tenant';

import RouterContext from './lib/router.js';

var ThemeManager = new mui.Styles.ThemeManager();

class App extends React.Component{  
    
    constructor() {
	super();
    }
  
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    render() {
	return (
		<div>
		<MainMenu/>
		{/* this is the importTant part */}
		<RouteHandler/>
		</div>
	);
    }
};

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

let routes = (  
	<Route name="app" path="/" handler={App}>
	<Route name="signup" path="/signup" handler={SignupHandler}/>
	<Route name="login" path="/login" handler={LoginHandler}/>
	<Route name="settings" path="/settings" handler={SettingsHandler}/>
	<Route name="logout" path="/signout" handler={LogoutHandler}/>
        <Route name="tenant" path="/tenant/:tenantId" handler={Tenant}/>
        
	<DefaultRoute handler={Dashboard} />	      	
	</Route>
);

var _router = Router.create(routes);

RouterContext.set(_router);


_router.run(function (Handler) {  
    React.render(<Handler/>, document.getElementById('app'));
});

