import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    // Override constructor.
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };

        this.onSubmit = this.onSubmit.bind(this);        
    }

    componentWillMount() {
        if (Meteor.user()) {
            this.props.history.replace('/links');
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({
                    error: 'Unable to login. Check email and password.'
                });
            } else {
                this.setState({
                    error: ''
                });
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Link</h1>

                    { this.state.error ? <p>{ this.state.error }</p> : undefined }

                    <form onSubmit={ this.onSubmit } noValidate className="boxed-view__form">
                        <input type="email" name="email" ref="email" placeholder="Email"/>
                        <input type="password" name="password"  ref="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>

                    <Link to="/signup">need an account?</Link>
                </div>
            </div>
        );
    }
}