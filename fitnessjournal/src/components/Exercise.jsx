import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { addUpdateWorkoutList, currentWorkoutList, usersInDB } from "../firebase"
import ExAdded from "./modals/ExAdded"

export default function Exercise(props) {
    // const [ toggleModal, setToggleModal ] = useState(false)
    const splitName = props.name.split(' ')
    const capitalizedWords = splitName.map((string) => {
        const firstChar = string.charAt(0).toUpperCase()
        const slicedString = string.slice(1)
        const combinedString = firstChar + slicedString
        return combinedString
    }).join(' ')
    
    const [docInfo, setDocInfo] = useState({
        id: props.id,
        name: props.name,
        scheme: props.scheme,
        unit: props.unit
    })
    const { currentUser } = useOutletContext()


    useEffect(() => {
        if(props.toggleModal) {
            const flipModalState = setTimeout(() => {
                props.setToggleModal(false)
            }, 2000)

            return () => clearTimeout(flipModalState)
        }
    }, [props.toggleModal])

    // function to handle button click of adding exercise
    async function handleAddExClick(e) {
        const storedDate = localStorage.getItem("selectedDate")
        
        if(e.target.dataset.id === docInfo.id) {
            const workoutData = JSON.parse(localStorage.getItem('exercises') || '[]')
            const exerciseExists = workoutData ? workoutData.some(ex => ex.id === docInfo.id && storedDate === ex.date) : false

            if(exerciseExists) {
                props.setToggleModal(true)
                props.setClickedEx("Exercise already added to workout!")
            } else {
                
                const newEx = {
                    ...docInfo,
                    date: new Date(localStorage.getItem("selectedDate")),
                    setsReps: []
                }
                
                workoutData.push(newEx)
                localStorage.setItem('exercises', JSON.stringify(workoutData))
                props.setToggleModal(true)
                props.setClickedEx(`${docInfo.name} added to workout`)
            }
        }
        
    }
    return (
        <div>
            <div className="exercise-container">
                <p className="exercise-name">{capitalizedWords}</p>
                <button
                    data-id={props.id}
                    className="add-btn"
                    onClick={handleAddExClick}
                >
                    Add exercise
                </button>
            </div>
        </div>
    )
}