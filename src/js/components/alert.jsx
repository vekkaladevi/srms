import React from 'react'; 

class Alert extends React.Component {
    constructor() {
	super();
    }
    componentDidMount() {
	if (this.props.dismissAfter && this.props.onDismiss) {
	    this.dismissTimer = setTimeout(this.props.onDismiss, 
					   this.props.dismissAfter);
	}
    }
    
    componentWillUnmount() {
	clearTimeout(this.dismissTimer);
    }

    renderDismissButton() {
	let showDismiss;
	if (this.props.dismissable) {
	    showDismiss =  (
	       <button
        type="button"
        className="close"
        onClick={this.props.onDismiss}
        aria-hidden="true">
	       &times;
	       </button>
	    )
	}
	return showDismiss;
    }

    renderMessageList() {
	let messages = React.Children.map(this.props.children, (message,i) => (
	    <li key={i}>{message}</li>
	));


	let messageList;
	if (React.Children.count(this.props.children)) {
	    messageList = (
		<ul>{messages}</ul>
	    );
	}
	return messageList;
    }
    render() {
	let style = this.props.style ? `${this.props.style}` : 'info';
	let classes = `alert  alert-${style}`;
        

	return (
	    <div className={classes}>
	      {this.renderDismissButton()}
	       {this.renderMessageList()}
	    </div>
	);
    }
    
};

export default Alert;
