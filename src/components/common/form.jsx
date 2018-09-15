import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from "./select";

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }

    validate = () => {
        const validateResult = Joi.validate(this.state.data, this.schema, {abortEarly : false})
        console.log(validateResult);
    
        const errors = {};
        if(!validateResult.error) return null;
        for(let item of validateResult.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    
        // if (this.state.data.username.trim() == "")
        //   errors.username = "Username is required";
    
        // if (this.state.data.password.trim() == "")
        //   errors.password = "Password is required";
    
        // return Object.keys(errors).length === 0 ? null : errors;
    };
    
    validateProperty = input => {
          const obj = {[input.name]: input.value};
          const schema = {[input.name]: this.schema[input.name]};
          const {error} = Joi.validate(obj, schema);
          return error? error.details[0].message : null;
    
        //   if(input.name === 'username'){
        //       if(input.value.trim() === '')
        //         return 'Username is required'
        //   }
    
        //   if(input.name === 'password'){
        //     if(input.value.trim() === '')
        //       return 'Password is required'
        // }
    }

    handleSubmit = e => {
        e.preventDefault();
    
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    
        this.doSubmit();
      };

    handleChange = e => {
        const errors = [...this.state.errors]
        const error = this.validateProperty(e.currentTarget);
        if(error){
            errors[e.currentTarget.name] = error;
        }
        else{
            delete(errors[e.currentTarget.name]);
        }
    
        const data = { ...this.state.data };
        // data.username = e.currentTarget.value;
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data, errors });
      };

    renderButton(label){
        return(
            <button disabled = {this.validate()} className="btn btn-primary">{label}</button>
        )
    }
    
    renderSelect(name, label, options) {
        const { data, errors } = this.state;
    
        return (
          <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
          />
        );
      }
    
    renderInput(name, label, type="text"){
        const { data } = this.state;
        return(
            <Input
            type={type}
            name={name}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error = {this.state.errors[name]}
          />
        )
    }
    
      // handleChange = ( {currentTarget : input} ) => {
      //     const data = { ...this.state.data}
      //     // data.username = e.currentTarget.value;
      //     data[input.name] = input.value;
      //     this.setState({data})
      // }
}
 
export default Form;