import { useState, useEffect } from "react"
import { Link, useParams, useOutletContext } from "react-router-dom"
import { retreiveExFromCategory, retrieveSelectedCatName, usersInDB } from "../firebase"
import Exercise from "../components/Exercise"
import BackBtn from "../components/BackBtn"

export default function LoadedExercises() {
    const params = useParams()
    const [exercises, setExercises] = useState([])
    const [selectedCat, setSelectedCat] = useState({
        name: ""
    })
    const { currentUser } = useOutletContext()

    async function loadExercisesData() {
        try {
            const catNameData = await retrieveSelectedCatName(usersInDB, currentUser, params.id)
            setSelectedCat(prev => ({
                ...prev,
                name: catNameData
            }))

            const data = await retreiveExFromCategory(usersInDB, currentUser, params.id)
            setExercises(data)
        } catch(e) {
            console.log("error retrieving data: ", e)
        }
    }
    
    useEffect(() => {
        loadExercisesData()
    }, [params.id])

    console.log(selectedCat)
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
            <div className="back-btn-container">
                <BackBtn />
                <p className="back-to-cats-text">back to categories</p>
            </div>
            <h2>{selectedCat.name}</h2>
            <div className="rendered-ex-list">
                {exercises.length >= 1 ? renderedExercises : <Link to="/NewEx">Add new exercise</Link>}
            </div>
        </div>
        
    )
}