import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { currentWorkoutList, retrieveCurrentExSetsReps, editSingleSet, deleteCategory, deleteSingleSet } from "../firebase"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit } from "../crudUtils"

export default function Dashboard() {
    const [workoutData, setWorkoutData] = useState([])
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false)
    const [toggleDeleteExModal, setToggleDeleteExModal] = useState(false)
    const [toggleDeleteSetModal, setToggleDeleteSetModal] = useState(false)
    const [currentItemToDelete, setCurrentItemToDelete] = useState({
        exIdToDelete: "",
        setIdToDelete: "",
    })
    const [newSetInfo, setNewSetInfo] = useState({
        reps: "",
        weight: "",
        exId: "",
        setId: ""
    })

    useEffect(() => {
        loadExerciseList()
    }, [])

    async function loadExerciseList() {
        try {
            const setsData = await retrieveCurrentExSetsReps(currentWorkoutList)
            setWorkoutData(setsData)
        } catch(e) {
            console.log("error fetching exercises list: ", e)
        }
    }

    function toggleDelete(e) {
        const exId = e.target.dataset.deleteexid
        const setId = e.target.dataset.deletesetid
        const exOfSetId = e.target.id

        setCurrentItemToDelete(prev => ({
            ...prev,
            exIdToDelete: exOfSetId ? exOfSetId : exId,
            setIdToDelete: setId
        }))

        if(e.target.dataset.deleteexid || e.target.dataset.closedeleteexmodal) {
            setToggleDeleteExModal(prev => !prev)
        } else if(e.target.dataset.deletesetid || e.target.dataset.closedeletesetmodal) {
            setToggleDeleteSetModal(prev => !prev)
        } else {
            setToggleDeleteExModal(false)
            setToggleDeleteSetModal(false)
        }

    }

    function toggleEdit(e) {
        if(e) {
            const exId = e.target.id
            const setId = e.target.dataset.editsetid

            setNewSetInfo(prev => ({
                ...prev,
                exId: exId,
                setId: setId
            }))
        }
        setToggleEditSetModal(prev => !prev) 
    }

    function handleChange(name, value) {
        setNewSetInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const modalStyles = {
        position: "sticky",
        top: "2rem",
        bottom: "0",
        right: "0",
        left: "0",
        width: "95%",
        height: "90vh",
        margin: "auto",
        background: "white",
        zIndex: "12"
    }

    return (
        <main className="dashboard">

            { toggleEditSetModal &&
                <EditSetModal
                    handleEditSet={e => handleEditSetSubmit(e, editSingleSet, newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, currentWorkoutList, loadExerciseList, toggleEdit)}
                    modalStyles={modalStyles}
                    toggle={toggleEdit}
                    handleChange={handleChange}
                    title={newSetInfo.title}
                />
            }

            { toggleDeleteExModal &&
                <ConfirmDeleteExModal
                    handleDeleteExercise={e => handleDeleteExerciseSubmit(e, deleteCategory, currentWorkoutList, currentItemToDelete, loadExerciseList, toggleDelete)}
                    toggle={toggleDelete}
                    modalStyles={modalStyles}
                />
            }

            { toggleDeleteSetModal &&
                <ConfirmDeleteSetModal
                    handleDeleteSet={e => handleDeleteSetSubmit(e, deleteSingleSet, currentWorkoutList, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete, loadExerciseList, toggleDelete)}
                    toggle={toggleDelete}
                    modalStyles={modalStyles}
                />
            }

            <div className="current-log-container">
                {
                    workoutData ?
                    <CurrentWorkoutList
                        data={workoutData}
                        toggleDel={toggleDelete}
                        toggleEdit={toggleEdit}
                    /> : 
                    <h1 className="current-log-title">Workout Log Empty</h1>
                }
            </div>

            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <i className="fa-solid fa-plus"></i>
                        <p className="link-text">{workoutData.length === 0? "Start New Workout" : "Add Exercise"}</p>
                    </Link>
                </div>
                <div className="see-previous-workout-container">
                    <Link className="link-portal-dash">
                    <i className="fa-regular fa-note-sticky"></i>
                    <p className="link-text">Previous Workout</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}