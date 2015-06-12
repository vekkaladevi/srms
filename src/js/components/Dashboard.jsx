import React from 'react';

import UserAction from '../actions/user_action';
import TenantStore from '../stores/tenant_store';
import UserStore from '../stores/user_store';

class Dashboard extends React.Component {
    constructor() {
	super();
	this.state = {
	    db: this.getDashboard(),
	    ui: UserStore.getUserInfo()
	};
	this._changeListener = this._onChange.bind(this);
    }
    componentDidMount(){
	TenantStore.addChangeListener(this._changeListener);
    }
    
    componentWillUnmount() {
	TenantStore.removeChangeListener(this._changeListener);
    }
    
    getDashboard() {
	let db = {
	    tenants: TenantStore.getTenantInfo()
	};
	return db;
    }
    _onChange() {
	this.setState({
	    db: this.getDashboard()
	});
	
    }
    
    renderTenants() {
	let tenants;
	let tenantList;

	tenants = this.state.db.tenants.map((tenant, id) => 
	    <li key={id}>
	      <h3>{tenant.name}</h3>
	      <h4>{tenant.phone}</h4>
	    </li>
	);

	if (tenants.length) {
	    tenantList = (
		<ul>{tenants}</ul>
	    );
	}
	return tenantList;
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
		{this.renderTenants()}
	      </div>
	    </div>
	);
    }
}

export default Dashboard;
