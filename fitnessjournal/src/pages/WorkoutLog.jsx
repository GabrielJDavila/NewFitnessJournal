import { useState, useEffect, useRef } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveCurrentExSetsReps, editSingleSet, deleteEx, deleteSingleSet, deleteAllEx, reOrderWorkoutList } from "../firebase"
import ConfirmDeleteAllExModal from "../components/modals/ConfirmDeleteAllEx"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import TimerModal from "../components/modals/timerModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit, handleDeleteAllExSubmit, toggleEdit, toggleDelete, toggleDeleteAllEx } from "../Utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function WorkoutLog() {

    const [workoutData, setWorkoutData] = useState([])
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false)
    const [toggleDeleteExModal, setToggleDeleteExModal] = useState(false)
    const [toggleDeleteSetModal, setToggleDeleteSetModal] = useState(false)
    const [toggleDeleteAllExercisesModal, setToggleDeleteAllExercisesModal] = useState(false)
    const [toggleTimerModal, setToggleTimerModal] = useState(false)
    const [toggleCalendar, setToggleCalendar] = useState(false)
    const [date, setDate] = useState(new Date())
    const { currentUser } = useOutletContext()
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
    const calendarRef = useRef(null)

    useEffect(() => {
        if(date) {
            loadExerciseList(date)
        }
    }, [date])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    async function loadExerciseList() {
        try {
            const setsData = await retrieveCurrentExSetsReps(usersInDB, currentUser, date)
            setWorkoutData(setsData)
        } catch(e) {
            console.log("error fetching exercises list: ", e)
        }
    }

    async function reOrderList(exerciseId, newIndex, userCollection, userId, date) {
        try {
            await reOrderWorkoutList(exerciseId, newIndex, userCollection, userId, date)
            // loadExerciseList()
        } catch(e) {
            console.log("error re-ordering list: ", e)
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

    function handleToggleTimerModal() {
        setToggleTimerModal(prev => !prev)
    }

    function ToggleDeleteAll() {
        setToggleDeleteAllExercisesModal(prev => !prev)
    }

    async function handleDragEnd(result) {
        const { source, destination } = result
       
        if(!destination) {
            return
        }

        if(source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        // const newWorkoutData = Array.from(workoutData)
        // const [draggedItem] = newWorkoutData.splice(source.index, 1)
        // newWorkoutData.splice(destination.index, 0, draggedItem)
        // setWorkoutData(newWorkoutData)
        const draggedItemId = workoutData[source.index].id
        const newIndex = destination.index
        const updatedWorkoutData = Array.from(workoutData)

        const [draggedItem] = updatedWorkoutData.splice(source.index, 1)

        updatedWorkoutData.splice(destination.index, 0, draggedItem)

        updatedWorkoutData.forEach((item, index) => {
            item.index = index
        })

        setWorkoutData(updatedWorkoutData)
        
        await reOrderList(draggedItemId, newIndex, usersInDB, currentUser, date)
        // loadExerciseList(date)
    }

    const modalStyles = {
        position: "sticky",
        top: "100px",
        bottom: "0",
        right: "0",
        left: "0",
        width: "95%",
        height: "500px",
        margin: "auto",
        background: "white",
        zIndex: "12"
    }

    const handleClickOutside = (e) => {
        if(calendarRef.current && !calendarRef.current.contains(e.target)) {
            setToggleCalendar(false)
        }
    }

    document.addEventListener("click", handleClickOutside)

    return (
        <div className="workout-log">
            <section className="hero-section log-hero">
                <h1>Log</h1>
            </section>
            <section className="dash-links-container">
                <Link to="AllCategories" className="date-dash link-portal-dash">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <p className="link-text">Add To Log</p>
                </Link>
                <div className="date-dash">
                    <span className="material-symbols-outlined" onClick={ToggleDeleteAll}>
                        delete
                    </span>
                    <p className="link-text">Delete</p>
                </div>
                <div onClick={handleToggleTimerModal} className="workout-timer-container date-dash">
                    <span className="material-symbols-outlined">
                        timer
                    </span>
                    <p className="link-text">Timer</p>
                </div>
                <div className="date-dash">
                    <span ref={calendarRef} onClick={e => handleToggleCalendar(e)} className="material-symbols-outlined calendar-icon">
                         calendar_month
                    </span>
                    <p className="link-text">Date</p>
                </div>
            </section>
            { toggleCalendar &&
                <div className="calendar-container">
                    <span onClick={handleToggleCalendar} className="material-symbols-outlined close-btn">
                        close
                    </span>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        onClickDay={e => console.log(e)}
                    />
                </div>
            }
            { toggleTimerModal &&
                <TimerModal
                    toggleTimer={handleToggleTimerModal}
                    date={date}
                    userId={currentUser}
                />
            }
            { toggleDeleteAllExercisesModal &&
                <ConfirmDeleteAllExModal
                    handleDeleteAllEx={e => handleDeleteAllExSubmit(e, {
                        deleteAllEx,
                        usersInDB,
                        currentUser,
                        date,
                        loadExerciseList,
                        toggleDeleteAllEx
                    },
                    {
                        setToggleDeleteAllExercisesModal
                    })}
                    toggle={e => toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal)}
                    modalStyles={modalStyles}
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
                    workoutData.length > 0 ?
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="workoutData">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="current-log-inner-container">
                                    <h2>Current Workout</h2>
                                    <CurrentWorkoutList
                                        data={workoutData}
                                        usersInDB={usersInDB}
                                        currentUser={currentUser}
                                        date={date}
                                        
                                        toggleDel={e => toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)}
                                        toggleEdit={e => toggleEdit(e, setNewSetInfo, setToggleEditSetModal)}
                                    />
                                    {provided.placeholder}
                                </div>
                            
                            )}
                        </Droppable>
                    </DragDropContext> : 
                    <h1 className="current-log-title">Workout Log Empty</h1>
                }
            </div>
        </div>
    )
}