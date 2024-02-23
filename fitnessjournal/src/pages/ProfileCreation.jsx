import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function ProfileCreation(props) {
    
    const [userProfile, setUserProfile] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        heighttype1: "",
        heighttype2: "",
        goals: ""
    })

    return (
        <div className="profile-creation-container">
            <h1 className="profile-creation-title">Profile</h1>
            <p>Creating your profile is recommended for an optimized experience. To skip, click on the dashboard button.</p>
            <div className="render-form-btns-container">
                <button onClick={e => props.skipProfileCreation(e)}>skip for now</button>
                <button onClick={e => props.continueWithProfileCreation(e)}>create profile</button>
            </div>

            {props.renderProfileForm &&
            <form className="profile-creation">
                <fieldset className="profile-creation-fieldset">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder="name"
                        className="profile-input"
                    />

                    <label htmlFor="age">Age</label>
                    <input
                        name="age"
                        id="age"
                        type="text"
                        placeholder="age"
                        className="profile-input"
                    />

                    <label htmlFor="gender">Gender</label>
                    <input
                        name="gender"
                        id="gender"
                        type="text"
                        placeholder="gender(optional)"
                        className="profile-input"
                    />
                </fieldset>

                <fieldset className="profile-creation-fieldset body-measurements-container">
                    <label htmlFor="weight">Weight</label>
                    <div className="weight-container">
                        <input
                            name="weight"
                            id="weight"
                            type="text"
                            placeholder="weight"
                            className="profile-input weight"
                        />
                        <select className="profile-select">
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                        </select>    
                    </div>
                    
                    <div className="height-container">  
                        <label htmlFor="height1">Height</label>
                        <div className="height-first-measurement-container">
                            <input
                                name="height1"
                                id="height1"
                                type="text"
                                className="height"
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
                                className="height"
                            />
                            <select className="profile-select">
                                <option value="in">in</option>
                                <option value="cm">cm</option>
                            </select>
                        </div>
                        
                    </div>
                </fieldset>            
            </form>}
        </div>
    )
}