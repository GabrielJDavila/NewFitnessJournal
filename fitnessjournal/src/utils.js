
export function handleDeleteExerciseSubmit(e, deleteCategory, currentWorkoutList, currentItemToDelete, loadExerciseList, toggleDelete) {
    e.preventDefault()
    deleteCategory(currentWorkoutList, currentItemToDelete.exIdToDelete)
    loadExerciseList()
    toggleDelete(e)
}

function handleEditSetSubmit(e, editSingleSet, newSetInfoExId, newSetInfoSetId, newSetInfoReps, newSetInfoWeight, currentWorkoutList, loadExerciseList, toggleEdit) {
    e.preventDefault()
    editSingleSet(newSetInfoExId, newSetInfoSetId, newSetInfoReps, newSetInfoWeight, currentWorkoutList)
    loadExerciseList()
    toggleEdit(e)
}

function handleDeleteSetSubmit(e) {
    e.preventDefault()
    deleteSingleSet(currentWorkoutList, currentItemToDelete.exIdToDelete, currentItemToDelete.setIdToDelete)
    loadExerciseList()
    toggleDelete(e)
}