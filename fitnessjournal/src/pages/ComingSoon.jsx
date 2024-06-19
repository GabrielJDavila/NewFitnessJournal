import { Link } from "react-router-dom";

export default function ComingSoon() {
    return (
        <div className="coming-soon-container">
            <h1 className="coming-soon-title">Under Construction!</h1>
            <p className="coming-soon-text">This section is coming soon. For now, let's log some workouts!</p>
            <Link to="/WorkoutLog" className="coming-soon-link">Take me to workout log</Link>
        </div>
    )
}