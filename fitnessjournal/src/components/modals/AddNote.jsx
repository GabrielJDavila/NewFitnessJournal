import { useEffect } from "react"

export default function AddNote(props) {
    let noteMessage = ''
    if(!props.alreadySavedWorkout) {
        const date = new Date(props.date)
        const convertedDate = date.toISOString()
        const filteredWorkoutDataByDate = props.workoutData ? props.workoutData.filter(exercise => exercise.date === convertedDate) : null
        const filteredEx = filteredWorkoutDataByDate ? filteredWorkoutDataByDate.filter(exercise => exercise.id === props.currentEx) : null
        const filteredSet = filteredEx ? filteredEx[0].setsReps.find(set => set.setId === props.currentSet) : null
        noteMessage = filteredSet.note ? filteredSet.note : ""
    } 
    // need to fix issue with saved workout notes not rendering properly.
    else if(props.alreadySavedWorkout) {
        const filteredWorkoutDataByDate = props.workoutData ? props.workoutData.filter(exercise => new Date(exercise.date).toISOString() === new Date(props.date).toISOString()) : null
        const filteredEx = filteredWorkoutDataByDate ? filteredWorkoutDataByDate.filter(exercise => exercise.id === props.currentEx) : null
        const filteredSet = filteredEx ? filteredEx[0].setsReps.find(set => set.setId === props.currentSet) : null
        noteMessage = filteredSet.note ? filteredSet.note : ""
    }
    
    
    useEffect(() => {
        if(props.note) {
            props.loadExerciseList(props.date)
        }
    }, [props.message])
    return (
        <form onSubmit={e => props.addSetNote(e)} className="note-form">
            <h2 className="note-title">Add Note</h2>
            <span data-closenote={true} onClick={e => props.toggleNote(e)} class="material-symbols-outlined close-note">
                close
            </span>
            <p className="note-text">Note: {noteMessage}</p>
            <textarea
                name={props.name}
                value={props.value}
                placeholder="write note here..."
                className="note"
                onChange={e => props.handleNoteChange(e.target.value)}
                required
            ></textarea>
            <button type="submit">Add note</button>
        </form>
    )
}