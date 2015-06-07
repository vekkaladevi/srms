var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

import EventEmitter from 'events';

var users= [];

class UserStore extends EventEmitter {
    constructor() {
	super();
	this.loginInfo = {
	    authenticated: false,
	    errors: []
	};
    }
    
    getLoginInfo() {
	return this.loginInfo;	
    }
    
    getSignupStatus() {
	return ({
	    status: true,
	    errors: ["User name taken", "Email already exists"] 
	});
    }
    
    login(credentials) {
	this.loginInfo.authenticated = false;
	this.loginInfo.errors = [];
	// send ajax request to server
	if (credentials.email === 'vijay.ekkaladevi@gmail.com') {
	    this.loginInfo.authenticated = true;
	} else {
	    this.loginInfo.errors.push("Sorry we dont recognize this user");
	}
    }
    
    signup(userInfo) {

    }
    
    addChangeListener(callback) {
	this.on('change', callback);
    }
    
    removeChangeListener(callback) {
	this.removeListener('change', callback);
    }
};

var us = new UserStore();

AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
	case 'login': 
	us.login(payload.data);
	break;
	case 'signup':
	us.signup(payload.data);
	break;
    }
    us.emit('change');
});

export default us;
