import { useEffect } from "react"

export default function AddNote(props) {
    console.log(props.setIndex)

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
            <p className="note-text">Note: {props.message && props.message}</p>
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