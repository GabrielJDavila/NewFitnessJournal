

export default function AddNote(props) {
    return (
        <form onSubmit={props.handleAddNote} className="note-form">
            <h2 className="note-title">Add Note</h2>
            <span data-closenote={true} onClick={e => props.toggleNote(e)} class="material-symbols-outlined close-note">
                close
            </span>
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