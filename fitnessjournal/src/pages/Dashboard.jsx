import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { currentWorkoutList, retrieveCurrentExSetsReps, editSingleSet, deleteCategory, deleteSingleSet } from "../firebase" 

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

    console.log(currentItemToDelete)
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

    function handleDeleteExerciseSubmit(e) {
        e.preventDefault()
        deleteCategory(currentWorkoutList, currentItemToDelete.exIdToDelete)
        loadExerciseList()
        toggleDelete(e)
    }

    function handleEditSetSubmit(e) {
        e.preventDefault()
        editSingleSet(newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, currentWorkoutList)
        loadExerciseList()
        toggleEdit(e)
    }

    function handleDeleteSetSubmit(e) {
        e.preventDefault()
        deleteSingleSet(currentWorkoutList, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
        loadExerciseList()
        toggleDelete(e)
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

        if(e.target.dataset.deleteexid) {
            setToggleDeleteExModal(prev => !prev)
        } else if(e.target.dataset.deletesetid) {
            setToggleDeleteSetModal(prev => !prev)
        }

        if(e.target.dataset.closedeletemodal) {
            setToggleDeleteExModal(prev => !prev)
        } else if(e.target.dataset.closedeletesetmodal) {
            setToggleDeleteSetModal(prev => !prev)
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
        top: "1rem",
        bottom: "0",
        right: "0",
        left: "0",
        width: "95%",
        height: "95vh",
        margin: "auto",
        background: "white",
        zIndex: "12"
    }

    const workoutList = workoutData.map((ex, index) => {
        return (
            <div key={index} className="rendered-ex-dash-container">
                <div className="ex-name-container">
                    <p className="current-ex-name">{ex.name}</p>
                    <i
                        onClick={e => toggleDelete(e)}
                        data-deleteexid={ex.id}
                        className="fa-solid fa-trash curr-ex-delete"
                    ></i>
                </div>
                
                <ul className="all-sets-container">
                    {ex.setsReps.map((set, setIndex) => (
                        <li key={setIndex} className="set-container">
                            <p className="set-weight">lbs: {set.weight}</p>
                            <p className="set-reps">reps: {set.reps}</p>
                            <span
                                id={ex.id}
                                data-editsetid={set.setId}
                                onClick={e => toggleEdit(e)}
                                className="material-symbols-outlined edit-ex"
                            >
                                edit
                            </span>
                            <i
                                onClick={e => toggleDelete(e)}
                                id={ex.id}
                                data-deletesetid={set.setId}
                                className="fa-solid fa-trash"
                            ></i>
                        </li>
                    ))}
                </ul>
                <Link to={`/ExerciseDetail/${ex.id}`} className="add-set-link">
                    <button className="add-set-btn">Add set</button>
                </Link>
                {}
            </div>
        )
    })

    const editSetModal =
        <form onSubmit={(e) => handleEditSetSubmit(e)} className="edit-set-modal">
            <div className="edit-set-title-container">
                <h2 className="edit-set-title">Edit Set</h2>
                <i
                    onClick={toggleEdit}
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <div className="new-reps-container">
                <p className="edit-set-text">rep:</p>
                <input
                    name="reps"
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    value={newSetInfo.title}
                    className="edit-set-input"
                />
            </div>
            <div className="new-weight-container">
                <p className="edit-set-text">lbs:</p>
                <input
                    name="weight"
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    value={newSetInfo.title}
                    className="edit-set-input"
                />
            </div>
            <button className="confirm-edit-set-btn">confirm</button>
        </form>

    const confirmDeleteModal =
        <form onSubmit={(e) => handleDeleteExerciseSubmit(e)} className="confirm-delete-modal" style={modalStyles}>
            <div className="edit-set-title-container">
                <h2>Delete Exercise</h2>
                <i
                    onClick={toggleDelete}
                    data-closedeletemodal
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <p>Are you sure you want to delete exercise?</p>
            <div className="confirm-delete-modal-btns-container">
                <p data-closedeletemodal onClick={(e) => toggleDelete(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>

    const confirmDeleteSetModal =
        <form onSubmit={e => handleDeleteSetSubmit(e)} className="confirm-delete-modal" style={modalStyles}>
            <div className="edit-set-title-container">
                <h2>Delete Set</h2>
                <i
                    onClick={toggleDelete}
                    data-closedeletesetmodal
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <p>Are you sure you want to delete this set?</p>
            <div className="confirm-delete-modal-btns-container">
                <p data-closedeletemodal onClick={(e) => toggleDelete(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>

    return (
        <main className="dashboard">

            { toggleEditSetModal && editSetModal }
            { toggleDeleteExModal && confirmDeleteModal }
            { toggleDeleteSetModal && confirmDeleteSetModal }

            <div className="current-log-container">
                {
                    workoutData ?
                    workoutList : <h1 className="current-log-title">Workout Log Empty</h1>
                }
            </div>

            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <i className="fa-solid fa-plus"></i>
                        <p className="link-text">Start New Workout</p>
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