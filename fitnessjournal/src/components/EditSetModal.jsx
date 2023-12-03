
export default function EditSetModal() {
    return (
        <form className="edit-set-modal">
            <div className="edit-set-title-container">
                <h2 className="edit-set-title">Edit Set</h2>
                <i
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            
            <div className="new-reps-container">
                <p className="edit-set-text">rep:</p>
                <input className="edit-set-input"/>
            </div>
            <div className="new-weight-container">
                <p className="edit-set-text">lbs:</p>
                <input className="edit-set-input"/>
            </div>
        </form>
    )
}