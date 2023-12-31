
// delete and edit functions for exercises, sets, and reps
export function handleDeleteExerciseSubmit(e, deleteCategory, currentWorkoutList, currentItemToDelete, loadExerciseList, toggleDelete) {
    e.preventDefault()
    deleteCategory(currentWorkoutList, currentItemToDelete.exIdToDelete)
    loadExerciseList(e)
    toggleDelete(e)
}

export function handleEditSetSubmit(e, editSingleSet, newSetInfoExId, newSetInfoSetId, newSetInfoReps, newSetInfoWeight, currentWorkoutList, loadExerciseList, toggleEdit) {
    e.preventDefault()
    editSingleSet(newSetInfoExId, newSetInfoSetId, newSetInfoReps, newSetInfoWeight, currentWorkoutList)
    loadExerciseList(e)
    toggleEdit(e)
}

export function handleDeleteSetSubmit(e, deleteSingleSet, currentWorkoutList, currentItemToDeleteExId, currentItemToDeleteSetId, loadExerciseList, toggleDelete) {
    e.preventDefault()
    deleteSingleSet(currentWorkoutList, currentItemToDeleteExId, currentItemToDeleteSetId)
    loadExerciseList(e)
    toggleDelete(e)
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