import React from 'react';

import UserAction from '../actions/user_action';
import TenantStore from '../stores/tenant_store';

const styles = {};

class Tenant extends React.Component {
    constructor() {
	super();
    }
    renderTenant() {
      let tenant = TenantStore.getTenantInfo(this.props.params.tenantId);
      return(
        <div style={styles.wrapper}>
      	  <h3>{tenant.name}</h3>
	  <h4>{tenant.phone}</h4>
	</div>
      );
    }
    
    render () {
	return (
	    <div className="row">
		{this.renderTenant()}
	    </div>
	);
    }
};

styles.wrapper = {
  marginLeft:'30px',
  marginRight:'30px',
  padding: '10px 20px',
  overflow: 'hidden',
  background: 'hsl(200, 20%, 20%)',
  color: '#fff'
};


export default Tenant;
