import { useState, useEffect } from "react"
import { Link, useParams, useOutletContext } from "react-router-dom"
import { retreiveExFromCategory, usersInDB } from "../firebase"
import Exercise from "../components/Exercise"

export default function LoadedExercises() {
    const params = useParams()
    const [exercises, setExercises] = useState([])
    const [selectedExId, setSelectedExId] = useState([])
    const { currentUser } = useOutletContext()

    async function loadExercisesData() {
        try {
            const data = await retreiveExFromCategory(usersInDB, currentUser, params.id)
            setExercises(data)
        } catch(e) {
            console.log("error retrieving data: ", e)
        }
    }
    
    useEffect(() => {
        loadExercisesData()
    }, [params.id])

    const renderedExercises = exercises.map(exercise => {
        return (
            <Exercise
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                scheme={exercise.scheme}
                unit={exercise.weightUnit}
                toggleEdit={(e) => toggleEdit(e)}
                toggleDelete={(e) => toggleDelete(e)}
            />
        )
    })

    return (
        <div className="rendered-ex-container">
            <Link
                className="back-btn"
                to="/AllCategories"
                relative="path"
            >
                <i className="fa-solid fa-arrow-left"></i>
                <p className="back-btn-text">back</p>
            </Link>
            <div className="rendered-ex-list">
                {exercises.length >= 1 ? renderedExercises : <Link to="/NewEx">Add new exercise</Link>}
            </div>
        </div>
        
    )
}