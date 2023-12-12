import BackBtn from "../BackBtn"

export default function EditSetModal(props) {
    return (
        <form onSubmit={(e) => props.handleEditSet(e)} className="edit-set-modal" style={props.modalStyles}>
            <div className="edit-set-title-container">
                <h2 className="edit-set-title">Edit Set</h2>
                <i
                    onClick={props.toggle}
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <div className="new-reps-container">
                <p className="edit-set-text">rep:</p>
                <input
                    name="reps"
                    onChange={e => props.handleChange(e.target.name, e.target.value)}
                    value={props.title}
                    className="edit-set-input"
                />
            </div>
            <div className="new-weight-container">
                <p className="edit-set-text">lbs:</p>
                <input
                    name="weight"
                    onChange={e => props.handleChange(e.target.name, e.target.value)}
                    value={props.title}
                    className="edit-set-input"
                />
            </div>
            <button className="confirm-edit-set-btn">confirm</button>
        </form>
    )
}