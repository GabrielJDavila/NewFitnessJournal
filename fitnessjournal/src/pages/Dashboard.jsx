import { NavLink, Link } from "react-router-dom"

export default function Dashboard() {
    return (
        <main className="dashboard">

            <div className="current-log-container">
                <h1 className="current-log-title">Workout Log Empty</h1>
            </div>

            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <i className="fa-solid fa-plus"></i>
                        <p className="link-text">Start New Workout</p>
                    </Link>
                </div>
                <div className="see-previous-workout-container">
                    <Link className="link-portal-dash">
                    <i className="fa-regular fa-note-sticky"></i>
                    <p className="link-text">Previous Workout</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}