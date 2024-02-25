import { useState, useEffect } from "react"
import { Link, useParams, useOutletContext } from "react-router-dom"
import { retreiveExFromCategory, retrieveSelectedCatName, usersInDB } from "../firebase"
import CategoryNav from "../components/CategoryNav"
import Exercise from "../components/Exercise"
import BackBtn from "../components/BackBtn"
import NewEx from "./NewEx"

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
    }, [])

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
            <CategoryNav reloadExData={loadExercisesData}/>
            <div className="rendered-ex-header">
                <div className="back-btn-container">
                    <BackBtn />
                    <p className="back-to-cats-text">back to categories</p>
                </div>
                <h2 className="selected-cat-title">{selectedCat.name}</h2>
            </div>
            {/* {showNewExModal &&
                <NewEx
                    // toggleModal={() => setShowNewExModal(prev => !prev)}
                    testProp="test"
                    reloadExData={() => loadExercisesData()}
                />} */}
            <div className="rendered-ex-list">
                {
                    exercises.length >= 1 ? renderedExercises : <button>No exercises exist in category!</button>
                }
                {/* {exercises.length >= 1 ? renderedExercises : <button onClick={() => setShowNewExModal(prev => !prev)}>Add new exercise</button>} */}
            </div>
        </div>
        
    )
}