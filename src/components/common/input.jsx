import React, { Component } from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        id={props.name}
        type="text"
        className="form-control"
      />
      {props.error && <div className="alert alert-danger">
        {props.error}
        </div>}
    </div>
  );
};

export default Input;
