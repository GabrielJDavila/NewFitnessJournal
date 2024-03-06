import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { searchAllExercises, usersInDB } from "../../firebase"

export default function SearchTool(props) {
    const [searchData, setSearchData] = useState()
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })
    const { currentUser } = useOutletContext()
    console.log(searchData)
    const searchStyles = {
        height: props.toggleSearchBar ? "50px" : "0px",
        width: props.toggleSearchBar ? "100%" : "0px"
    }

    useEffect(() => {
        loadSearchData()
    }, [searchQuery])

    async function loadSearchData() {
        try {
            const data = await searchAllExercises(usersInDB, currentUser, searchQuery.name)
            setSearchData(data)
        } catch(e) {
            console.error("error retrieving search queries:", e)
        }
    }

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const renderedSearchItems = searchData ? searchData.map((exercise, index) => {
        return (
            <div key={index} className="search-item-container">
                <li className="search-query-list-item">
                    {exercise}
                </li>
                <button>Add exercise</button>
            </div>
        )
    }) : ""
    
    return (
        <div className="search-container" style={searchStyles}>
        <div className="search-tool" style={searchStyles}>
            <input
                type="text"
                name="name"
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={searchQuery.name}
                className="search-ex-input"
                placeholder="search exercise"
                style={searchStyles}
            />
        </div>
        <ul className="search-query-list">
            {renderedSearchItems}
        </ul>
        </div>
    )
}