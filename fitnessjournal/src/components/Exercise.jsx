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
    console.log(docInfo.id)
    // function to handle button click of adding exercise
    function handleAddExClick(e) {
        if(e.target.dataset.id === docInfo.id) {
            addUpdateWorkoutList(docInfo.id, docInfo.name, docInfo.scheme, docInfo.unit, currentWorkoutList)
            
        }
        
    }
    return (
        <div className="exercise-container">
            <p className="exercise-name">{props.name}</p>
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