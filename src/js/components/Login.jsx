import React from 'react';
import '../../less/style.less';

import Formsy from 'formsy-react';
import Input from './input';
import AlertPanel from './alert_panel';

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';


import mui from 'material-ui';
var RaisedButton = mui.RaisedButton;

class Login extends React.Component {
    constructor() {
        super();
        let ui = UserStore.getUserInfo();  
	this.state = {
	    validatePristine: false,
	    disabled: false,
	    loading: false,
	    errors:ui.errors,
	    loggedIn: ui.loggedIn
	};
	this._onLoginChange = this._onChange.bind(this);
    }
    
    componentDidMount(){
	UserStore.addChangeListener(this._onLoginChange);
    }
    
    componentWillUnmount() {
	UserStore.removeChangeListener(this._onLoginChange);
    }
    

    _onChange() {
	let ui = UserStore.getUserInfo();  
	if (ui.loggedIn) {
	    this.setState({
		loading: false,
		errors: '',
		loggedIn: true
	    });
	} else {
	    let _errors = ui.errors.join();
	    if (_errors.length) {
		this.setState({
		    loading: false,
		    errors: _errors
		});
	    }
	}
    }

    resetForm() {
	this.refs.form.reset();
    }
    
    submitForm(data) {
	this.setState({
	    loading: true,
	    loggedIn: false,
	    errors: ''
	});

	UserAction.login(data);
    }
    
    loginFailure(errors) {
	this.setState({loading: false, });
    }

    renderErrors() {
	let errors;
	if (this.state.errors.length) {
	    errors = (
		<AlertPanel style="danger">{this.state.errors}</AlertPanel>
	    );
	}

	return errors;
    }

    renderForm() {
	if (this.state.loggedIn) {
	    return 
	}
	if (this.state.loading) {
	    return (
		<h1>Loading ....</h1>
	    );
	}

	return (
            <mui.Paper zDepth={2}>
                
	        <Formsy.Form 
               className="formClassName" 
               onSubmit={this.submitForm.bind(this)} 
               ref="form"
               >
                    <div style={{
                                color: "#e0e0e0",
                                fontSize: 24,
                                fontWeight: 500,
                                letterSpacing: "0",
                                lineHeight: "20px",
                                marginBottom: "0",
                                padding: "8px",
                                textTransform: "uppercase"
                                }}>
                         Login
                    </div>

                    
	            <Input name="email"
                           type="email"
                           label="Email Address"
                           placeholder="Email Address"
                           value="" 
                           fullWidth
                           required
                           validations="isEmail" 
                           validationError= 'You have to type valid email'
	            />
	            <Input name="password"
                           type="password"
                           required
                           value = "" 
                           label = "Password" 
                           placeholder = "Password"
                           fullWidth
                           validations={{
	                                minLength:4,
	                                maxLength: 50
	                                }}
                           validationErrors={{
		                             minLength: 'Too short',
		                             maxLength: 'You can not type in more than 50 characters'
		                             }}
	            />     
                    <div style={{ paddingTop: "2em" }}>
                        <RaisedButton label="Login" primary={true} />
                    </div>
	        </Formsy.Form>

            </mui.Paper>
	);
    }
    
    render() {
	return (
	    <div className="container">
	        <div className="row">
		    <div className="col-md-3"/>
		    <div className="col-md-6 col-xs-12">
		        {this.renderErrors()}
		        {this.renderForm()}
		    </div>
		    <div className="col-md-3"/>
		</div>
	    </div>
	);
    }
};

export default Login;  
