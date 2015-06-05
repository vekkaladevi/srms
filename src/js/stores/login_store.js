var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

import EventEmitter from 'events';

class LoginStore extends EventEmitter {
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
    
    authenticate(credentials) {
	// send ajax request to server
	if (credentials.email === 'vijay.ekkaladevi@gmail.com') {
	    this.loginInfo.authenticated = true;
	    this.loginInfo.errors = [];
	} else {
	    this.loginInfo.errors.push("Sorry we dont recognize this user");
	}
    }
    
    addChangeListener(callback) {
	this.on('change', callback);
    }
    
    removeChangeListener(callback) {
	this.removeListener('change', callback);
    }
};

var ls = new LoginStore();

AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
	case 'authenticate': 
	ls.authenticate(payload.data);
	break;
    }
    ls.emit('change')
});

export default ls;
