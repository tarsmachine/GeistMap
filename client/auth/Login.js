
import React from 'react'
import { browserHistory, Link } from "react-router-dom"

import Social from './Social'

import { RenderErrors, ValidationErrors } from './Error'
import { ForgotPassword } from './Forgot'

import Divider from './Divider'
import LoginForm from './LoginForm'

import createClass from 'create-react-class'

export const Login = createClass({

    getInitialState: function() {
            return {
                errors: [],
                validationErrors: {},
            }
        },

        handleResponse: function(json, response) {
            if (Object.keys(json.errfor).length) {
                return this.setState({validationErrors: json.errfor})
            }
            if (json.errors.length) {
                return this.setState({errors: json.errors})
            }

            window.location = '/auth/login'
        },

        handleError: function(error) {
            throw error
        },

        render: function() {
            const {
                oauthTwitter,
                oauthGitHub,
                oauthFacebook,
                oauthGoogle,
            } = this.props


            const {
                errors,
                validationErrors,
            } = this.state

            return (
                <div>
                    <div className="panel">
                        <span className="panel-title">Log in</span>
                        <span className="panel-authText">With</span>
                        <Social {...this.props} />
                        <Divider />
                        <LoginForm
                            handleError={this.handleError}
                            handleResponse={this.handleResponse}
                        />
                        <ForgotPassword />
                    </div>

                    <div className="panel bottom-panel">
                        Not a member yet? <Link to='/auth/signup'>Sign up!</Link>
                    </div>
                    { validationErrors ? <ValidationErrors errors={this.state.validationErrors} /> : null }
                    { errors ? <RenderErrors errors={this.state.errors} /> : null }
                </div>
            )
        }
})

export default Login

export const LoginValidationError = (props) => {
    let errors = props.formatErrors

    return (
        <div>
            <h2>The following fields are required: {errors.keys().join(',')}</h2>
        </div>
    )
}

export const LoginError = (props) => {

    let errors = props.errors.map(error => (
        <li>{error}</li>
    ))

    return (
        <ul>
            {errors}
        </ul>
    )
}
