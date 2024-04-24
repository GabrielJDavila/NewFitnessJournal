 import BackBtn from "../components/BackBtn"

 export default function UserProfile() {
    return (
        <main className="user-profile-page">
            <BackBtn
                root="Settings"
                current="UserProfile"
            />
            <p>User Profile Page</p>
        </main>
    )
 }