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
	  errors: ''
      };
  },
  
  componentDidMount: function() {
      LoginStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function() {
      LoginStore.removeChangeListener(this._onChange);
  },
  
  _onChange: function() {
      console.log(LoginStore);
      var li = LoginStore.getLoginInfo();  
      if (li.authenticated) {
	  this.setState({
	      loading: false,
	      errors: ''
	  });
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
      this.setState({loading: true});

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

  renderForm: function() {
      if (this.state.loading) {
	  return (
	      <h1>Loading ....</h1>
	  );
      }

      if (this.state.errors) {
	  return (
	      <h1>{this.state.errors}</h1>
	  );
      }
      
      return (
	    <Formsy.Form 
               className="formClassName" 
               onSubmit={this.submitForm} 
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
	      <div className="form-group">
		<input className="btn btn-warning" 
                       type="reset" 
                       value="Cancel"
                />
		<span> </span>
		<input className="btn btn-primary" 
                       formNoValidate="" 
                       type="submit" 
                       value="Submit"
                />
	      </div>
	    </Formsy.Form>
    );
    
  },
  render: function() {
    return (
      <div className="container-fluid">
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

export default Login;  
