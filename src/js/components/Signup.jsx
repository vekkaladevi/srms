import React from 'react';
import '../../less/style.less';

import Formsy from 'formsy-react';
import Input from './input';
import Checkbox from './checkbox';

class Signup extends React.Component {
    constructor() {
	super();
	this.state =  {
	    errors: ""
	};
    }

    submitForm(data) {
	console.log(data);
    }
    renderErrors() {
	let errors;
	
	if (this.state.errors) {
	    errors = (
		<h1>{this.state.errors}</h1>
	    );
	}
	return errors;
    }
    
    renderForm() {
	return (
	    <Formsy.Form 
               className="formClassName" 
               onSubmit={this.submitForm} 
               ref="form"
            >
	    {this.renderErrors()}
	    <Input 
                name="firstName"
	        label="First Name"
	        placeholder="First Name"
	        value=""
	        validations={{
	            minLength:4,
	            maxLength: 50
		}}
                validationErrors={{
		    minLength: 'Too short',
		    maxLength: 'You can not type in more than 50 characters'
		}}
	        required
	    />
	    <Input 
                name="lastName"
	        label="Last Name"
	        placeholder="Last Name"
	        value=""
	        validations={{
	            minLength:4,
	            maxLength: 50
		}}
                validationErrors={{
		    minLength: 'Too short',
		    maxLength: 'You can not type in more than 50 characters'
		}}
	        required
	    />
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
	    <Checkbox name="terms"
		      type="checkbox"
		      label="I agree to the terms and conditions"
		      value =""
		      />
	    <button 
                className="btn btn-primary btn-lg btn-block" 
                formNoValidate="" 
                type="submit"
		>
	      Signup
	    </button>
	    </Formsy.Form>
	);
    }
    render() {
	return (
	    <div className="container col-md-4 col-md-offset-4">
	      {this.renderForm()}
	    </div>
	);
    }
	   
};

export default Signup;
