import React from 'react';
import '../../less/style.less';

import Formsy from 'formsy-react';
import Input from './input';
import Checkbox from './checkbox';
import AlertPanel from './alert_panel';

import UserAction from '../actions/user_action';
import UserStore from '../stores/user_store';

class Signup extends React.Component {
    constructor() {
	super();
	this.state =  {
	    errors: [],
	    loading: false
	};
	this._onSignupChange = this._onChange.bind(this);
    }

    componentDidMount(){
	UserStore.addSignupListener(this._onSignupChange);
    }
    
    componentWillUnmount() {
	UserStore.removeSignupListener(this._onSignupChange);
    }
    

    _onChange() {
	let reply = UserStore.getSignupStatus();
	if (reply.status) {
	    this.setState({ loading: false, errors: []});
	} else {
	    this.setState({ loading: false, errors: reply.errors});
	}	
    }
    submitForm(data) {
	this.setState({ loading: true, errors: []});
	UserAction.signup(data);
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
	      {this.renderErrors()}
	      {this.renderForm()}
	    </div>
	);
    }
	   
};

export default Signup;
