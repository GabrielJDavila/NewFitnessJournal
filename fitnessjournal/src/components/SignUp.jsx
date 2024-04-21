import PasswordError from "./modals/PasswordError"
import NonMatchingPasswordError from "./modals/NonMatchPasswordError"
export default function SignUp(props) {
    
    return (
        <div className="signup-page-container">
            <form onSubmit={e => props.handleSignUp(e)} className="signup-page">
                <h1 className="login-form-title">Sign Up New User</h1>
                <p onClick={e => props.flipShowLogin(e)} className="switch-to-login">Already have an account? Log in here.</p>
                <fieldset className="login-input-fieldset">
                    <label htmlFor="email" className="sign-up-label">Email</label>
                    {props.signUpErrorMessage &&
                        <div className="password-error">
                            <p className="password-error-text">* Email is already in use.</p>
                        </div>
                    }
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
                    <label htmlFor="password" className="sign-up-label">Password</label>
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
                    <label htmlFor="confirm-password" className="sign-up-label">Confirm Password</label>
                    {props.nonMatchingPasswordError && <NonMatchingPasswordError />}
                    <input
                        name="confirmPassword"
                        type="password"
                        data-signup="signup"
                        onChange={e => props.handleChange(e)}
                        value={props.confirmPassword}
                        placeholder="******"
                        className="login-cred"
                        required
                    />
                </fieldset>

                {/* <fieldset className="profile-creation-fieldset">
                    <div className="profile-creation-container name-and-age-container">
                        <div className="name-container">
                            <label htmlFor="name">Name</label>
                            <input
                                name="name"
                                id="name"
                                onChange={e => props.handleChange(e)}
                                value={props.name}
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
                                onChange={e => props.handleChange(e)}
                                value={props.age}
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
                                onChange={e => props.handleChange(e)}
                                value={props.gender}
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
                                    onChange={e => props.handleChange(e)}
                                    value={props.weight}
                                    type="text"
                                    placeholder="weight"
                                    className="login-cred weight"
                                />
                                <select
                                    name="weightType"
                                    onChange={e => props.handleChange(e)}
                                    value={props.weightType}
                                    className="profile-select"
                                >
                                    <option value="">-- select --</option>
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
                                    onChange={e => props.handleChange(e)}
                                    value={props.height1}
                                    type="text"
                                    className="login-cred height"
                                />
                                <select
                                    name="heightType1"
                                    onChange={e => props.handleChange(e)}
                                    value={props.heightType1}
                                    className="profile-select"
                                >
                                    <option value="">-- select --</option>
                                    <option value="ft">ft</option>
                                    <option value="m">m</option>
                                </select>
                            </div>

                            <div className="height-second-measurement-container">
                                <input
                                    name="height2"
                                    onChange={e => props.handleChange(e)}
                                    value={props.height2}
                                    type="text"
                                    className="login-cred height"
                                />
                                <select
                                    name="heightType2"
                                    onChange={e => props.handleChange(e)}
                                    value={props.heightType2}
                                    className="profile-select"
                                >
                                    <option value="">-- select --</option>
                                    <option value="in">in</option>
                                    <option value="cm">cm</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </fieldset> */}
                
                <button data-signup="true" className="login-button">Sign up</button>
            </form>
        </div>
    )
}