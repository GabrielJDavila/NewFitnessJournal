import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openAddMenu, setOpenAddMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const menuRef = useRef(null)
    const addMenuRef = useRef(null)


    const addMenuStyles = {
        height: openAddMenu ? "160px" : "0",
        transition: openAddMenu ? ".2s ease-in-out" : ""
    }

    const settingsMenuStyles = {
        height: openMenu ? "213px" : "0",
        transition: openMenu ? ".2s ease-in-out" : ""
    }

    const ellipsisStyles = {
        transform: openMenu ? "rotate(90deg)" : "rotate(0)"
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
            <nav className="nav">
                <i ref={addMenuRef} className="fa-solid fa-plus nav-item" data-add="add" onClick={(e) => toggleMenu(e)}></i>
                <ul className="user-menu" style={addMenuStyles}>
                    <Link to="/NewEx" className="menu-item-link">
                        <li className="menu-item">Create Exercise</li>
                    </Link>
                    
                    <Link to="/NewCat" className="menu-item-link">
                        <li className="menu-item">Create Category</li>
                    </Link>
                    
                    <Link to="/AllCategories" className="menu-item-link">
                        <li className="menu-item">Add Exercise</li>
                    </Link>
                </ul>
                
                <i ref={menuRef} style={ellipsisStyles} data-settings="settings" className="fa-solid fa-ellipsis-vertical nav-item" onClick={(e) => toggleMenu(e)}></i>
                <ul className="user-menu" style={settingsMenuStyles}>
                    <Link to="/" className="menu-item-link">
                        <li className="menu-item">Dashboard</li>
                    </Link>
                    <Link className="menu-item-link">
                        <li className="menu-item">Settings</li>
                    </Link>
                    <Link className="menu-item-link">
                        <li className="menu-item">Log Analysis</li>
                    </Link>
                    <Link className="menu-item-link">
                        <li className="menu-item">Body Stats</li>
                    </Link>
                </ul>
            </nav>

        </header>
    )
}