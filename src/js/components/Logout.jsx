import React from 'react';

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';

class Logout extends React.Component {
    constructor() {
	super();
	this.state = {userInfo: UserStore.getUserInfo() };
    }
    
    componentDidMount () {
	if (this.state.userInfo.loggedIn) {
	    UserAction.logout(this.state.userInfo);
	    let { router } = this.context;
	    let nextPath = router.getCurrentQuery().nextPath;
	    if (nextPath) {
		router.replaceWith(nextPath);
	    } else {
		router.replaceWith('/');
	    }
	}
    }
    
    render () {
	return <p>You are now logged out</p>;
    }
}


Logout.contextTypes = {
    router: React.PropTypes.func
};


export default Logout;
