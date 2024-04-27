import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { editUserInfo } from "../firebase"

export default function EditableProfileInfo(props) {
    const [userInfo, setUserInfo] = useState({
        name: props.name,
        email: props.email,
        gender: props.gender,
        age: props.age,
        height: props.height,
        weight: props.weight
    })
    const {currentUser} = useOutletContext()

    function handleChange(name, value) {
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        editUserInfo(
            currentUser,
            userInfo.name,
            userInfo.email,
            userInfo.gender,
            userInfo.age,
            userInfo.height,
            userInfo.weight
        )
        props.loadUserData()
        props.handleToggle()
    }

    return (
        <form onSubmit={handleSubmit} className="non-edit-form">
            <div className="userinfo-outer-div">
                    
                <div className="userinfo-inner-div">
                    <p>Name:</p>
                    <input
                        name="name"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.name}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.name}</p> */}
                </div>
                <div className="userinfo-inner-div">
                    <p>Email:</p>
                    <input
                        name="email"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.email}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.email}</p> */}
                </div>
                <div className="userinfo-inner-div">
                    <p>Gender:</p>
                    <input
                        name="gender"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.gender}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.gender}</p> */}
                </div>
                    
            </div>
                
            <div className="userinfo-outer-div">

                <div className="userinfo-inner-div">
                    <p>Age:</p>
                    <input
                        name="age"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.age}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.age}</p> */}
                </div>
                <div className="userinfo-inner-div">
                    <p>Height(in):</p>
                    <input
                        name="height"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.height}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.height1}</p> */}
                </div>
                <div className="userinfo-inner-div">
                    <p>Weight(lb):</p>
                    <input
                        name="weight"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={userInfo.weight}
                        className="user-info-edit-item"
                        required
                    />
                    {/* <p className="user-info-data-item">{props.weight}</p> */}
                </div>

            </div>
            <div className="cancel-save-container">
                <div onClick={props.handleToggle} className="cancel-edit-btn">
                    <p>cancel</p>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <button className="save-edit-btn">
                    <p>save</p>
                    <span class="material-symbols-outlined">
                        save
                    </span>
                </button>
            </div>
        </form>
    )
}