import BackBtn from "../components/BackBtn"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getUserInfo } from "../firebase"
import EditableProfileInfo from "./EditableProfileInfo"
import ProfileCreation from "./ProfileCreation"

 export default function UserProfile() {
    const [userData, setUserData] = useState()
    const { currentUser } = useOutletContext()
    const [toggleEditInfo, setToggleEditInfo] = useState(false)
    const [toggleCreateUserInfo, setToggleCreateUserInfo] = useState(false)

    useEffect(() => {
        loadUserData()
    }, [])

    async function loadUserData() {
        try {
            const data = await getUserInfo(currentUser)
            setUserData(data)
        } catch(err) {
            console.error("error loading user data: ", err)
        }
    }

    function handleToggle() {
        setToggleEditInfo(prev => !prev)
    }

    function handleCreateToggle() {
        setToggleCreateUserInfo(prev => !prev)
    }

    return (
        <main className="user-profile-page">
            <BackBtn
                root="Settings"
                current="UserProfile"
            />
            
            <p>User Info</p>

            {userData && !toggleEditInfo &&
            <div className="non-edit-form">
                <div className="userinfo-outer-div">
                    
                    <div className="userinfo-inner-div">
                        <p>Name:</p>
                        <p className="user-info-data-item">{userData.name}</p>
                    </div>
                    <div className="userinfo-inner-div">
                        <p>Email:</p>
                        <p className="user-info-data-item">{userData.email}</p>
                    </div>
                    <div className="userinfo-inner-div">
                        <p>Gender:</p>
                        <p className="user-info-data-item">{userData.gender}</p>
                    </div>
                    
                </div>
                
                <div className="userinfo-outer-div">

                    <div className="userinfo-inner-div">
                        <p>Age:</p>
                        <p className="user-info-data-item">{userData.age}</p>
                    </div>
                    <div className="userinfo-inner-div">
                        <p>Height(in):</p>
                        <p className="user-info-data-item">{userData.height1}</p>
                    </div>
                    <div className="userinfo-inner-div">
                        <p>Weight(lb):</p>
                        <p className="user-info-data-item">{userData.weight}</p>
                    </div>

                </div>
                
                <div className="edit-profile-btn" onClick={handleToggle}>
                    <p>Edit</p>
                    <span class="material-symbols-outlined ">
                        edit
                    </span>
                </div>
            </div>
            }

            {!userData && !toggleCreateUserInfo && <p onClick={handleCreateToggle} className="create-user-info-toggle-btn">Create Profile</p>}
            
            {toggleCreateUserInfo &&
            <ProfileCreation
                handleCreateToggle={handleCreateToggle}
                loadUserData={loadUserData}
            />
            }
            {userData && toggleEditInfo &&
            <EditableProfileInfo
                name={userData.name}
                email={userData.email}
                gender={userData.gender}
                age={userData.age}
                height={userData.height1}
                weight={userData.weight}
                toggleEditInfo={toggleEditInfo}
                setToggleEditInfo={setToggleEditInfo}
                handleToggle={handleToggle}
                loadUserData={loadUserData}
            />
            }
            
        </main>
    )
 }