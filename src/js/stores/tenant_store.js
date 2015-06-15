var AppDispatcher = require('../dispatcher/srms_dispatcher.js');

import EventEmitter from 'events';

class TenantStore extends EventEmitter {
    constructor() {
	super();
	this.state = {
            tenants: [
                { name: "Shiva", phone: "4082349988", email: "shiva@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"},
                { name: "Vishnu", phone: "5102349988", email: "vishnu@devas.com"}

            ]
        };
    }
    
    getTenants() {
	return this.state.tenants;
    }

    getTenantInfo(tenantId) {
        return this.state.tenants[tenantId];
    }
    
    addChangeListener(callback) {
	this.on('change', callback);
    }
    
    removeChangeListener(callback) {
	this.removeListener('change', callback);
    }

};

var ts = new TenantStore();

AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
	case 'add':
	break;
    }
    ts.emit('dbchange');

});

export default ts;
