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
		    <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
		    <li><Link to="login">Login<span className="glyphicon glyphicon-log-in"></span></Link></li>
		  </ul>
		</div>
	      </div>
	    </nav>
	);	 
    }
};

export default MainMenu;
