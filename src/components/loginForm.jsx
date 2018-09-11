import React, { Component } from 'react';

class LoginForm extends Component {
    username = React.createRef();

    state = {
        account: {username:'', password:''}
    }

    // componentDidMount() {
    //     this.username.current.focus();
    // }

    handleChange = e => {
        const account = [...this.state.account]
        account.username = e.currentTarget.value;
        this.setState({account})
    }

    handleSubmit = e => {
        e.preventDefault();

        // Call the server
        console.log("submitted")
        const username = this.username.current.value;
    }

    render() { 
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} value={this.state.account.username} autoFocus ref={this.username} id="username" type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="text" className="form-control"></input>
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
    );
    }
}
 
export default LoginForm;