import { useState } from "react"
import { Link } from "react-router-dom"

export default function Exercise(props) {

    return (
        <div className="exercise-container">
            <Link
                to={props.id}
                className="exercise-name-link"
                data-id={props.id}
            >
                <p className="exercise-name">{props.name}</p>
            </Link>
            <button data-id={props.id} className="add-btn">Add exercise</button>
            {/* <div className="exercise-component-btns">
                <i
                    data-edit={props.id}
                    className="fa-solid fa-pen-to-square category-edit"
                    onClick={props.toggleEdit}
                ></i>
                <i
                    data-delete={props.id}
                    className="fa-solid fa-trash category-delete"
                    onClick={props.toggleDelete}
                ></i>
            </div> */}
        </div>
    )
}