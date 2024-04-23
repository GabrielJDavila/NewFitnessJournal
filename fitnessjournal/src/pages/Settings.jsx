import { Link } from "react-router-dom"

export default function Settings() {
    return (
        <main className="settings-page">
            <Link to="UserProfile" className="settings-item">
                <p>User profile</p>
            </Link>
            <Link to="Theme" className="settings-item">
                <p>Theme</p>
            </Link>
            <Link to="Notifications" className="settings-item">
                <p>Notifications</p>
            </Link>
            <Link className="settings-item">
                <p>Logout</p>
            </Link>
        </main>
    )
}