import React from 'react';  
import mixins from 'es6-mixins';
import ComponentMixin from './component_mixin';

import '../../less/style.less';

var cm = new ComponentMixin();
class Input extends React.Component {
  constructor() {
    super();
//    mixins(ComponentMixin, this); 
    this.state = {};
    this.mixin = cm;
    console.log(this);
  }
  componentWillMount() {
    console.log("WIllMOUNT");
    console.log(this);
 
    return cm.componentWillMount(this);
  }
  componentWillReceiveProps(nextProps) {
    return cm.componentWillReceiveProps(nextProps);
  }
  
  componentDidUpdate(prevProps) {
    return cm.componentDidUpdate(prevProps);
  }
  
  setState(state) {
    console.log("Set State");
    console.log(state);
    this.state = state;
  }

  getValue() {
    return cm.getValue();
  }
  
  setValue(value) {
    return cm.setValue(value);
  }
    // Detach it when component unmounts
  componentWillUnmount() {
    return cm.componentWillUnmount();
  }

  _onChange(event) {
    this.setValue(event.currentTarget.value);
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
