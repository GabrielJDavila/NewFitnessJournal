import { Link } from "react-router-dom"

export default function Settings() {
    return (
        <main className="settings-page">
            <Link to="UserProfile" className="settings-item">
                <p>User profile</p>
                <p className="settings-item-description">view and update profile.</p>
            </Link>
            <Link to="Theme" className="settings-item">
                <p>Theme</p>
                <p className="settings-item-description">change theme color.</p>
            </Link>
            <Link to="Notifications" className="settings-item">
                <p>Notifications</p>
                <p className="settings-item-description">change notification settings.</p>
            </Link>
            <Link className="settings-item">
                <p>Logout</p>
                <span class="material-symbols-outlined settings-item-description">
                    logout
                </span>
            </Link>
        </main>
    )
}