import React from 'react';  
import Router from "react-router";
import '../less/style.less';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import SignupHandler from './components/Signup';
import LoginHandler from './components/Login';
import LogoutHandler from './components/Logout';
import SettingsHandler from './components/Settings';	
	



import MainMenu from './components/MainMenu';

class App extends React.Component{  
    constructor() {
	super();
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


	
//	<DefaultRoute handler={MainMenu} />	      	

let routes = (  
	<Route name="app" path="/" handler={App}>
	<Route name="signup" path="/signup" handler={SignupHandler}/>
	<Route name="login" path="/login" handler={LoginHandler}/>
	<Route name="settings" path="/settings" handler={SettingsHandler}/>
	<Route name="logout" path="/signout" handler={LogoutHandler}/>

	</Route>
);

Router.run(routes, function (Handler) {  
    React.render(<Handler/>, document.getElementById('app'));
});

