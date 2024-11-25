
// handles result of user clicking Delete Log
export async function handleDeleteAllExSubmit(e, {
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
}) {
    e.preventDefault()
    try {
        await deleteAllEx(usersInDB, currentUser, date)
        await loadExerciseList(date)
        // setWorkoutData([])
        toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal)
    } catch(err) {
        console.error("error deleting log: ", err)
    }
}


// Add delete message on complete, go to WorkoutLog and passi it in
export async function handleDeleteExerciseSubmit(e, {
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
}) {
    e.preventDefault()
    await deleteEx(usersInDB, currentUser, date, currentItemToDelete.exIdToDelete)
    await loadExerciseList(date)
    toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)
}

// handles the result of user clicking confirm of EditSetModal.
export async function handleEditSetSubmit(e, {
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
}) {
    e.preventDefault()
    try {
        await editSingleSet(newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, usersInDB, currentUser, date)
        await loadExerciseList(date)
        toggleEdit(e, setNewSetInfo, setToggleEditSetModal)
    } catch(e) {
        console.log("error", e)
    }
    
}

// handles the result of user clicking comfirm of AddSetModal.
export async function handleAddSetSubmit(e, {
    // addSetsReps,
    // newSetInfo,
    // usersInDB,
    // currentUser,
    // date,
    // loadExerciseList,
    toggleAddSet
},
{
    setToggleAddSetModal
}) {
    e.preventDefault()
    try {
        // await editSingleSet(newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, usersInDB, currentUser, date)
        // await loadExerciseList(e)
        toggleAddSet(e, setToggleAddSetModal)
    } catch(e) {
        console.log("error", e)
    }
    
}

// handles submission of adding notes to sets/exercises.
export async function handleAddNoteSubmit(e, {
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
}) {
    e.preventDefault()
    try {
        AddSetNote(currentUser, usersInDB, date, exid, setId, note)
        setCurrentNote(note)
        setNote("")
    }catch(error) {
        console.error("error handling add note submit: ", error)
    }
}

// // handles the result of user clicking confirm of ConfirmDeleteSetModal.
export async function handleDeleteSetSubmit(e, { 
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
}) {
    e.preventDefault()
    toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)
    toggleDeleteSetMessage()
    // const workoutData = JSON.parse(localStorage.getItem('exercises'))
    // const updatedWorkoutData = workoutData.map(exercise => {
    //     if(exercise.id === currentItemToDelete.exIdToDelete) {
    //         return {
    //             setsReps: exercise.setsReps.filter(set => set.setid !== currentItemToDelete.setIdToDelete)
    //         }
    //     }
    //     return exercise
    // })
    // localStorage.setItem('exercises', JSON.stringify(updatedWorkoutData))
    // await deleteSingleSet(usersInDB, currentUser, date, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
    await loadExerciseList(date)
}

// Toggles deleteAllEx modal
export function toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal) {
    setToggleDeleteAllExercisesModal(prev => !prev)
}

// Toggles delete set or delete exercise modal
export function toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal) {
    console.log(e.target)
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

// Toggles add set state.
export function toggleAddSet(e, setToggleAddSetModal) {
    console.log(e.target.id)
    setToggleAddSetModal(prev => !prev)
}

// Toggles the edit set modal.
export function toggleEdit(e, setNewSetInfo, setToggleEditSetModal) {
    if(e) {
        const exId = e.target.id
        const setId = e.target.dataset.editsetid
        const setIndex = e.target.dataset.setindex

        setNewSetInfo(prev => ({
            ...prev,
            exId: exId,
            setId: setId,
            setIndex: setIndex
        }))
    }
    setToggleEditSetModal(prev => !prev)
}