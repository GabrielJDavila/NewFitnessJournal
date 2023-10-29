import Category from "../components/Category"
import { useState } from "react"

export default function AllCategories() {
    const [toggleEditModal, setToggleEditModal] = useState(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
    const [editCategoryTitle, setEditCategoryTitle] = useState({
        title: ""
    })
    const [title, setTitle] = useState({
        title: ""
    })
    console.log(editCategoryTitle.title)

    function toggleDelete() {
        setOpenConfirmDeleteModal(prev => !prev)
    }

    function toggleEdit() {
        setToggleEditModal(prev => !prev)
    }

    function handleChange(name, value) {
        setEditCategoryTitle(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit() {
        
    }

    const modalStyles = {
        position: "absolute",
        right: "50px",
        left: "50px",
        background: "white"
    }

    const editModal =
        <form className="edit-modal" style={modalStyles}>
            <h2>Edit Category</h2>
            <input
                name="title"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={editCategoryTitle.title}
                className="edit-cat-input"
                placeholder="new category name"
            />
            <div className="edit-modal-btns-container">
                <p onClick={toggleEdit} className="cancel-btn">cancel</p>
                <button className="confirm-btn">save</button>
            </div>
        </form>
    
    const confirmDeleteModal =
        <div className="confirm-delete-modal" style={modalStyles}>
            <h2>Delete Category</h2>
            <p>Are you sure you want to delete Cat. Name?</p>
            <div className="confirm-delete-modal-btns-container">
                <p onClick={toggleDelete} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </div>

    return (
        <div className="all-ex-page-container">
            <form className="search-ex-form">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="search"
                    placeholder="search exercise"
                    className="search-ex-input"
                />
            </form>
            {toggleEditModal && editModal}
            {openConfirmDeleteModal && confirmDeleteModal}
            <Category name={editCategoryTitle.title} toggleEdit={toggleEdit} toggleDelete={toggleDelete}/>
            <Category name={"Back"} toggleEdit={toggleEdit} toggleDelete={toggleDelete}/>
            <Category name={"Chest"} toggleEdit={toggleEdit} toggleDelete={toggleDelete}/>
        </div>
    )
}