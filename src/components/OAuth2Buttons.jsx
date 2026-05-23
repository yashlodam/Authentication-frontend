import React from 'react'
import { loginWithGithub, loginWithGoogle } from '../services/AuthService'
import { GithubIcon, GoogleIcon } from './Icons'

const OAuth2Buttons = () => {
    return (
        <div className="social-buttons">

            <a
                href="http://localhost:8080/oauth2/authorization/google"
                className="btn-social"
                id="google-login-btn"
            >
                <GoogleIcon />
                Google
            </a>

            <a
                href="http://localhost:8080/oauth2/authorization/github"
                className="btn-social"
                id="github-login-btn"
            >
                <GithubIcon />
                GitHub
            </a>

        </div>
    )
}

export default OAuth2Buttons