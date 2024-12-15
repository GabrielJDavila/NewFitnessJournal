import { useState, useEffect, useRef } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveCurrentExSetsRepsAndPRs, editSingleSet, deleteEx, deleteSingleSet, deleteAllEx, reOrderWorkoutList, retrieveAllWorkouts, AddSetNote, saveDataToFirestore } from "../firebase"
import ConfirmDeleteAllExModal from "../components/modals/ConfirmDeleteAllEx"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import AddNote from "../components/modals/AddNote"
import TimerModal from "../components/modals/TimerModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit, handleDeleteAllExSubmit, toggleAddSet, toggleEdit, toggleDelete, toggleDeleteAllEx } from "../Utils"
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
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())
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
        note: "",
        exId: "",
        setId: "",
        setIndex: ""
    })
    const [note, setNote] = useState("")
    const [currentNote, setCurrentNote] = useState("")
    const [showSkel, setShowSkel] = useState(true)
    const calendarRef = useRef(null)
    const stringDate = date.toISOString().split("T")[0]
    const [year, month, day] = stringDate.split("-")
    const formattedDate = `${month}/${day}/${year}`
    const [savedWorkout, setSavedWorkout] = useState(false)
    const [alreadySavedWorkout, setAlreadySavedWorkout] = useState(false)
    
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

    useEffect(() => {
        if(savedWorkout) {
            const timout = setTimeout(() => {
                setSavedWorkout(false)
            }, 3000)

            return () => clearTimeout(timout)
        }
        if(alreadySavedWorkout) {
            const secondTimout = setTimeout(() => {
                setAlreadySavedWorkout(false)
            }, 3000)

            return () => clearTimeout(secondTimout)
        }
    }, [savedWorkout, alreadySavedWorkout])

    async function saveWorkout() {
        // this function will save workout to firestore
        try {
            const result = await saveDataToFirestore(date, usersInDB, currentUser, filteredDateWorkoutData)
            if(result.success) {
                setSavedWorkout(true)
                console.log(result.message)
            } else {
                setAlreadySavedWorkout(true)
                console.warn(result.message)
            }
        } catch(err) {
            console.error('error saving data: ', err)
        }
    }
    
    async function loadExerciseList(date) {
        // setWorkoutData(JSON.parse(localStorage.getItem("exercises")) || [])
        // setShowSkel(false)
        // try to pull workout from firestore. if no workout exists, pull from localStorage. if none exist, create empty array.
        try {
            const data = await retrieveCurrentExSetsRepsAndPRs(usersInDB, currentUser, date)
            // for now, this works. But I need to be aware of certain use cases:
            // if the user is on an unsaved day, creates a workout, then switches days
            // to view another day and then returns to the current day, the data will be lost
            // because of localStorage.clear(). Currently I'm using it because it
            // clears the data to make way for either saved workout data or local storage data.
            // Need to work on this.
            if(data.exercises) {
                
                // console.log(data)
                // const jsonString = JSON.stringify(data)
                // const sizeInBytes = new Blob([jsonString]).size
                localStorage.setItem("workoutData", JSON.stringify(data.exercises))
                setWorkoutData(data.exercises)
                setShowSkel(false)
            } else {
                console.log(JSON.parse(localStorage.getItem("exercises")))
                setWorkoutData(JSON.parse(localStorage.getItem("exercises")) || [])
                setShowSkel(false)
            }
            
        } catch(e) {
            console.log("error fetching exercises list: ", e)
        }
    }

    // check to see if workoutData exists. If it does, map through and filter exercises by date.
    const filteredDateWorkoutData = workoutData ? workoutData.map(exercise => {
        const exDate = new Date(exercise.date)
        exDate.setHours(0, 0, 0, 0)
        const dateState = new Date(date)
        dateState.setHours(0, 0, 0, 0)
        if(exDate.getTime() === dateState.getTime()) {
            return exercise
        } else {
            return null
        }
    }).filter(exercise => exercise !== null) : ""
    console.log(filteredDateWorkoutData)
    
    // async function loadWorkoutFromFirestore(date) {
    //     try {
    //         const data = await retrieveCurrentExSetsRepsAndPRs(usersInDB, currentUser, date)
    //         if(data) {
    //             // const jsonString = JSON.stringify(data)
    //             // const sizeInBytes = new Blob([jsonString]).size
                
    //             localStorage.setItem("workoutData", JSON.stringify(data.exercises))
    //             setWorkoutData(data.exercises)
    //             setShowSkel(false)
    //         }
            
    //     } catch(err) {
    //         console.error('error grabbing from firestore: ', err)
    //     }
    // }
    
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
    }

    function handleDateChange(newDate) {
        setDate(newDate)
        localStorage.setItem("selectedDate", newDate.toISOString())
        handleToggleCalendar()
        setSavedWorkout(false)
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
        if(e.target.dataset.setnoteid) {
            const exId = e.target.id
            const setId = e.target.dataset.setnoteid
            const setIndex = e.target.dataset.setindex
            console.log(setIndex)
            // add data-note from curentWorkoutList?
            
        setNewSetInfo(prev => ({
            ...prev,
            exId: exId,
            setId: setId,
            setIndex: setIndex
        }))

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

    const handleClickOutside = (e) => {
        if(calendarRef.current && !calendarRef.current.contains(e.target)) {
            setToggleCalendar(false)
        }
    }

    function handleClick(e) {
        setExid(e.target.dataset.exid)
    }
  
    function editSet(e) {
        e.preventDefault()
        const workoutData = JSON.parse(localStorage.getItem('exercises'))
        const updatedWorkoutData = workoutData.map(exercise => {
            // check to see if exercise matches. If it does, continue with edit
            if(exercise.id === newSetInfo.exId) {
                // creates a shallow copy of setsReps array in given exercise
                const updatedSetsReps = [...exercise.setsReps]
                // updates set at given setIndex with newSetInfo
                updatedSetsReps[newSetInfo.setIndex] = {
                    ...updatedSetsReps[newSetInfo.setIndex],
                    setId: newSetInfo.setId,
                    reps: newSetInfo.reps,
                    weight: newSetInfo.weight
                }
                // returns the exercise info plus the updated sets
                return {
                    ...exercise,
                    setsReps: updatedSetsReps
                }
            }
            // if exercise id doesn't match the exid of the set the user clicks,
            // returns the unchanged exercise so that other exercises remain the same.
            return exercise
        })
        localStorage.setItem('exercises', JSON.stringify(updatedWorkoutData))
        loadExerciseList()
        setToggleEditSetModal(false)
    }

    function deleteSet(e) {
        e.preventDefault()
        const workoutData = JSON.parse(localStorage.getItem('exercises'))
        const updatedWorkoutData = workoutData.map(exercise => {
            // check to see if exercise matches. If it does, continue with deletion
            if(exercise.id === currentItemToDelete.exIdToDelete) {
                // returns exercise with filtered sets that don't match the chosen to delete item.
                return {
                    ...exercise,
                    setsReps: exercise.setsReps.filter(set => set.setid !== currentItemToDelete.setIdToDelete)
                }
            }
            // if exercise id does not match, returns exercise unchanged
            return exercise
        })
        localStorage.setItem('exercises', JSON.stringify(updatedWorkoutData))
        loadExerciseList()
        setToggleDeleteSetModal(false)
    }
    
    function addSetNote(e) {
        e.preventDefault()
        const workoutData = JSON.parse(localStorage.getItem('exercises'))
        const updatedWorkoutData = workoutData.map(exercise => {
            // check to see if exercise matches. If it does, continue with edit
            if(exercise.id === newSetInfo.exId) {
                // creates a shallow copy of setsReps array in given exercise
                const updatedSetsReps = [...exercise.setsReps]
                // updates set at given setIndex with newSetInfo
                updatedSetsReps[newSetInfo.setIndex] = {
                    ...updatedSetsReps[newSetInfo.setIndex],
                    note: note
                }
                // returns the exercise info plus the updated sets
                return {
                    ...exercise,
                    setsReps: updatedSetsReps
                }
            }
            // if exercise id doesn't match the exid of the set the user clicks,
            // returns the unchanged exercise so that other exercises remain the same.
            return exercise
        })
        localStorage.setItem('exercises', JSON.stringify(updatedWorkoutData))
        
        loadExerciseList()
        setCurrentNote(note)
        setNote("")
        setToggleNoteForm(false)
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
                    EditSetClick={e => editSet(e)}
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
                // add note from local storage here. Make sure note is saving!
                    addSetNote={e => addSetNote(e)}
                    workoutData={workoutData}
                    currentEx={newSetInfo.exId && newSetInfo.exId}
                    currentSet={newSetInfo.setId && newSetInfo.setId}
                    setIndex={newSetInfo.setIndex && newSetInfo.setIndex}
                    // Add note for each set to correct set. Right now i have repeating notes!

                    // addNoteClick={addMessage}
                    // handleAddNote={e => handleAddNoteSubmit(e, {
                    //     AddSetNote,
                    //     usersInDB,
                    //     currentUser,
                    //     date,
                    //     exid,
                    //     setId,
                    //     note,
                    //     setNote,
                    //     setCurrentNote,
                    //     loadExerciseList
                    // })}
                    handleNoteChange={handleNoteChange}
                    toggleNote={e => toggleNote(e)}
                    name="note"
                    value={note}
                    date={date}
                    newSetInfo
                    message={currentNote && currentNote}
                    loadExerciseList={loadExerciseList}
                />
            }
            
            { toggleDeleteSetModal &&
                <ConfirmDeleteSetModal
                    deleteSetClick={e => deleteSet(e)}
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
                
                { filteredDateWorkoutData && !showSkel && filteredDateWorkoutData.length > 0 &&
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="workoutData">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="current-log-inner-container">
                                    <h2>Current Workout {formattedDate}</h2>
                                    <button onClick={saveWorkout} className="save-workout-btn">Save workout</button>
                                    <p>{savedWorkout && 'Workout saved.'}</p>
                                    <p>{alreadySavedWorkout && 'Workout is aleady saved.'}</p>
                                    <CurrentWorkoutList
                                        data={filteredDateWorkoutData && filteredDateWorkoutData}
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
                {filteredDateWorkoutData.length === 0 &&
                    <div className="no-current-workout-container">
                        {formattedDate}
                        <p className="no-current-text">No workout for this date</p>
                        <Link to='AllCategories' className="link-btn" >Add some exercises!</Link>
                    </div>
                }
                {deleteSetMessage && <DeleteMessage />}
                {!showSkel && !workoutData && <h1 className="current-log-title">Workout Log Empty {formattedDate}</h1>}
            </div>
        </div>
    )
}