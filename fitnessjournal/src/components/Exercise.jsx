import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { addUpdateWorkoutList, currentWorkoutList } from "../firebase"

export default function Exercise(props) {
    const [docInfo, setDocInfo] = useState({
        id: props.id,
        name: props.name,
        scheme: props.scheme,
        unit: props.unit
    })
    // function to handle button click of adding exercise
    function handleAddExClick(e) {
        if(e.target.dataset.id === docInfo.id) {
            addUpdateWorkoutList(docInfo.id, docInfo.name, docInfo.scheme, docInfo.unit, currentWorkoutList)
            
        }
        
    }
    return (
        <div className="exercise-container">
            <Link
                to={props.id}
                className="exercise-name-link"
                data-id={props.id}
            >
                <p className="exercise-name">{props.name}</p>
            </Link>
            <button
                data-id={props.id}
                className="add-btn"
                onClick={handleAddExClick}
            >
                Add exercise
            </button>
        </div>
    )
}