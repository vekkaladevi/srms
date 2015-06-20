import React from 'react';  
import Router from "react-router";

import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Master from './components/master';
import Home from './components/pages/home';
import AppLeftNav from './components/app-left-nav';

import SignupHandler from './components/Signup';
import LoginHandler from './components/Login';
import LogoutHandler from './components/Logout';
import SettingsHandler from './components/Settings';
import Dashboard from './components/Dashboard';	
import Tenant from './components/Tenant';


import RouterContext from './lib/router.js';

let routes = (  
	<Route name="app" path="/" handler={Master}>
	    <Route name="signup" path="/signup" handler={SignupHandler}/>
	    <Route name="login" path="/login" handler={LoginHandler}/>
	    <Route name="settings" path="/settings" handler={SettingsHandler}/>
	    <Route name="logout" path="/signout" handler={LogoutHandler}/>
            <Route name="tenant" path="/tenant/:tenantId" handler={Tenant}/>
            <Route name="dashboard" path="/dashboard" handler={Dashboard}/>
            <DefaultRoute handler={Home}/>
	</Route>
);

export default routes;
