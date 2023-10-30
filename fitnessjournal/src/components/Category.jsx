import { useState } from "react"

export default function Category(props) {

    return (
        <div className="category-container">
            <p className="category-name">{props.name}</p>
            <div className="category-component-btns">
                <i
                    data-id={props.id}
                    className="fa-solid fa-pen-to-square category-edit"
                    onClick={props.toggleEdit}
                ></i>
                <i
                    data-id={props.id}
                    className="fa-solid fa-trash category-delete"
                    onClick={props.toggleDelete}
                ></i>
            </div>
        </div>
    )
}