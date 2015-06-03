import React from 'react';
import '../../less/style.less';

var Formsy = require('formsy-react');
var Input = require('./input');


var Login = React.createClass({
  displayName: "Login",
  getInitialState: function() {
    return {
      validatePristine: false,
      disabled: false
    };
  },
  
  resetForm: function() {
    this.refs.form.reset();
  },
  
  submitForm: function(data) {
    console.log(data);
/*
    this.refs.form.setInputValidationErrors(
      {
        'email': 'Email address is taken'
      });   
*/

  },
  
  
  changeProp: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  },
  renderForm: function() {
    return (
	    <Formsy.Form 
               className="formClassName" 
               onSubmit={this.submitForm} 
               ref="form"
               >
	      <Input 
                 name="email"
                 required
                 value="" 
                 label="Email Address"
                 type="email" 
                 placeholder="Email Address"
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
