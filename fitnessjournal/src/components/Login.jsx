
export default function Login(props) {

    return (
        <div className="login-page-container">
            <form onSubmit={e => props.handleSignIn(e)} className="login-page" data-signin="true">
                <h1 className="login-form-title">The Fitbook</h1>
                <span className="login-form-span">Your personal fitness helper, right in your pocket.</span>
                <fieldset className="login-input-fieldset">
                    <p className="sign-up" onClick={e => props.flipShowLogin(e)}>Don't have an account? Sign-up here.</p>
                    <input
                        name="email"
                        type="email"
                        data-login="login"
                        onChange={e => props.handleChange(e)}
                        value={props.email}
                        placeholder="youremail@example.com"
                        className="login-cred"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        data-login="login"
                        onChange={e => props.handleChange(e)}
                        value={props.password}
                        placeholder="******"
                        className="login-cred"
                        required
                    />
                </fieldset>
                <button className="login-button">Login</button>
            </form>
        </div>
    )
}