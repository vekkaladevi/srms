var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

class UserAction {
    static login(credentials) {
	AppDispatcher.dispatch({
	    eventName: 'login',
	    data: credentials
	});
    }
    static signup(userInfo) {
	AppDispatcher.dispatch({
	    eventName: 'signup',
	    data: userInfo
	});
    }
    static logout(userName) {
	AppDispatcher.dispatch({
	    eventName: 'logout',
	    data: userName
	});
    }
};

export default UserAction;
