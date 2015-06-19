import React from 'react';  
import '../../less/style.less';
import {Link} from 'react-router';
import mui from 'material-ui';
var AppBar = mui.AppBar;

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';

class MainMenu extends React.Component {
    constructor() {
	super();
	this.state = { userInfo: this.getUserInfo()};
    }
    componentDidMount(){
	UserStore.addChangeListener(this._onChange.bind(this));
    }
    
    componentWillUnmount() {
	UserStore.removeChangeListener(this._onChange.bind(this));
    }

    getUserInfo() {
	return UserStore.getUserInfo();
    }

    _onChange() {
	this.setState(this.getUserInfo())
    }

    render() {
	let userMenu;
	let user = this.state.userInfo;
	if (user.loggedIn) {
	    userMenu = (
		<ul className="nav navbar-nav navbar-right">
		  <li><Link to="settings">{user.userName}</Link></li>
		  <li><Link to="logout">Logout</Link></li>
		</ul>
	    );
	} else {
	    userMenu = (
		<ul className="nav navbar-nav navbar-right">
		  <li><Link to="login">Login</Link></li>
		  <li><Link to="signup">Signup</Link></li>
		</ul>
	    );
	}

	return (
            <AppBar title='SriMaata' iconClassNameRight="muidocs-icon-navigation-expand-more">
                {userMenu}
	    </AppBar>
	);	 
    }
};

export default MainMenu;
