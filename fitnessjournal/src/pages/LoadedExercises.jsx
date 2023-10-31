import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { retreiveFromCategory, categoriesCollection } from "../firebase"

export default function LoadedExercises() {
    const params = useParams()

    useEffect(() => {
        retreiveFromCategory(categoriesCollection, params)
    }, [])
    return (
        <div>
            <Link
                className="back-btn"
                to="/AllCategories"
                relative="path"
            >
                <i className="fa-solid fa-arrow-left"></i>
                <p className="back-btn-text">back</p>
            </Link>
            <p>exercises</p>
        </div>
        
    )
}