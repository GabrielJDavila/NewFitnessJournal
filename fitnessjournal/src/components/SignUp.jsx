import PasswordError from "./modals/PasswordError"

export default function SignUp(props) {
    
    return (
        <div className="signup-page-container">
            <form onSubmit={e => props.handleSignUp(e)} className="login-page">
                <h1 className="login-form-title">Sign Up New User</h1>
                <p onClick={e => props.flipShowLogin(e)} className="switch-to-login">Already have an account? Log in here.</p>
                <fieldset className="login-input-fieldset">
                    <label htmlFor="email" className="sign-up-label">Email</label>
                    <input
                        name="email"
                        type="email"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.email}
                        placeholder="youremail@example.com"
                        className="login-cred"
                        required
                    />
                    <label htmlFor="email" className="sign-up-label">password</label>
                    <input
                        name="password"
                        type="password"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.password}
                        placeholder="******"
                        className="login-cred"
                        required
                    />
                    {props.loginError && <PasswordError />}
                </fieldset>
                
                <button data-signup="true" className="login-button">Sign up</button>
            </form>
        </div>
    )
}