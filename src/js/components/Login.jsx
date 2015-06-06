import React from 'react';
import '../../less/style.less';

var Formsy = require('formsy-react');
var Input = require('./input');
var LoginAction = require('../actions/login_action');
var LoginStore = require('../stores/login_store');


var Login = React.createClass({
    displayName: "Login",
    getInitialState: function() {
	return {
	    validatePristine: false,
	    disabled: false,
	    loading: false,
	    errors: '',
	    loggedIn: false
	};
    },
    
    componentDidMount: function() {
	LoginStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
	LoginStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function() {

	var li = LoginStore.getLoginInfo();  
	if (li.authenticated) {
	    this.setState({
		loading: false,
		errors: '',
		loggedIn: true
	    });
	    var { router } = this.context;
	    var nextPath = router.getCurrentQuery().nextPath;
	    if (nextPath) {
		router.replaceWith(nextPath);
	    } else {
		router.replaceWith('/');
	    }
	} else {
	    var _errors = li.errors.join();
	    this.setState({
		loading: false,
		errors: _errors
	    });
	}
    },
    resetForm: function() {
	this.refs.form.reset();
    },
    
    submitForm: function(data) {
	this.setState({
	    loading: true,
	    loggedIn: false,
	    errors: ''
	});

	LoginAction.authenticate(data);
	/*
	   this.refs.form.setInputValidationErrors(
	   {
           'email': 'Email address is taken'
	   });   
	 */

    },
    
    loginFailure: function(errors) {
	this.setState({loading: false, });
	
    },

    renderErrors: function() {
	var errors;
	
	if (this.state.errors) {
	    errors = (
		<h1>{this.state.errors}</h1>
	    );
	}
	return errors;
    },

    renderForm: function() {
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
               onSubmit={this.submitForm} 
               ref="form"
               >
	      {this.renderErrors()}
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
    
  },
  render: function() {
    return (
      <div className="container">
	<div className="row">
	  <div className="col-md-3"/>
	  <div className="col-md-6 col-xs-12">
            {this.renderForm()}
	  </div>
	  <div className="col-md-3"/>
	</div>
      </div>
    );
  }
});

Login.contextTypes = {
  router: React.PropTypes.func
};

export default Login;  
