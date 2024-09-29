import { useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"

export default function ExDetailedViewNav() {
    const params = useParams()
    
    return (
        <div className="ex-detail-nav">
            <Link to={`/WorkoutLog/ExDetailedView/${params.id}`} className="ex-detail-nav-item">Log</Link>
            <Link to="ExDetailedHistory" className="ex-detail-nav-item">History</Link>
            <Link className="ex-detail-nav-item">Progress</Link>
        </div>
    )
}