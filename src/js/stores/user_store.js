var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

import EventEmitter from 'events';

var users= [];

class UserStore extends EventEmitter {
    constructor() {
	super();
	this.userInfo = {
	    loggedIn: false,
	    userName: 'Guest',
	    errors: []
	};
    }
    
    getUserInfo() {
	return this.userInfo;	
    }
    
    getSignupStatus() {
	return ({
	    status: false,
	    errors: ["User name taken", "Email already exists"] 
	});
    }
    
    login(credentials) {
	this.userInfo.loggedIn = false;
	this.userInfo.errors = [];
	// send ajax request to server
	if (credentials.email === 'vijay.ekkaladevi@gmail.com') {
	    this.userInfo.loggedIn = true;
	    this.userInfo.userName = "Vijay";
	} else {
	    this.userInfo.errors.push("Sorry we dont recognize this user");
	}
    }
    
    signup(userInfo) {

    }
    
    logout(userInfo) {
	this.userInfo.loggedIn = false;
	this.userInfo.userName = 'Guest';
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
	case 'logout':
	us.logout(payload.data);
	break;

    }
    us.emit('change');
});

export default us;
