import React from 'react';

import UserAction from '../actions/user_action';
import TenantStore from '../stores/tenant_store';
import UserStore from '../stores/user_store';

import TenantList from './Tenant_List';

class Dashboard extends React.Component {
    constructor() {
	super();
	this.state = {
	    ui: UserStore.getUserInfo()
	};
    }
    render () {
	if (!this.state.ui.loggedIn) {
	    return (
		<h1>Welecome User</h1>
	    );
	}
	
	return (
	  <div className="row">
	    <div className="col-xs-6 col-md-3">
	      <TenantList/>
	    </div>
	  </div>
	);
    }
}

export default Dashboard;
