var React = require('react');
import {Router, Link } from 'react-router';
import UserStore from '../stores/user_store';

var mui = require('material-ui');
var {Colors, Typography, Spacing} = mui.Styles;
var FlatButton = mui.FlatButton;


class AppTopNav extends React.Component {
    constructor() {
        super();
        this.state = { userInfo: this.getUserInfo()};
    }
    componentDidMount(){
	UserStore.addChangeListener(this._onChange.bind(this));
    }
    
    componentWillUnmount() {
	UserStore.removeChangeListener(this._onChange.bind(this));
    }

    getUserInfo() {
	return UserStore.getUserInfo();
    }

    _onChange() {
	this.setState(this.getUserInfo())
    }
    getStyles() {
        return {
            lineHeight: Spacing.desktopKeylineIncrement + 'px',
            paddingLeft: Spacing.desktopGutter,
            paddingTop: '0px',
            marginBottom: '8px',

            display: 'inline-block',
            textDecoration:'none'
        };
    }

    renderMenu() {
        let user = this.state.userInfo;
        let userMenu;

        if (user.loggedIn) {
            userMenu = (
                <ul>
                    <Link to='settings' style={this.getStyles()}><h1>{user.userName}</h1></Link>
                    <Link to='logout' style={this.getStyles()}>Logout</Link>
                </ul>
            );
        } else {
            userMenu = (
                <ul>
                    <Link to='login' style={this.getStyles()}>
                    <FlatButton linkButton={true} primary={true} label="Login"/>
                    </Link>
                    <Link to='signup' style={this.getStyles()}>
                    <FlatButton linkButton={true} secondary={true} label="Signup"/>
                    </Link>
                </ul>
            );
        }
        return (
            {userMenu}
        );        
    }
    render() {
        let topMenuStyle = {
            float: 'right!important',
            marginRight:'-10px'
        };
        return (
            <div style={topMenuStyle}>
                {this.renderMenu()}
            </div>
        );
    }
}

AppTopNav.contextTypes = {
    router: React.PropTypes.func
};

module.exports = AppTopNav;
