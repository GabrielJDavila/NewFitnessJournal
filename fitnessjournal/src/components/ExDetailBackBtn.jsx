import { Link } from "react-router-dom"

export default function BackBtn() {
    return (
        <Link
            className="back-btn ex-detail-back-btn"
            to="/WorkoutLog"
        >
            <span className="material-symbols-outlined arrow-back">
                arrow_back
            </span>
            {/* <p className="back-btn-text">back</p> */}
        </Link>
    )
}