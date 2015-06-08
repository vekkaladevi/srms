import React from 'react';

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';

class Settings extends React.Component {
    constructor() {
	super();
	this.state = {userInfo: UserStore.getUserInfo()};
    }
    
    
    render () {
	return <p>{this.state.userInfo.userName} profile</p>;
    }
}

export default Settings;
