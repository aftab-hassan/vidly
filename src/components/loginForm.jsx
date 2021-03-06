import React, { Component } from "react";
import Input from "./common/input";
import Joi from 'joi-browser';
import Form from './common/form'

class LoginForm extends Form {
  // username = React.createRef();

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // componentDidMount() {
  //     this.username.current.focus();
  // }

  schema = {
      username : Joi.string().required().label('Username'),
      password : Joi.string().required().label('Password')
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = () => {
    // Call the server
    console.log("submitted");
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
