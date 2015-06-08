import React from 'react';
import '../../less/style.less';

import Formsy from 'formsy-react';
import Input from './input';
import AlertPanel from './alert_panel';

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';


class Login extends React.Component {
    constructor() {
	super();
	this.state = {
	    validatePristine: false,
	    disabled: false,
	    loading: false,
	    errors: '',
	    loggedIn: false,
	};
    }
    
    componentDidMount(){
	UserStore.addChangeListener(this._onChange.bind(this));
    }
    
    componentWillUnmount() {
	UserStore.removeChangeListener(this._onChange.bind(this));
    }
    

    _onChange() {
	let ui = UserStore.getUserInfo();  

	if (ui.loggedIn) {
	    this.setState({
		loading: false,
		errors: '',
		loggedIn: true
	    });
	    let { router } = this.context;
	    let nextPath = router.getCurrentQuery().nextPath;
	    if (nextPath) {
		router.replaceWith(nextPath);
	    } else {
		router.replaceWith('/');
	    }
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
	console.log(this.state.errors);
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
	    <Formsy.Form 
               className="formClassName" 
               onSubmit={this.submitForm.bind(this)} 
               ref="form"
               >

	      <Input 
                 type="email" 
                 name="email"
                 label="Email Address"
                 placeholder="Email Address"
                 value="" 
                 className=""
                 required
                 validations="isEmail" 
                 validationError= 'You have to type valid email'
	      />
	      <Input                        
                 name="password"
                 required
                 value = "" 
                 label = "Password" 
                 type = "password" 
                 placeholder = "Password"
                 validations={{
	                      minLength:4,
	                      maxLength: 50
	                      }}
                 validationErrors={{
		                   minLength: 'Too short',
		                   maxLength: 'You can not type in more than 50 characters'
		                   }}
	    />              
	    <button 
                className="btn btn-danger btn-lg btn-block" 
                formNoValidate="" 
                type="submit"
		>
	      Login
	    </button>
		  </Formsy.Form>
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

Login.contextTypes = {
    router: React.PropTypes.func
};
		
export default Login;  
