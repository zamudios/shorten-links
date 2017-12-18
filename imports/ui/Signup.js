import React from 'react';                  // Default export 
import { Link } from 'react-router-dom';    // Named export
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


export default class Signup extends React.Component {
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

        if (password.length < 9) {
            return this.setState({ error: 'Password must be more than 8 characters long'})
        }

        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
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
                    <h1>Join Short Link</h1>

                    { this.state.error ? <p>{ this.state.error }</p> : undefined }

                    <form onSubmit={ this.onSubmit } noValidate className="boxed-view__form">
                        <input type="email" name="email" ref="email" placeholder="Email"/>
                        <input type="password" name="password"  ref="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}