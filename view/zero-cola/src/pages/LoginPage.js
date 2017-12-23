import React, { Component } from 'react';
import { tokenKey } from '../config';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let request = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "username=" + this.state.username + "&password=" + this.state.password
        }
        fetch('/api/v1/login', request)
            .then(response => response.json())
            .then(response => {
                const token = response.token;
                window.localStorage.setItem(tokenKey, token);
                this.props.history.push('/admin');
            })
    }

    render() {
        return (
            <div>
                LoginPage
                <form>
                    <label>
                        username:
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    </label>
                    <label>
                        password:
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default LoginPage;