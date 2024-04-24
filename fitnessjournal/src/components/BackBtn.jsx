import { Link } from "react-router-dom"

export default function BackBtn(props) {
    return (
        <div className="back-btn-breadcrumb-container">
            <Link
                className="back-btn-breadcrumb-link"
                to=".."
                relative="path"
            >
                <span className="material-symbols-outlined arrow-back">
                    arrow_back
                </span>
                <h2 className="back-btn-link-text">{props.root} / </h2>
            </Link>
            <h2 className="back-btn-current-text">{props.current}</h2>
        </div>
    )
}