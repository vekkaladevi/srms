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
        let reqKeys = ['label', 'placeholder', 'name', 'type', 'value',
                       'validations', 'validationError'];
	let _props = _.pick(this.props, reqKeys);
        let other = _.omit(this.props, reqKeys);
        return(
            <mui.TextField 
                   floatingLabelText={_props.label}
                   hintText={_props.placeholder}
                   name={_props.name}
                   type={_props.type}
                   value={this.getValue()}
                   errorText={this.getErrorMessage()}
                   onChange={this._onChange}
                   {...other}
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
