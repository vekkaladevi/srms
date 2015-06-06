import React from 'react';  
import '../../less/style.less';
import {Link} from 'react-router';

class MainMenu extends React.Component {
    render() {
	return (
	    <nav className="navbar navbar-inverse">
	      <div className="container-fluid">
		<div className="navbar-header">
		  <a className="navbar-brand" href="#">WebSiteName</a>
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
		</div>
		<div>
		  <ul className="nav navbar-nav navbar-right">
		    <li><Link to="signup">Signup</Link></li>
		    <li><Link to="login">Login</Link></li>
		  </ul>
		</div>
	      </div>
	    </nav>
	);	 
    }
};

export default MainMenu;
