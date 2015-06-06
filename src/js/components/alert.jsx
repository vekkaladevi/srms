import React from 'react'; 

class Alert extends React.Component {
    constructor() {
	super();
    }
    componentDidMount() {
	if (this.props.dismissAfter && this.props.onDismiss) {
	    this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
	}
    }
    
    componentWillUnmount() {
	clearTimeout(this.dismissTimer);
    }

    renderDismissButton() {
	return (
	    <button
        type="button"
        className="close"
        onClick={this.props.onDismiss}
        aria-hidden="true">
	    &times;
	    </button>
	);
    }

    render() {
	let style = this.props.style ? `${this.props.style}` : 'info';
	let classes = `alert  alert-${style}`;
        let isDismissable = this.props.dismissable;
	return (
	    <div className={classes}>
	      {isDismissable ? this.renderDismissButton() : null}
	      {this.props.children}
	    </div>
	);
    }
    
};

export default Alert;
