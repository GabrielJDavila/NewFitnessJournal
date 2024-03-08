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
        // width: props.toggleSearchBar ? "100%" : "0px"
    }

    const searchListStyles = {
        boxShadow: props.toggleSearchBar ? "0 0 8px 2px rgb(197, 197, 197)" : "0 0 0 0",
        width: props.toggleSearchBar ? "100%" : "0"
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

    // addUpdateWorkoutList(docInfo.id, docInfo.name, usersInDB, currentUser)

    const renderedSearchItems = searchData ? searchData.map((exercise, index) => {
        return (
            <div key={index} className="search-item-container">
                <li className="search-query-list-item">
                    {exercise.name}
                </li>
                <button data-id={exercise.id} >Add exercise</button>
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
        {   searchQuery.name.length > 0 ?
            <ul className="search-query-list" style={searchListStyles}>
                {renderedSearchItems}
            </ul>
            :
            ""
        }   
        </div>
    )
}