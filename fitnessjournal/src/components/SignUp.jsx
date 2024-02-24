import PasswordError from "./modals/PasswordError"

export default function SignUp(props) {
    
    return (
        <div className="signup-page-container">
            <form onSubmit={e => props.handleSignUp(e)} className="signup-page">
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

                <fieldset className="profile-creation-fieldset">
                    <div className="profile-creation-container name-and-age-container">
                        <div className="name-container">
                            <label htmlFor="name">Name</label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                placeholder="name"
                                className="login-cred"
                                required
                            />
                        </div>

                        <div className="age-container">
                            <label htmlFor="age">Age<span className="optional-tag">- optional</span></label>
                            <input
                                name="age"
                                id="age"
                                type="text"
                                placeholder="age"
                                className="login-cred"
                            />
                        </div>
                    </div>
                    <div className="profile-creation-container gender-and-weight-container">
                        <div className="gender-container">
                            <label htmlFor="gender">Gender<span className="optional-tag">- optional</span></label>
                            <input
                                name="gender"
                                id="gender"
                                type="text"
                                placeholder="gender(optional)"
                                className="login-cred"
                            />
                        </div>

                        <div className="weight-container">
                            <label htmlFor="weight">Weight<span className="optional-tag">- optional</span></label>
                            <div className="weight-input-container">
                                <input
                                    name="weight"
                                    id="weight"
                                    type="text"
                                    placeholder="weight"
                                    className="login-cred weight"
                                />
                                <select className="profile-select">
                                    <option value="kg">kg</option>
                                    <option value="lb">lb</option>
                                </select>    
                            </div>
                        </div>

                    </div>

                    <div className="profile-creation-container body-measurements-container">
                        <label htmlFor="height1">Height<span className="optional-tag">- optional</span></label>
                        <div className="height-container"> 
                            <div className="height-first-measurement-container">
                                <input
                                    name="height1"
                                    id="height1"
                                    type="text"
                                    className="login-cred height"
                                />
                                <select className="profile-select">
                                    <option value="ft">ft</option>
                                    <option value="m">m</option>
                                </select>
                            </div>

                            <div className="height-second-measurement-container">
                                <input
                                    name="height2"
                                    type="text"
                                    className="login-cred height"
                                />
                                <select className="profile-select">
                                    <option value="in">in</option>
                                    <option value="cm">cm</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </fieldset>
                
                <button data-signup="true" className="login-button">Sign up</button>
            </form>
        </div>
    )
}