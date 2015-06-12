import React from 'react';
import '../../less/style.less';

import Alert from './alert';

class AlertPanel extends React.Component {
    constructor() {
	super();
    }
    render() {
	return (
	    <Alert style={this.props.style}>
	      {this.props.children}
	    </Alert>
	);
    }
};
	    
AlertPanel.defaultProps = {
    style: 'info',
    alerts: []
};

export default AlertPanel;

