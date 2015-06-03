import React from 'react';  
import mixins from 'es6-mixins';
import ComponentMixin from './component_mixin';

import '../../less/style.less';


class Input extends ComponentMixin {
  constructor(props) {
    super(props);
  }
  
  _onChange(event) {
    super.setValue(event.currentTarget.value);
  }
  
  renderLabel() {
    let label;
    if (this.props.label) {
      label = (
          <label htmlFor={this.props.name}>{this.props.label}</label>
      );
    }
    return label;
  }
/*
  renderIcon(name) {
    let icon;
    return icon;
  }
  renderIconAfter() {
    return 
  }
  */
  renderMessage(message) {
    return(
      <span>{message}</span>
    );
  }
  render() {
    let classes = "form-group";
    return(
      <div className={classes} ref={this.props.ref}>
        {this.renderLabel}
        <input
          type={this.props.type}
          className={this.props.classname}
          {...this.props}
          name={this.props.ref}
          value={this.getValue()}
          onChange={this._onChange}
        />
        {this.renderMessage(this.props.message)}
      </div>
    );
  }
  
};

Input.defaultProps = {
  validationError: '',
  validationErrors: {},
  value: ''
};
export default Input;
