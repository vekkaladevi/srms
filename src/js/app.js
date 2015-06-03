import React from 'react';  
import Router from "react-router";
import '../less/style.less';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import LoginHandler from './components/Login';
import MainMenu from './components/MainMenu';

class App extends React.Component{  
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


//	      <DefaultRoute handler={MainMenu} />	      

let routes = (  
	<Route name="app" path="/" handler={App}>
	<Route name="login" path="/login" handler={LoginHandler}/>
	</Route>
);

Router.run(routes, function (Handler) {  
    React.render(<Handler/>, document.getElementById('app'));
});

