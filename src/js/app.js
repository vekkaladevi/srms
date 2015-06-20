import React from 'react';  
import Router from "react-router";
import AppRoutes from './app-routes.jsx';
import injectTapEventPlugin from "react-tap-event-plugin";
import RouterContext from './lib/router.js';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();



import mui from 'material-ui';

import '../less/style.less';

var ThemeManager = new mui.Styles.ThemeManager();



  /** Render the main app component. You can read more about the react-router here: 
    *  https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
    */ 
var _router =  Router
// Runs the router, similiar to the Router.run method. You can think of it as an 
// initializer/constructor method.


    .create({
        routes: AppRoutes,
        scrollBehavior: Router.ScrollToTopBehavior
    });

RouterContext.set(_router);

// This is our callback function, whenever the url changes it will be called again. 
// Handler: The ReactComponent class that will be rendered  
_router.run(function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});

