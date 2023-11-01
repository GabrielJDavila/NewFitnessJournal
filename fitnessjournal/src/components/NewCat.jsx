import { useState } from "react"
import { addNewCategory, categoriesCollection } from "../firebase"

export default function NewCat() {
    const [newCatName, setNewCatName] = useState({
        name: ""
    })

    console.log(newCatName.name)
    function handleSubmit(e) {
        e.preventDefault()
        addNewCategory(newCatName.name, categoriesCollection)
    }

    function handleChange(name, value, stateSetter) {
        stateSetter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="new-cat-container">
            <h3 className="new-cat-title">New Category</h3>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value, setNewCatName)}
                className="new-cat"
                required
            />
            <div className="new-cat-btns-container">
                <p className="cancel-btn">cancel</p>
                <button className="confirm-btn">save</button>
            </div>
        </form>
    )
}