import { Link } from "react-router-dom"

export default function LoadedExercises() {
    return (
        <div>
            <Link
                className="back-btn"
                to=".."
                relative="path"
            >
                <i className="fa-solid fa-arrow-left"></i>
                <p className="back-btn-text">back</p>
            </Link>
            <p>exercises</p>
        </div>
        
    )
}