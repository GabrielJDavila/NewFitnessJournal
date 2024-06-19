import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { getAllCategories, usersInDB, addExToCategory } from "../firebase"

export default function NewEx(props) {
    const [newExFormData, setNewExFormData] = useState({
        name: "",
        category: props.currentCatId? props.currentCatId : "",
        scheme: "",
        weightUnit: ""
    })
    const [loadedCategories, setLoadedCategories] = useState([])
    const [toggleMessageState, setToggleMessageState] = useState(false)
    const { currentUser } = useOutletContext()
    const { categoryId } = useParams()
    
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

    useEffect(() => {
        if(toggle) {
            const timeout = setTimeout(() => {
                setToggleMessageState(false)
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [toggle])

    function handleSubmit(e) {
        e.preventDefault()
        const selectedCategory = loadedCategories.find(cat => cat.name === newExFormData.category)
        if(selectedCategory) {
            const flip = true
            addExToCategory(usersInDB, currentUser, newExFormData.name, selectedCategory.id)
            clearForm()
            toggle()
            props.reloadExData()
            props.flipNewExModal(flip)
        } else {
            console.log("invalid category selected")
        }
    }

    function handleChange(name, value, stateSetter) {
        stateSetter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const renderedCategories = loadedCategories.map(obj => {
        return (
            <option value={obj.name} key={obj.id}>
                {obj.name}
            </option>
        )
    })

    function clearForm() {
        setNewExFormData({
            name: "",
            category: "",
            scheme: "",
            weightUnit: ""
        })
    }

    function toggle() {
        setToggleMessageState(prev => !prev)
    }


    return (
        <form onSubmit={handleSubmit} className="add-ex-form">
            <span onClick={props.toggleModal} className="material-symbols-outlined close-add-ex" data-addex>
                cancel
            </span>
            <label htmlFor="new-ex-name">Name</label>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                value={newExFormData.name}
                id="new-ex-name"
                placeholder="exercise name"
                className="new-ex-name"
                required
            />

            <label htmlFor="categories-dropdown-menu">Category</label>
            <select
                name="category"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                id="categories-dropdown-menu"
                className="categories-dropdown"
                defaultValue={newExFormData.category}
            >
                <option value={props.currentCatId ? props.currentCatId : ""}>{props.currentCatId ? props.currentCatId : "-- select --"}</option>
                {loadedCategories && renderedCategories}
            </select>

            <label htmlFor="ex-type-dropdown">Type</label>
            <select
                name="scheme"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                id="ex-type-dropdown"
                className="ex-scheme"
                defaultValue={newExFormData.type}
            >
                <option value="">-- select --</option>
                <option value="weight-reps">weight and reps</option>
                <option value="weight-time">Weight and time</option>
                <option value="weight-distance">Weight and distance</option>
            </select>

            <label htmlFor="weight-unit-dropdown">Weight Unit</label>
            <select
                name="weightUnit"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                id="weight-unit-dropdown"
                className="weight-unit"
                defaultValue={newExFormData.weightUnit}
            >
                <option value="">-- select --</option>
                <option value="weight-lbs">lbs</option>
                <option value="weight-kg">kg</option>
            </select>
            <div onClick={props.flipNewExModal} data-closenewex>
            <button className="confirm-btn" data-closenewex>add exercise</button>
            </div>
            
            { toggleMessageState && <p className="message">exercise saved!</p>}
        </form>
    )
}