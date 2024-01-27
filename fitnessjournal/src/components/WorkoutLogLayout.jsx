import { useState } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"

export default function WorkoutLogLayout() {
    const [toggleCalendar, setToggleCalendar] = useState(false)
    const { currentUser } = useOutletContext()
    function handleToggleCalendar() {
        setToggleCalendar(prev => !prev)
    }

    return (
        <div className="workout-log-layout">
            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        <p className="link-text">Add To Log</p>
                    </Link>
                </div>
                <div className="see-previous-workout-container">
                        <span onClick={handleToggleCalendar} className="material-symbols-outlined">
                            calendar_month
                        </span>
                        <p className="link-text">Date</p>
                </div>
            </section>
            <Outlet context={{ currentUser }}/>
        </div>
    )
}