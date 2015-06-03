import React from 'react';
var Formsy = require('formsy-react');

import '../../less/style.less';
var FRC = require('./formsy-react-comp');

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;
var Textarea = FRC.Textarea;
var Select = FRC.Select;

var Login = React.createClass({
  displayName: "Login",
  getInitialState: function() {
    return {
      layout: 'horizontal',
      validatePristine: false,
      disabled: false
    };
  },
  
  resetForm: function() {
    this.refs.form.reset();
  },
  
  submitForm: function(data) {
    console.log(data);
    this.refs.form.setInputValidationErrors(
      {
        'email': 'Email address is taken'
      });   

  },
  
  changeLayout: function(layout) {
    this.setState({layout: layout});
  },
  
  changeSelectProp: function(event) {
    var target = event.currentTarget;
    this.changeProp(target.name, target.checked);
  },
  
  changeProp: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  },

  render: function() {
    return (
      <div className="container-fluid">
	<div className="row">
	  <div className="col-md-3"/>
	  <div className="col-md-6 col-xs-12">
	    <Formsy.Form className="formClassName" onSubmit={this.submitForm} ref="form">
	      <fieldset>
		<Input layout="vertical"
                       name="email"
                       required
                       value="" 
                       label="Email Address"
                       type="text" 
                       placeholder="Email Address"
                       validations={{
	                            isEmail: true,
	                            maxLength: 50
	                            }}
                       validationErrors={{
		                         isEmail: 'You have to type valid email',
		                         maxLength: 'You can not type in more than 50 characters'
		                         }}
		/>
	      </fieldset>
	      <fieldset>
		<Input layout="vertical"
                       name="password"
                       required
                       value="" 
                       label="Password" 
                       type="password" 
                       placeholder="Password"
                       validations={{
	                            minLength:4,
	                            maxLength: 50
	                            }}
                       validationErrors={{
		                         minLength: 'Too short',
		                         maxLength: 'You can not type in more than 50 characters'
		                         }}
		/>
	      </fieldset>
              
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
	  </div>
	  <div className="col-md-3"/>
	</div>
      </div>
    );
  }
});

export default Login;  
