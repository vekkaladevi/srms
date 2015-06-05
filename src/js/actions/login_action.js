var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

class LoginAction {
    static authenticate(credentials) {
	AppDispatcher.dispatch({
	    eventName: 'authenticate',
	    data: credentials
	});

    }
};

export default LoginAction;
