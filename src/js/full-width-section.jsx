var React = require('react');
var mui = require('material-ui');
var ClearFix = mui.ClearFix;
var StylePropable = mui.Mixins.StylePropable;
var StyleResizable = mui.Mixins.StyleResizable;
var DesktopGutter = mui.Styles.Spacing.desktopGutter;
var _ = require('underscore');

var FullWidthSection = React.createClass({

    mixins: [StylePropable, StyleResizable],

    propTypes: {
        useContent: React.PropTypes.bool,
        contentType: React.PropTypes.string,
        contentStyle: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            useContent: false,
            contentType: 'div'
        };
    },

    getStyles: function() {
	return  {
	    root: {
		padding: DesktopGutter + 'px',
                boxSizing: 'border-box'
	    },
	    content: {
    		maxWidth: '1200px',
    		margin: '0 auto'
	    },
	    rootWhenSmall: {
    		paddingTop: (DesktopGutter * 2) + 'px',
    		paddingBottom: (DesktopGutter * 2) + 'px'
	    },
	    rootWhenLarge: {
    		paddingTop: (DesktopGutter * 3) + 'px',
    		paddingBottom: (DesktopGutter * 3) + 'px'
	    }
	};
    },

    render: function() {
        let reqKeys = ['style', 'useContent', 'contentType', 'contentStyle'];
        let _props = _.pick(this.props, reqKeys);
        let other = _.omit(this.props, reqKeys);

	var styles = this.getStyles();
        _props.style =  this.mergeAndPrefix(styles.content, _props.contentStyle);
        var content;
        if (_props.useContent) {
            content = 
            React.createElement(
                _props.contentType, 
                _props.style, 
                this.props.children
            );
        } else {
            content = this.props.children;
        }
        let csStyle = this.mergeAndPrefix(
                             styles.root,
                             _props.style,
                             this.isDeviceSize(StyleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall,
                             this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge);
	return (
	    <ClearFix {...other}
                      style={csStyle}>
		{content}
	    </ClearFix>
	);
    }
});

module.exports = FullWidthSection;
