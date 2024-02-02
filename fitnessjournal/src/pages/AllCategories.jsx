import Category from "../components/Category"
import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { getAllCategories, usersInDB, editCategoryName, deleteCategory } from "../firebase"
import BackBtn from "../components/BackBtn"

export default function AllCategories() {
    const [toggleEditModal, setToggleEditModal] = useState(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
    const [loadedCategories, setLoadedCategories] = useState([])
    const [currentId, setCurrentId] = useState(null)
    const [editCategoryTitle, setEditCategoryTitle] = useState({
        title: ""
    })
    const { currentUser } = useOutletContext()

    async function loadData() {
        try {
            const data = await getAllCategories(usersInDB, currentUser)
            setLoadedCategories(data)
        } catch(e) {
            console.log("error retrieving data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function handleEditSubmit(e) {
        e.preventDefault()
        editCategoryName(usersInDB, currentUser, currentId, editCategoryTitle.title)
        loadData()
        toggleEdit()
    }

    function handleDeleteSubmit(e) {
        e.preventDefault()
        deleteCategory(usersInDB, currentUser, currentId)
        loadData()
        toggleDelete()
    }

    function toggleDelete(e) {
        setOpenConfirmDeleteModal(prev => !prev)
        const itemId = e.target.dataset.delete
        setCurrentId(itemId)
    }

    function toggleEdit(e) {
        setToggleEditModal(prev => !prev)
        const itemId = e.target.dataset.edit
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
        <form onSubmit={(e) => handleEditSubmit(e)} className="edit-modal" style={modalStyles}>
            <h2>Edit Category</h2>
            <input
                name="title"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={editCategoryTitle.title}
                className="edit-cat-input"
                placeholder="new category name"
            />
            <div className="edit-modal-btns-container">
                <p onClick={(e) => toggleEdit(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">save</button>
            </div>
        </form>
    
    const confirmDeleteModal =
        <form onSubmit={(e) => handleDeleteSubmit(e)} className="confirm-delete-modal" style={modalStyles}>
            <h2>Delete Category</h2>
            <p>Are you sure you want to delete Cat. Name?</p>
            <div className="confirm-delete-modal-btns-container">
                <p onClick={(e) => toggleDelete(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>

    const renderedCategories = loadedCategories.map(obj => {
        return (
            <Category
                key={obj.id}
                id={obj.id}
                name={obj.name}
                toggleEdit={(e) => toggleEdit(e)}
                toggleDelete={(e) => toggleDelete(e)}
            />
        )
    })

    return (
        <div className="all-ex-page-container">
            <form className="search-ex-form">
                <BackBtn />
                <input
                    type="search"
                    placeholder="search exercise"
                    className="search-ex-input"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </form>
            {toggleEditModal && editModal}
            {openConfirmDeleteModal && confirmDeleteModal}
            {loadedCategories && renderedCategories}
            <Link to="NewCat">Create Some Workout Categories!</Link>
        </div>
    )
}