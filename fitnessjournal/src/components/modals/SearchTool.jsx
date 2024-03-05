import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { searchAllExercises, usersInDB } from "../../firebase"

export default function SearchTool(props) {
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })
    const { currentUser } = useOutletContext()
  
    const searchStyles = {
        height: props.toggleSearchBar ? "50px" : "0px",
        width: props.toggleSearchBar ? "100%" : "0px"
    }

    useEffect(() => {
        searchAllExercises(usersInDB, currentUser)
    }, [])

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className="search-container" style={searchStyles}>
        <form className="search-tool" style={searchStyles}>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={searchQuery.name}
                className="search-ex-input"
                placeholder="search exercise"
                style={searchStyles}
            />
        </form>
        </div>
    )
}