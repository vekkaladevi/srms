import React from 'react';

import UserAction from '../actions/user_action';
import TenantStore from '../stores/tenant_store';
import UserStore from '../stores/user_store';

import { Link } from 'react-router';
import TenantCarousel from './Tenant_Carousel';


const tenantStyles = {};
class TenantList extends React.Component {
    constructor() {
	super();
	this.state = {
	    db: this.getTenantList(),
	};
	this._changeListener = this._onChange.bind(this);
    }
    componentDidMount(){
	TenantStore.addChangeListener(this._changeListener);
    }
    
    componentWillUnmount() {
	TenantStore.removeChangeListener(this._changeListener);
    }
    
    getTenantList() {
	let db = {
	    tenants: TenantStore.getTenants()
	};
	return db;
    }
    _onChange() {
	this.setState({
	    db: this.getTenantList()
	});
	
    }
    
  renderTenantsAsCarousel() {
    let tc;
    tc = (
      <TenantCarousel tenants={this.state.db.tenants}/>
    );
    return tc;
  }
  
  renderTenantsAsGrid() {
    let tenants;
    let tenantList;
    
    tenants = this.state.db.tenants.map((tenant, id) => 
      <div key={id} className="col-md-4 col-sm-6">
        <div style={tenantStyles.wrapper}>
          <Link to="tenant" params={{tenantId: id}}>
	  <h3>{tenant.name}</h3>
            </Link>
	    <h4>{tenant.phone}</h4>
            </div>
      </div>
    );
    if (tenants.length) {
      tenantList = (
	tenants
      );
    }
    return tenantList;
  }
  renderTenants() {
    if (this.props.carousel) {
      return this.renderTenantsAsCarousel();
    } 
    return this.renderTenantsAsGrid();
  }
    
    render () {
	return (
	    <div className="row">
		{this.renderTenants()}
	    </div>
	);
    }
};


tenantStyles.wrapper = {
  border: '1px solid grey',
  margin: '5px 5px 5px 5px'
};

export default TenantList;
