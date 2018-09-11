import React, { Component } from "react";
import Input from "./common/input";
import Joi from 'joi-browser';

class LoginForm extends Component {
  // username = React.createRef();

  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  // componentDidMount() {
  //     this.username.current.focus();
  // }

  schema = {
      username : Joi.string().required().label('Username'),
      password : Joi.string().required().label('Password')
  }

  validate = () => {
    const validateResult = Joi.validate(this.state.account, this.schema, {abortEarly : false})
    console.log(validateResult);

    const errors = {};
    if(!validateResult.error) return null;
    for(let item of validateResult.error.details)
        errors[item.path[0]] = item.message;
    return errors;

    // if (this.state.account.username.trim() == "")
    //   errors.username = "Username is required";

    // if (this.state.account.password.trim() == "")
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

  handleChange = e => {
    const errors = [...this.state.errors]
    const error = this.validateProperty(e.currentTarget);
    if(error){
        errors[e.currentTarget.name] = error;
    }
    else{
        delete(errors[e.currentTarget.name]);
    }

    const account = { ...this.state.account };
    // account.username = e.currentTarget.value;
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  // handleChange = ( {currentTarget : input} ) => {
  //     const account = { ...this.state.account}
  //     // account.username = e.currentTarget.value;
  //     account[input.name] = input.value;
  //     this.setState({account})
  // }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : errors || {} });
    if (errors) return;

    // Call the server
    console.log("submitted");
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error = {this.state.errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error = {this.state.errors.password}
          />
          <button disabled = {this.validate()} className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
