import React from 'react';  
import ComponentMixin from './component_mixin';

import '../../less/style.less';
var _ = require('underscore');

import mui from 'material-ui';


class Input extends ComponentMixin {
    constructor(props) {
	super(props);
	this._bind('_onChange');
    }
    

    setValue(value) {
	super.setValue(value);
    }

    _onChange(event) {
	this.setValue(event.target.value);
    }
    
    render() {
        return(
            <mui.TextField 
                   hintText={this.props.placeholder}
                   floatingLabelText={this.props.label}
                   name={this.props.name}
                   value={this.getValue()}
                   errorText={this.getErrorMessage()}
                   onChange={this._onChange}
            />
        );
    }
    
};

Input.defaultProps = {
    validationError: '',
    validationErrors: {},
    value: ''
};
export default Input;
