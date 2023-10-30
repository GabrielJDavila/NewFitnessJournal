import Category from "../components/Category"
import { useState, useEffect } from "react"
import { getCategories, categoriesCollection, editCategoryName, retrieveDoc } from "../firebase"

export default function AllCategories() {
    const [toggleEditModal, setToggleEditModal] = useState(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
    const [editCategoryTitle, setEditCategoryTitle] = useState({
        title: ""
    })
    const [title, setTitle] = useState({
        title: ""
    })
    const [loadedCategories, setLoadedCategories] = useState([])
    const [currentId, setCurrentId] = useState(null)

    async function loadData() {
        try {
            const data = await getCategories(categoriesCollection)
            setLoadedCategories(data)
        } catch(e) {
            console.log("error retrieving data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // async function loadSingleDoc

    const renderedCategories = loadedCategories.map(obj => {
        return (
            <Category
                key={obj.id}
                id={obj.id}
                name={obj.name}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
            />
        )
    })

    function handleEditSubmit(e) {
        e.preventDefault()
        editCategoryName(categoriesCollection, currentId, editCategoryTitle.title)
        loadData()
        toggleEdit()
    }

    function toggleDelete() {
        setOpenConfirmDeleteModal(prev => !prev)
    }

    function toggleEdit(e) {
        setToggleEditModal(prev => !prev)
        const itemId = e.target.dataset.id
        setCurrentId(itemId)
        clearForm()
    }

    function handleChange(name, value) {
        setEditCategoryTitle(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function clearForm() {
        setEditCategoryTitle(prev => ({
            title: ""
        }))
    }

    const modalStyles = {
        position: "absolute",
        right: "50px",
        left: "50px",
        background: "white"
    }

    const editModal =
        <form onSubmit={handleEditSubmit} className="edit-modal" style={modalStyles}>
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
            {loadedCategories && renderedCategories}
        </div>
    )
}