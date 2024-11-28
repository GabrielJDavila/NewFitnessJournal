import { useEffect } from "react"

export default function AddNote(props) {
    const filteredEx = props.workoutData ? props.workoutData.filter(exercise => exercise.id === props.currentEx) : ""
    const filteredSet = filteredEx[0].setsReps.find(set => set.setId === props.currentSet)
    const noteMessage = filteredSet.note ? filteredSet.note : ""
    console.log(noteMessage)

    useEffect(() => {
        if(props.message) {
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