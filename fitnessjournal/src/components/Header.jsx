import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { logout } from "../firebase"

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openAddMenu, setOpenAddMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const menuRef = useRef(null)
    const addMenuRef = useRef(null)

    function signOutUser() {
        logout()
        window.location.reload()
    }

    const settingsMenuStyles = {
        height: openMenu ? "265px" : "0",
        transition: openMenu ? ".2s ease-in-out" : ""
    }

    function toggleMenu(e) {
        if(e.target.dataset.settings) {
            setOpenMenu(prev => !prev)
        } else if(e.target.dataset.add) {
            setOpenAddMenu(prev => !prev)
        }
        
    }

    const handleClickOutside = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenu(false)
        }
        if(addMenuRef.current && !addMenuRef.current.contains(e.target)) {
            setOpenAddMenu(false)
        }
    }

    document.addEventListener("click", handleClickOutside)

    return (
        <header>
            <h2 className="app-title">The Fitbook</h2>
            <span ref={menuRef} className="material-symbols-outlined account-icon" data-settings="settings" onClick={(e) => toggleMenu(e)}>
                account_circle
            </span>
                <ul className="user-menu" style={settingsMenuStyles}>
                    <Link to="/" className="menu-item-link">
                        <li className="menu-item">Dashboard</li>
                    </Link>
                    <Link to="WorkoutLog" className="menu-item-link">
                        <li className="menu-item">Workout Log</li>
                    </Link>
                    <Link to="ComingSoon" className="menu-item-link">
                        <li className="menu-item">Log Analysis</li>
                    </Link>
                    <Link to="Settings" className="menu-item-link">
                        <li className="menu-item">Settings</li>
                    </Link>
                    <li onClick={signOutUser} className="menu-item">Logout</li>
                </ul>
        </header>
    )
}