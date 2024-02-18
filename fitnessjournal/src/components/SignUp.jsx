import PasswordError from "./modals/PasswordError"

export default function SignUp(props) {
    
    return (
        <div className="signup-page-container">
            <form onSubmit={e => props.handleSignUp(e)} className="login-page">
                <h1 className="login-form-title">Sign Up New User</h1>
                <p onClick={e => props.flipShowLogin(e)} className="switch-to-login">Already have an account? Log in here.</p>
                <fieldset className="login-input-fieldset">
                    <label>Login Info</label>
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
                    {props.loginError && <PasswordError />}
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
                </fieldset>

                <fieldset className="login-input-fieldset">
                    <label>Create Profile</label>
                    <p>(Optional)</p>
                    <input
                        name="name"
                        type="text"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.name}
                        placeholder="Your name"
                        className="login-cred"
                        required
                    />
                    
                    <input
                        name="age"
                        type="text"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.password}
                        placeholder="age"
                        className="login-cred"
                        required
                    />
                    <div className="weight-and-height-container">
                        <input
                            name="weight"
                            type="text"
                            data-signup="signup"
                            onChange={e => props.handleChange(e)}
                            value={props.password}
                            placeholder="weight"
                            className="login-cred"
                            required
                        />
                        <div className="height-container">
                            <input
                                name="feet-height"
                                type="text"
                                data-signup="signup"
                                onChange={e => props.handleChange(e)}
                                value={props.password}
                                placeholder="ft"
                                className="login-cred"
                                required
                            />
                            <input
                                name="feet-inches"
                                type="text"
                                data-signup="signup"
                                onChange={e => props.handleChange(e)}
                                value={props.password}
                                placeholder="in"
                                className="login-cred"
                                required
                            />
                        </div>
                    </div>
                    <input
                        name="gender"
                        type="text"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.password}
                        placeholder="gender"
                        className="login-cred"
                        required
                    />
                    
                </fieldset>
                
                <button data-signup="true" className="login-button">Login</button>
            </form>
        </div>
    )
}