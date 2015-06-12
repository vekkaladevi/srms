class RouterContext {
    constructor() {
	this._router;
    }
     set(router) {
	 this._router = router;
     }
    get() {
	return this._router;
    }
};

var _routerCtxt = new RouterContext();
export default _routerCtxt;
