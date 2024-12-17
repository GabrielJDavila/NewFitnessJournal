import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Category(props) {
    const firstLetter = props.name.charAt(0).toUpperCase()
    const restOfCatName = props.name.slice(1)
    const combinedCatName = firstLetter + restOfCatName
    
    return (
        <div className="category-container">
            <Link
                to={props.id}
                className="category-name-link"
                data-id={props.id}
            >
                <p className="category-name">{combinedCatName}</p>
            </Link>
            <div className="category-component-btns">
                <i
                    data-edit={props.id}
                    className="fa-solid fa-pen-to-square category-edit"
                    onClick={e => props.toggleEdit(e)}
                ></i>
                <i
                    data-delete={props.id}
                    className="fa-solid fa-trash category-delete"
                    onClick={e => props.toggleDelete(e)}
                ></i>
            </div>
        </div>
    )
}