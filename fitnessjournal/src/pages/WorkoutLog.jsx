import { useState, useEffect, useRef } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveCurrentExSetsRepsAndPRs, editSingleSet, deleteEx, deleteSingleSet, deleteAllEx, reOrderWorkoutList, retrieveAllWorkouts, AddSetNote } from "../firebase"
import ConfirmDeleteAllExModal from "../components/modals/ConfirmDeleteAllEx"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import AddNote from "../components/modals/AddNote"
import TimerModal from "../components/modals/TimerModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleAddSetSubmit, handleAddNoteSubmit, handleEditSetSubmit, handleDeleteAllExSubmit, toggleAddSet, toggleEdit, toggleDelete, toggleDeleteAllEx } from "../Utils"
import Calendar from "react-calendar"
import "../calendar-custom.css"
// import "react-calendar/dist/Calendar.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Skeleton } from "@mui/material"
import AddSetModal from "../components/modals/AddSetModal"
import ExerciseDetail from "./ExerciseDetail"
import DeleteMessage from "../components/modals/DeleteMessage"

// I'm reading/writing to firebase too much. Pull data into local storage, edit/delete from local storage, and then save to firebase.
export default function WorkoutLog() {
    const [workoutData, setWorkoutData] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem("exercises"))
        return savedData ? savedData : []
    })
    const [workoutDatesData, setWorkoutDatesData] = useState([])
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false)
    const [toggleAddSetModal, setToggleAddSetModal] = useState(false)
    const [toggleDeleteExModal, setToggleDeleteExModal] = useState(false)
    const [toggleDeleteSetModal, setToggleDeleteSetModal] = useState(false)
    const [deleteSetMessage, setDeleteSetMessage] = useState(false)
    const [toggleDeleteAllExercisesModal, setToggleDeleteAllExercisesModal] = useState(false)
    const [toggleTimerModal, setToggleTimerModal] = useState(false)
    const [toggleCalendar, setToggleCalendar] = useState(false)
    // initializing state for specific calendar day when user clicks calendar day
    const [toggleCalendarDay, setToggleCalendarDay] = useState(false)
    const [toggleNoteForm, setToggleNoteForm] = useState(false)
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())
    const { currentUser } = useOutletContext()
    const [currentItemToDelete, setCurrentItemToDelete] = useState({
        exIdToDelete: "",
        setIdToDelete: "",
    })
    const [exid, setExid] = useState("")
    const [setId, setSetId] = useState("")
    const [newSetInfo, setNewSetInfo] = useState({
        reps: "",
        weight: "",
        exId: "",
        setId: ""
    })
    const [note, setNote] = useState("")
    const [currentNote, setCurrentNote] = useState("")
    const [showSkel, setShowSkel] = useState(true)
    const calendarRef = useRef(null)
    const stringDate = date.toISOString().split("T")[0]
    const [year, month, day] = stringDate.split("-")
    const formattedDate = `${month}/${day}/${year}`

    console.log(workoutData)
    useEffect(() => {
        setShowSkel(true)
        const fetch = async () => {
            await loadExerciseList(date)
        }
        fetch()
    }, [date])

    useEffect(() => {
        if(deleteSetMessage) {
            const timeout = setTimeout(() => {
                toggleDeleteSetMessage()
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [deleteSetMessage])

    async function loadExerciseList(date) {
        setWorkoutData(JSON.parse(localStorage.getItem("exercises")) || [])
        setShowSkel(false)
        // try {
        //     const data = await retrieveCurrentExSetsRepsAndPRs(usersInDB, currentUser, date)
        //     const workoutDates = await retrieveAllWorkouts(usersInDB, currentUser)
        //     if(data) {
        //         const jsonString = JSON.stringify(data)
        //         const sizeInBytes = new Blob([jsonString]).size
        //         console.log(sizeInBytes)
        //         localStorage.setItem("workoutData", JSON.stringify(data))
        //         setWorkoutData(data.exercises)
        //         setShowSkel(false)
        //     }
        //     if(workoutDates) {
        //         setWorkoutDatesData(workoutDates)
        //     }
            
        // } catch(e) {
        //     console.log("error fetching exercises list: ", e)
        // }
    }

    async function reOrderList(exerciseId, newIndex, userCollection, userId, date) {
        try {
            await reOrderWorkoutList(exerciseId, newIndex, userCollection, userId, date)
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

    function handleNoteChange(value) {
        setNote(value)
        // setNote(prev => ({
        //     ...prev,
        //     [name]: value
        // }))
    }

    function handleDateChange(newDate) {
        setDate(newDate)
        localStorage.setItem("selectedDate", newDate.toISOString())
        handleToggleCalendar()
    }

    // function to check place previous workout dates on corresponding tiles in react calendar
    function tileClassName({ date, view }) {
        const workoutDatesSet = new Set(workoutDatesData)
        const formattedCalendarDate = date.toISOString().split('T')[0]

        if(view === "month" && workoutDatesSet.has(formattedCalendarDate)) {
            return "react-calendar__tile--highlight"
        } else {
            return null
        }
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

    function toggleAddSet() {
        setToggleAddSetModal(prev => !prev)
    }

    function toggleNote(e) {
        console.log(e.target.dataset.closenote)
        if(e.target.dataset.setid) {
            setSetId(e.target.dataset.setid)
            setCurrentNote(e.target.dataset.message)
        }
        if(e.target.dataset.closenote === true) {
            setToggleNoteForm(false)
        }
        setToggleNoteForm(prev => !prev)
    }

    function toggleDeleteSetMessage() {
        setDeleteSetMessage(prev => !prev)
    }

    async function handleDragEnd(result) {
        const { source, destination } = result
       
        if(!destination) {
            return
        }

        if(source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

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

    const workoutSkels =
        <div className="workout-skel-div-main">
            <div className="workout-skel-div">
                <div className="workout-skel-mini">
                <Skeleton variant="rounded" width="50%" />
                <Skeleton variant="rounded" width="20%" />
                </div>
                <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
            <div className="workout-skel-div">
                <div className="workout-skel-mini">
                <Skeleton variant="rounded" width="50%" />
                <Skeleton variant="rounded" width="20%" />
                </div>
                <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
            <div className="workout-skel-div">
                <div className="workout-skel-mini">
                <Skeleton variant="rounded" width="50%" />
                <Skeleton variant="rounded" width="20%" />
                </div>
                <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
        </div>

    const handleClickOutside = (e) => {
        if(calendarRef.current && !calendarRef.current.contains(e.target)) {
            setToggleCalendar(false)
        }
    }

    function handleClick(e) {
        console.log(e.target.dataset.exid)
        console.log(e.currentTarget.getAttribute("data-currentex"))
        setExid(e.target.dataset.exid)
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
                    <span onClick={e => handleToggleCalendar(e)} className="material-symbols-outlined calendar-icon">
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
                        onChange={handleDateChange}
                        value={date}
                        onClickDay={e => console.log(e)}
                        tileClassName={tileClassName}
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
                        toggleDeleteAllEx,
                        setWorkoutData
                    },
                    {
                        setToggleDeleteAllExercisesModal
                    })}
                    toggle={e => toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal)}
                    modalStyles={modalStyles}
                />
            }

            { toggleAddSetModal &&
                <ExerciseDetail
                    toggleAddSet={toggleAddSet}
                    onClick={handleClick}
                    exid={exid}
                    loadExerciseList={loadExerciseList}
                    date={date}
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

            {
                toggleNoteForm &&
                <AddNote
                    handleAddNote={e => handleAddNoteSubmit(e, {
                        AddSetNote,
                        usersInDB,
                        currentUser,
                        date,
                        exid,
                        setId,
                        note,
                        setNote,
                        setCurrentNote,
                        loadExerciseList
                    })}
                    handleNoteChange={handleNoteChange}
                    toggleNote={e => toggleNote(e)}
                    name="note"
                    value={note}
                    date={date}
                    message={currentNote && currentNote}
                    loadExerciseList={loadExerciseList}
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
                        toggleDelete,
                        toggleDeleteSetMessage
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
                {showSkel &&
                    workoutSkels
                }
                {/* workoutData > 0 */}
                { workoutData && !showSkel &&
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="workoutData">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="current-log-inner-container">
                                    <h2>Current Workout {formattedDate}</h2>
                                    <CurrentWorkoutList
                                        data={workoutData && workoutData}
                                        usersInDB={usersInDB}
                                        currentUser={currentUser}
                                        date={date}
                                        handleClick={handleClick}
                                        toggleDel={e => toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)}
                                        toggleEdit={e => toggleEdit(e, setNewSetInfo, setToggleEditSetModal)}
                                        toggleAdd={e => toggleAddSet(e)}
                                        toggleNote={e => toggleNote(e)}
                                    />
                                    {provided.placeholder}
                                </div>
                            
                            )}
                        </Droppable>
                    </DragDropContext>
                }
                {deleteSetMessage && <DeleteMessage />}
                {!showSkel && !workoutData && <h1 className="current-log-title">Workout Log Empty {formattedDate}</h1>}
            </div>
        </div>
    )
}