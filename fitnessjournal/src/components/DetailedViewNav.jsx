import { Link } from "react-router-dom"

export default function ExDetailedViewNav() {
    return (
        <div className="ex-detail-nav">
            <Link className="ex-detail-nav-item">Log</Link>
            <Link to="ExDetailedHistory" className="ex-detail-nav-item">History</Link>
            <Link className="ex-detail-nav-item">Progress</Link>
        </div>
    )
}