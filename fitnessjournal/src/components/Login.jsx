
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
                    <div style={{display: "flex", alignItems: "center", gap: ".5rem", position: "relative"}} className="">
                        <input
                            name="password"
                            type={props.showPassword ? "text" : "password"}
                            data-login="login"
                            onChange={e => props.handleChange(e)}
                            value={props.password}
                            placeholder="******"
                            className="login-cred"
                            required
                        />
                        {!props.showPassword ?
                        <span
                            className="material-symbols-outlined curr-ex-view-signup"
                            style={{position: "absolute", marginLeft: "auto", right: "10px", color: "darkgray"}}
                            onClick={e => props.flipShowPassword(e)}
                        >
                            visibility
                        </span>
                        :
                        <span
                            className="material-symbols-outlined curr-ex-view-signup"
                            style={{position: "absolute", marginLeft: "auto", right: "10px", color: "darkgray"}}
                            onClick={e => props.flipShowPassword(e)}
                        >
                            visibility_off
                        </span>
                        }
                    </div>
                </fieldset>
                <button className="login-button">Login</button>
            </form>
        </div>
    )
}