import { useState } from "react"

export default function SearchTool(props) {
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })

    console.log(searchQuery)

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form className="search-tool" style={props.searchStyles}>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={searchQuery.name}
                className="search-ex-input"
                placeholder="search exercise"
            />
        </form>
    )
}