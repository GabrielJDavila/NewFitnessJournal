import { useEffect, useState } from "react"
import { doc } from "firebase/firestore"
import { getCategories, categoriesCollection, addToCategory } from "../firebase"

export default function NewEx() {
    const [newExFormData, setNewExFormData] = useState({
        name: "",
        category: "",
        scheme: "",
        weightUnit: ""
    })
    const [loadedCategories, setLoadedCategories] = useState([])
    const [toggleMessageState, setToggleMessageState] = useState(false)

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
            addToCategory(newExFormData.name, newExFormData.scheme, newExFormData.weightUnit, categoriesCollection, selectedCategory.id)
            clearForm()
            toggle()
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
            <label htmlFor="new-ex-name">Name</label>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                value={newExFormData.name}
                id="new-ex-name"
                placeholder="exercise name"
                className="new-ex-name"
            />

            <label htmlFor="categories-dropdown-menu">Category</label>
            <select
                name="category"
                onChange={e => handleChange(e.target.name, e.target.value, setNewExFormData)}
                id="categories-dropdown-menu"
                className="categories-dropdown"
                defaultValue={newExFormData.category}
            >
                <option value="">-- select --</option>
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
            <button className="confirm-btn">add exercise</button>
            { toggleMessageState && <p className="message">exercise saved!</p>}
        </form>
    )
}