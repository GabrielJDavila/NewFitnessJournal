import Category from "../components/Category"
import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { getAllCategories, usersInDB, editCategoryName, deleteCategory, previewWorkoutRoutines } from "../firebase"
import CategoryNav from "../components/CategoryNav"
import NewCat from "../components/NewCat"
import NewEx from "./NewEx"
import ProgramPreview from "../components/ProgramPreview"
import { Skeleton } from "@mui/material"
import RenderedCategories from "../components/RenderedCategories"

export default function AllCategories() {
    const [toggleEditModal, setToggleEditModal] = useState(false)
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
    const [loadedCategories, setLoadedCategories] = useState(() => {
        const savedCategoriesData = JSON.parse(localStorage.getItem("categories"))
        return savedCategoriesData ? savedCategoriesData : []
    })
    const [loadedRoutines, setLoadedRoutines] = useState(() => {
        const savedRoutineData = JSON.parse(localStorage.getItem("existingPrograms"))
        return savedRoutineData ? savedRoutineData : []
    })
   
    const [hideCategories, setHideCategories] = useState(false)
    const [hideRoutines, setHideRoutines] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [editCategoryTitle, setEditCategoryTitle] = useState({
        title: ""
    })
    const [selectedValueOption, setSelectedValueOption] = useState({
        selectedValue: "all exercises"
    })
    const { currentUser } = useOutletContext()
    const skeletonArr = Array.from({length: 7}, (_, index) => index)
    // create if statement: if state equals one value, load categories; if state equals
    // another value, load existing programs; if state equals last value, create program.
    async function loadData() {
        try {
            if(selectedValueOption.selectedValue === "all exercises") {
                setHideRoutines(true)
                setHideCategories(false)
                const data = await getAllCategories(usersInDB, currentUser)
                if(data) {
                    localStorage.setItem("categories", JSON.stringify(data))
                    setLoadedCategories(data)
                }
            } else if (selectedValueOption.selectedValue === "existing programs") {
                setHideCategories(true)
                setHideRoutines(false)
                const data = await previewWorkoutRoutines(currentUser, usersInDB)
                if(data) {
                    localStorage.setItem("existingPrograms", JSON.stringify(data))
                    setLoadedRoutines(data)
                }
            } else if (selectedValueOption.selectedValue === "create a program") {
                console.log("create a program")
            }
        } catch(e) {
            console.error("error retrieving data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [selectedValueOption.selectedValue])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

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

    function handleSelectChange(name, value) {
        setSelectedValueOption(prev => ({
            ...prev,
            [name]: value
        }))
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
        position: "fixed",
        top: "100px",
        right: "0px",
        left: "0px",
        bottom: "100px",
        padding: "0 2rem",
        background: "white"
    }

    const editModal =
        <form onSubmit={(e) => handleEditSubmit(e)} className="edit-modal" style={modalStyles}>
            <h2 className="modal-title">Edit Category</h2>
            <input
                type="text"
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
            <h2 className="modal-title">Delete Category</h2>
            <p>Are you sure you want to delete Cat. Name?</p>
            <div className="confirm-delete-modal-btns-container">
                <p onClick={(e) => toggleDelete(e)} className="cancel-btn">cancel</p>
                <button className="confirm-btn">delete</button>
            </div>
        </form>
    
    return (
        <div className="all-cats-container">
            <CategoryNav
                toggleModal={e => toggleModal(e)}
                loadData={loadData}
            />
            <select
                name="selectedValue"
                value={selectedValueOption.selectedValue}
                onChange={e => handleSelectChange(e.target.name, e.target.value)}
                className="all-categories-select-menu"
            >
                <option value="all exercises">All Exercises</option>
                <option value="existing programs">Existing Programs</option>
                <option value="create a program">Create Program</option>
            </select>

            <div className="all-ex-page-container">
                {toggleEditModal && editModal}
                {openConfirmDeleteModal && confirmDeleteModal}
                {
                    !hideCategories && 
                    <RenderedCategories loadedCategories={loadedCategories} skeletonArr={skeletonArr} />
                }
                {
                    !hideRoutines && 
                    <ProgramPreview loadedRoutines={loadedRoutines}/>
                }
            </div>
        </div>
    )
}