import { useState, useEffect } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import { deleteAllEx, usersInDB } from "../firebase"

export default function WorkoutLogLayout() {
    const [toggleCalendar, setToggleCalendar] = useState(false)
    const [date, setDate] = useState(new Date())
    const { currentUser } = useOutletContext()
    function handleToggleCalendar() {
        setToggleCalendar(prev => !prev)
    }

    async function deleteAll() {
        try {
           await deleteAllEx(usersInDB, currentUser, date)
        //    await loadExerciseList(date)
        } catch(e) {
            console.log("error deleting doc: ", e)
        }
    }

    return (
        <div className="workout-log-layout">
            <section className="hero-section log-hero">
                <h2>Log</h2>
            </section>
            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        <p className="link-text">Add To Log</p>
                    </Link>
                </div>
                <div className="date-dash">
                    <span className="material-symbols-outlined" onClick={deleteAll}>
                        delete
                    </span>
                    <p className="link-text">Delete</p>
                </div>
                <div className="date-dash">
                    <span onClick={handleToggleCalendar} className="material-symbols-outlined calendar-icon">
                         calendar_month
                    </span>
                    <p className="link-text">Date</p>
                </div>
            </section>
            <Outlet context={{ currentUser }}/>
        </div>
    )
}