import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { addUpdateWorkoutList, currentWorkoutList } from "../firebase"

export default function Exercise(props) {

    useEffect(() => {
        
    }, [])
    // function to handle button click of adding exercise
    function handleAddExClick(e) {
        console.log(e.target.dataset.id)
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
            <button data-id={props.id} className="add-btn" onClick={handleAddExClick}>Add exercise</button>
        </div>
    )
}