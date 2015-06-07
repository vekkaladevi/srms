import React from 'react';  
import ComponentMixin from './component_mixin';

import '../../less/style.less';
var _ = require('underscore');

class Checkbox extends ComponentMixin {
    constructor(props) {
	super(props);
	this._bind('_onChange');
    }
    

    setValue(value) {
	super.setValue(value);
    }

    _onChange(event) {
	this.setValue(event.currentTarget.checked);
	if (this.props.onChange) {
	    this.props.onChange(this.props.name, event.currentTarget.checked);
	}	
    }
    
    render() {

	let reqKeys = ['name', 'type', 'value', 'className'];
	let _props = _.pick(this.props, reqKeys);
	let _classname = _props.className || "checkbox";    
	let other = _.omit(this.props, reqKeys);
	let disabled = this.isFormDisabled() || this.props.disabled;
 	return (
	    <div className={_classname}>
		<label>
		<input  
	    type="checkbox"
	    name={_props.name}
	    checked={this.getValue() == true}
            className={_classname}
	    disabled = {disabled}
            {...other}
            onChange={this._onChange}
		/>
		{this.props.label}
		</label>		
		</div>
	);
  }
  
};

Checkbox.defaultProps = {
  validationError: '',
  validationErrors: {},
  value: ''
};
export default Checkbox;
