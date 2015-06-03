import React from 'react';  

var Formsy = require('formsy-react');
var utils = require('./utils.js');


class ComponentMixin extends React.Component{
   constructor(props) {
       super(props);
       this.state = {
           _value: props.value,
           _isRequired: false,
           _isValid: true,
           _isPristine: true,
           _pristineValue: props.value,
           _validationError: '',
           _externalError: null,
           _formSubmitted: false
       };
   }
    componentWillMount() {

        var configure = function () {
         this.setValidations(this.props.validations, this.props.required);
            this.props._attachToForm(this);
        }.bind(this);

        if (!this.props.name) {
            throw new Error('Form Input requires a name property when used');
        }

        if (!this.props._attachToForm) {
            return setTimeout(function () {
                if (!this.isMounted()) return;
                if (!this.props._attachToForm) {
                    throw new Error('Form Mixin requires component to be nested in a Form');
                }
                configure();
            }.bind(this), 0);
        }
        configure();
    }

    // We have to make the validate method is kept when new props are added
    componentWillReceiveProps(nextProps) {
        this.setValidations(nextProps.validations, nextProps.required);
    }

    componentDidUpdate(prevProps) {

        // If the value passed has changed, set it. If value is not passed it will
        // internally update, and this will never run
        if (!utils.isSame(this.props.value, prevProps.value)) {
            this.setValue(this.props.value);
        }
    }

    // Detach it when component unmounts
    componentWillUnmount() {
        this.props._detachFromForm(this);
    }

    setValidations(validations, required) {
        // Add validations to the store itself as the props object can not be modified
        this._validations = this.convertValidationsToObject(validations) || {};
        this._requiredValidations = required === true ? {isDefaultRequiredValue: true} : this.convertValidationsToObject(required);
    }

    
    // We validate after the value has been set
    setValue (value) {
	this.setState({
	    _value: value,
	    _isPristine: false
	}, function () {
	    this.props._validate(this);
	}.bind(this));
    }
    
    resetValue() {
        this.setState({
            _value: this.state._pristineValue,
            _isPristine: true
        }, function () {
            this.props._validate(this);
        });
    }
    getValue() {
        return this.state._value;
    }
    hasValue() {
        return this.state._value !== '';
    }
    getErrorMessage() {
        return !this.isValid() || this.showRequired() ? (this.state._externalError || this.state._validationError) : null;
    }
    isFormDisabled() {
        return this.props._isFormDisabled();
    }
    isValid() {
        return this.state._isValid;
    }
    isPristine() {
        return this.state._isPristine;
    }
    isFormSubmitted() {
        return this.state._formSubmitted;
    }
    isRequired() {
        return !!this.props.required;
    }
    showRequired() {
        return this.state._isRequired;
    }
    showError() {
        return !this.showRequired() && !this.isValid();
    }
    isValidValue(value) {
        return this.props._isValidValue.call(null, this, value);
    }
    convertValidationsToObject(validations) {
        if (typeof validations === 'string') {

        return validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (validations, validation) {
            var args = validation.split(':');
            var validateMethod = args.shift();

            args = args.map(function (arg) {
                try {
                    return JSON.parse(arg);
                } catch (e) {
                    return arg; // It is a string if it can not parse it
                }
            });

            if (args.length > 1) {
                throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
            }

            validations[validateMethod] = args.length ? args[0] : true;
            return validations;
        }, {});

    }

    return validations || {};
    }
};


export default ComponentMixin;
