
// handles result of user clicking Delete Log
export function handleDeleteAllExSubmit(e, {
    deleteAllEx,
    usersInDB,
    currentUser,
    date,
    loadExerciseList,
    toggleDeleteAllEx
},
{
    setToggleDeleteAllExercisesModal
}) {
    e.preventDefault()
    try {
        deleteAllEx(usersInDB, currentUser, date)
        loadExerciseList(date)
        toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal)
    } catch(err) {
        console.error("error deleting log: ", err)
    }
}
// async function deleteAll() {
//     try {
//        await deleteAllEx(usersInDB, currentUser, date)
//        await loadExerciseList(date)
//     } catch(e) {
//         console.log("error deleting doc: ", e)
//     }
// }

// handles result of user confirming 
export function handleDeleteExerciseSubmit(e, {
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
    deleteEx(usersInDB, currentUser, date, currentItemToDelete.exIdToDelete)
    loadExerciseList(e)
    toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)
}

// handles the result of user clicking confirm of EditSetModal.
export function handleEditSetSubmit(e, {
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
        editSingleSet(newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, usersInDB, currentUser, date)
        loadExerciseList(e)
        toggleEdit(e, setNewSetInfo, setToggleEditSetModal)
    } catch(e) {
        console.log("error", e)
    }
    
}

// // handles the result of user clicking confirm of ConfirmDeleteSetModal.
export function handleDeleteSetSubmit(e, { 
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
}) {
    e.preventDefault()
    deleteSingleSet(usersInDB, currentUser, date, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
    loadExerciseList(e)
    toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal)
}

// Toggles deleteAllEx modal
export function toggleDeleteAllEx(e, setToggleDeleteAllExercisesModal) {
    setToggleDeleteAllExercisesModal(prev => !prev)
}

// Toggles delete set or delete exercise modal
export function toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal) {
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

// Toggles the edit set modal.
export function toggleEdit(e, setNewSetInfo, setToggleEditSetModal) {
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

// function to load current exercise/workout list
// export async function loadExerciseList(retrieveCurrentExSetsReps, currentWorkoutList, setWorkoutData) {
//     try {
//         const setsData = await retrieveCurrentExSetsReps(currentWorkoutList)
//         setWorkoutData(setsData)
//     } catch(e) {
//         console.log("error fetching exercises list: ", e)
//     }
// }


// functions below were from dashboard.jsx. Keeping for now 
// handleDeleteExerciseSubmit(e, deleteCategory, currentWorkoutList, currentItemToDelete, loadExerciseList, toggleDelete)
        // e.preventDefault()
        // deleteCategory(currentWorkoutList, currentItemToDelete.exIdToDelete)
        // loadExerciseList()
        // toggleDelete(e)
    

    // handleEditSetSubmit(e, editSingleSet, newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, currentWorkoutList, loadExerciseList, toggleEdit) {
    //     e.preventDefault()
    //     editSingleSet(newSetInfo.exId, newSetInfo.setId, newSetInfo.reps, newSetInfo.weight, currentWorkoutList)
    //     loadExerciseList()
    //     toggleEdit(e)
    // }

    // handleDeleteSetSubmit(e, deleteSingleSet, currentWorkoutList, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete, loadExerciseList, toggleDelete) {
    //     e.preventDefault()
    //     deleteSingleSet(currentWorkoutList, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
    //     loadExerciseList()
    //     toggleDelete(e)
    // }