import { useState } from "react"

export default function SearchAllFoods() {
    const [searchQuery, setSearchQuery] = useState({
        query: ""
    })

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form>
            <h2>Search Foods</h2>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={searchQuery.query}
                className="search-ex-input food-search"
                placeholder="search food"
            />
        </form>
    )
}