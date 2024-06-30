import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { logout } from "../firebase"

export default function Footer() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openAddMenu, setOpenAddMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const menuRef = useRef(null)
    const addMenuRef = useRef(null)

    function signOutUser() {
        logout()
        window.location.reload()
    }

    // const addMenuStyles = {
    //     height: openAddMenu ? "160px" : "0",
    //     transition: openAddMenu ? ".2s ease-in-out" : ""
    // }

    // const settingsMenuStyles = {
    //     height: openMenu ? "265px" : "0",
    //     transition: openMenu ? ".2s ease-in-out" : ""
    // }

    // const ellipsisStyles = {
    //     transform: openMenu ? "rotate(90deg)" : "rotate(0)"
    // }

    // function toggleMenu(e) {
    //     if(e.target.dataset.settings) {
    //         setOpenMenu(prev => !prev)
    //     } else if(e.target.dataset.add) {
    //         setOpenAddMenu(prev => !prev)
    //     }
        
    // }

    // const handleClickOutside = (e) => {
    //     if(menuRef.current && !menuRef.current.contains(e.target)) {
    //         setOpenMenu(false)
    //     }
    //     if(addMenuRef.current && !addMenuRef.current.contains(e.target)) {
    //         setOpenAddMenu(false)
    //     }
    // }

    // document.addEventListener("click", handleClickOutside)

    return (
        <footer>
            <nav className="footer-nav">
                {/* <i className="fa-solid fa-plus footer-nav-item" data-add="add"></i> */}
                {/* <ul className="footer-user-menu"> */}
                    <Link to="/" className="footer-menu-item-link">
                        <span className="material-symbols-outlined footer-dash">
                            space_dashboard
                        </span>
                        <p className="footer-nav-item-text">Dashboard</p>
                    </Link>
                    <Link to="WorkoutLog" className="footer-menu-item-link">
                        <span className="material-symbols-outlined">
                            fitness_center
                        </span>
                        <p className="footer-nav-item-text">Workouts</p>
                    </Link>
                    <Link to="Analysis" className="footer-menu-item-link">
                        <span className="material-symbols-outlined">
                            bar_chart
                        </span>
                        <p className="footer-nav-item-text">Analysis</p>
                    </Link>
                    {/* <Link className="footer-menu-item-link">
                        <li className="footer-menu-item">Body Stats</li>
                    </Link> */}
                    {/* <li onClick={signOutUser} className="footer-menu-item">Logout</li> */}
                {/* </ul> */}
            </nav>

        </footer>
    )
}