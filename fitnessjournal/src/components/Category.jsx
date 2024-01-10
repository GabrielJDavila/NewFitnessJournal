import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Category(props) {

    return (
        <div className="category-container">
            <Link
                to={props.id}
                className="category-name-link"
                data-id={props.id}
            >
                <p className="category-name">{props.name}</p>
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