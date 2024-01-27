import { useState, useEffect } from "react"
import { NavLink, Link, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveCurrentExSetsReps, editSingleSet, deleteCategory, deleteEx, deleteSingleSet, deleteAllEx } from "../firebase"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit, toggleEdit, toggleDelete } from "../Utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function WorkoutLog() {
    const [workoutData, setWorkoutData] = useState([])
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false)
    const [toggleDeleteExModal, setToggleDeleteExModal] = useState(false)
    const [toggleDeleteSetModal, setToggleDeleteSetModal] = useState(false)
    const [toggleCalendar, setToggleCalendar] = useState(false)
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
    const [date, setDate] = useState(new Date())
    const { currentUser } = useOutletContext()
    
    useEffect(() => {
        loadExerciseList(date)
    }, [date])

    async function loadExerciseList(selectedDate) {
        try {
            const setsData = await retrieveCurrentExSetsReps(usersInDB, currentUser, date)
            setWorkoutData(setsData)
        } catch(e) {
            console.log("error fetching exercises list: ", e)
        }
    }

    function handleChange(name, value) {
        setNewSetInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleToggleCalendar() {
        setToggleCalendar(prev => !prev)
    }

    async function deleteAll() {
        try {
           await deleteAllEx(usersInDB, currentUser, date)
           await loadExerciseList(date)
        } catch(e) {
            console.log("error deleting doc: ", e)
        }
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
        <div className="workout-log">
            {/* <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="/AllCategories" className="link-portal-dash">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        <p className="link-text">Add To Log</p>
                    </Link>
                </div>
                <div className="see-previous-workout-container">
                        <span onClick={handleToggleCalendar} className="material-symbols-outlined">
                            calendar_month
                        </span>
                        <p className="link-text">Date</p>
                </div>
            </section> */}
            { toggleCalendar &&
                <Calendar
                    onChange={setDate}
                    value={date}
                    onClickDay={e => console.log(e)}
                />
            }

            { toggleEditSetModal &&
                <EditSetModal
                    handleEditSet={e => handleEditSetSubmit(e, {
                        editSingleSet,
                        newSetInfo,
                        usersInDB,
                        currentUser,
                        date,
                        loadExerciseList,
                        toggleEdit
                    }, 
                    {
                        setNewSetInfo,
                        setToggleEditSetModal 
                    })}
                    modalStyles={modalStyles}
                    toggle={e => toggleEdit(e, setNewSetInfo, setToggleEditSetModal)}
                    handleChange={handleChange}
                    title={newSetInfo.title}
                />
            }

            { toggleDeleteExModal &&
                <ConfirmDeleteExModal
                    handleDeleteExercise={e => handleDeleteExerciseSubmit(e, {
                        deleteEx,
                        usersInDB,
                        currentUser,
                        date,
                        currentItemToDelete,
                        loadExerciseList,
                        toggleDelete
                    },
                    {
                        setCurrentItemToDelete,
                        setToggleDeleteExModal,
                        setToggleDeleteSetModal
                    })}
                    toggle={e => toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)}
                    modalStyles={modalStyles}
                />
            }

            { toggleDeleteSetModal &&
                <ConfirmDeleteSetModal
                    handleDeleteSet={e => handleDeleteSetSubmit(e, {
                        deleteSingleSet,
                        usersInDB,
                        currentUser,
                        date,
                        currentItemToDelete,
                        loadExerciseList,
                        toggleDelete
                    },
                    {
                        setCurrentItemToDelete,
                        setToggleDeleteExModal,
                        setToggleDeleteSetModal
                    })}
                    toggle={e => toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)}
                    modalStyles={modalStyles}
                />
            }

            <div className="current-log-container">
                {
                    workoutData ?
                    <CurrentWorkoutList
                        data={workoutData}
                        toggleDel={e => toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)}
                        toggleEdit={e => toggleEdit(e, setNewSetInfo, setToggleEditSetModal)}
                    /> : 
                    <h1 className="current-log-title">Workout Log Empty</h1>
                }
            </div>
            {
                workoutData.length > 0 && <button onClick={deleteAll}>Delete all exercises</button>
            }
        </div>
    )
}