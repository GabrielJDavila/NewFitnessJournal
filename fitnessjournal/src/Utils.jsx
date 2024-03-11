
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
    await loadExerciseList(e)
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
        await loadExerciseList(e)
        toggleEdit(e, setNewSetInfo, setToggleEditSetModal)
    } catch(e) {
        console.log("error", e)
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
    toggleDelete 
}, 
{ 
    setCurrentItemToDelete,
    setToggleDeleteExModal,
    setToggleDeleteSetModal 
}) {
    e.preventDefault()
    await deleteSingleSet(usersInDB, currentUser, date, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
    await loadExerciseList(e)
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