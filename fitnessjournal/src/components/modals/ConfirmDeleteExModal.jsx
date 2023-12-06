
export default function ConfirmDeleteExModal(props) {

    return (
        <form onSubmit={(e) => props.handleDeleteExercise(e)} className="confirm-delete-modal" style={props.modalStyles}>
            <div className="edit-set-title-container">
                <h2>Delete Exercise</h2>
                <i
                    onClick={props.toggle}
                    data-closedeletemodal
                    className="fa-solid fa-close edit-set-close"
                ></i>
            </div>
            <p>Are you sure you want to delete exercise?</p>
            <div className="confirm-delete-modal-btns-container">
                <p onClick={(e) => props.toggle(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>

        // <form onSubmit={(e) => handleDeleteExerciseSubmit(e)} className="confirm-delete-modal" style={modalStyles}>
        //     <div className="edit-set-title-container">
        //         <h2>Delete Exercise</h2>
        //         <i
        //             onClick={toggleDelete}
        //             data-closedeletemodal
        //             className="fa-solid fa-close edit-set-close"
        //         ></i>
        //     </div>
        //     <p>Are you sure you want to delete exercise?</p>
        //     <div className="confirm-delete-modal-btns-container">
        //         <p onClick={(e) => toggleDelete(e)} className="cancel-btn">cancel</p>
        //         <button className="confirm-btn">delete</button>
        //     </div>
        // </form>
    )
}