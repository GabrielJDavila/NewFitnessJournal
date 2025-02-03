export default function ConfirmDeleteAllExModal(props) {
    return (
        <form onSubmit={e => props.handleDeleteAllEx(e)} className="confirm-delete-modal" style={props.modalStyles}>
            <div className="edit-set-title-container">
                <h2>Delete Workout</h2>
                <i
                    onClick={props.toggle}
                    data-closedeletesetmodal
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <p>Are you sure you want to delete this workout? This cannot be undone.</p>
            <div className="confirm-delete-modal-btns-container">
                <p data-closedeletesetmodal onClick={(e) => props.toggle(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>
    )
}