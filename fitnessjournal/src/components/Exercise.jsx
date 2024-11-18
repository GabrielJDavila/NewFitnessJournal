import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { addUpdateWorkoutList, currentWorkoutList, usersInDB } from "../firebase"
import ExAdded from "./modals/ExAdded"

export default function Exercise(props) {
    // const [ toggleModal, setToggleModal ] = useState(false)
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
        if(e.target.dataset.id === docInfo.id) {
            const workoutData = JSON.parse(localStorage.getItem('exercises') || '[]')
            const exerciseExists = workoutData.some(ex => ex.id === docInfo.id)

            if(exerciseExists) {
                props.setToggleModal(true)
                props.setClickedEx("Exercise already added to workout!")
            } else {
                const newEx = {
                    ...docInfo,
                    setsReps: []
                }
                workoutData.push(newEx)
                localStorage.setItem('exercises', JSON.stringify(workoutData))
                props.setToggleModal(true)
                props.setClickedEx(`${docInfo.name} added to workout`)
            }
            // try {
            //     const data = await addUpdateWorkoutList(docInfo.id, docInfo.name, usersInDB, currentUser)
            //     if(data === "exercise already added to workout!" && typeof data === "string") {
            //         props.setToggleModal(true)
            //         props.setClickedEx(data)
            //     } else {
            //         addUpdateWorkoutList(docInfo.id, docInfo.name, usersInDB, currentUser)
            //         props.setToggleModal(true)
            //         props.setClickedEx(`${docInfo.name} added to workout`)
            //     }
            // } catch {

            // }
        }
        
    }
    return (
        <div>
            <div className="exercise-container">
                <p className="exercise-name">{props.name}</p>
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