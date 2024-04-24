import { Link } from "react-router-dom"

export default function Settings() {
    return (
        <main className="settings-page">
            <Link to="UserProfile" className="settings-item">
                <p>User profile</p>
                <p className="text-slate-400">view and update profile.</p>
            </Link>
            <Link to="Theme" className="settings-item">
                <p>Theme</p>
                <p>change theme color.</p>
            </Link>
            <Link to="Notifications" className="settings-item">
                <p>Notifications</p>
                <p>change notification settings.</p>
            </Link>
            <Link className="settings-item">
                <p>Logout</p>
                <span class="material-symbols-outlined">
                    logout
                </span>
            </Link>
        </main>
    )
}