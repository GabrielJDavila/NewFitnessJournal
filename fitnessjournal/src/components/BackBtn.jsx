import { Link } from "react-router-dom"

export default function BackBtn() {
    return (
        <Link
            className="back-btn"
            to="/"
            relative="path"
        >
            <span className="material-symbols-outlined arrow-back">
                arrow_back
            </span>
            {/* <p className="back-btn-text">back</p> */}
        </Link>
    )
}