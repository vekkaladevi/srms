import React from 'react';  
import Router from "react-router";

import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Master from './master';
import SignupHandler from './components/Signup';
import LoginHandler from './components/Login';
import LogoutHandler from './components/Logout';
import SettingsHandler from './components/Settings';
import Dashboard from './components/Dashboard';	
import MainMenu from './components/MainMenu';
import Tenant from './components/Tenant';
import AppLeftNav from './app-left-nav';
import RouterContext from './lib/router.js';

let routes = (  
	<Route name="app" path="/" handler={Master}>
	    <Route name="signup" path="/signup" handler={SignupHandler}/>
	    <Route name="login" path="/login" handler={LoginHandler}/>
	    <Route name="settings" path="/settings" handler={SettingsHandler}/>
	    <Route name="logout" path="/signout" handler={LogoutHandler}/>
            <Route name="tenant" path="/tenant/:tenantId" handler={Tenant}/>
            
	    <DefaultRoute handler={Dashboard} />	      	
	</Route>
);

export default routes;
