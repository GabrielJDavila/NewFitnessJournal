import { Link } from "react-router-dom"

export default function NutritionLog() {
    return (
        <div className="nutrition-page">
            <section className="hero-section food-log-hero">
                <h1>Nutrition</h1>
            </section>
            <section>
                <h2>Calories</h2>
                <div className="calories-remaining-container">
                    <p>2390 - 0 = </p>
                    <h3>2390 remaining</h3>
                </div>
            </section>
            <section className="nutrition-log">
                <div className="log-mini">
                    <h1>Breakfast</h1>
                    <Link>
                        <p>add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <h1>Lunch</h1>
                    <Link>
                        <p>add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <h1>Dinner</h1>
                    <Link>
                        <p>add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <h1>Snacks</h1>
                    <Link>
                        <p>add food</p>
                    </Link>
                </div>
            </section>
            {/* <section className="dash-links-container">
                <Link to="AllCategories" className="date-dash link-portal-dash">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <p className="link-text">Add To Log</p>
                </Link>
                <div className="date-dash">
                    <span className="material-symbols-outlined" >
                        delete
                    </span>
                    <p className="link-text">Delete</p>
                </div>
                <div className="workout-timer-container date-dash">
                    <span className="material-symbols-outlined">
                        timer
                    </span>
                    <p className="link-text">Timer</p>
                </div>
                <div className="date-dash">
                    <span className="material-symbols-outlined calendar-icon">
                         calendar_month
                    </span>
                    <p className="link-text">Date</p>
                </div>
            </section> */}
        </div>
    )
}