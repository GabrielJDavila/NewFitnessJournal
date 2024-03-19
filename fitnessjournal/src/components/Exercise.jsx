import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { addUpdateWorkoutList, currentWorkoutList, usersInDB } from "../firebase"
import ExAdded from "./modals/ExAdded"

export default function Exercise(props) {
    const [ toggleModal, setToggleModal ] = useState(false)
    const [docInfo, setDocInfo] = useState({
        id: props.id,
        name: props.name,
        scheme: props.scheme,
        unit: props.unit
    })
    const { currentUser } = useOutletContext()

    useEffect(() => {
        if(toggleModal) {
            const flipModalState = setTimeout(() => {
                setToggleModal(false)
            }, 2000)

            return () => clearTimeout(flipModalState)
        }
    }, [toggleModal])

    // function to handle button click of adding exercise
    function handleAddExClick(e) {
        if(e.target.dataset.id === docInfo.id) {
            addUpdateWorkoutList(docInfo.id, docInfo.name, usersInDB, currentUser)
            setToggleModal(true)
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
            { toggleModal && <ExAdded /> }
        </div>
    )
}