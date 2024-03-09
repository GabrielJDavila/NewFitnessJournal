import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { searchAllExercises, addUpdateWorkoutList, usersInDB } from "../../firebase"
import ExAdded from "./ExAdded"

export default function SearchTool(props) {
    const [searchData, setSearchData] = useState()
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })
    const [exNameMessage, setExNameMessage] = useState({
        name: ""
    })
    const [toggleNewExModal, setToggleNewExModal] = useState(false)
    const { currentUser } = useOutletContext()

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

    useEffect(() => {
        if(toggleNewExModal) {
            const flipModalState = setTimeout(() => {
                setToggleNewExModal(false)
            }, 3000)

            return () => clearTimeout(flipModalState)
        }
    }, [toggleNewExModal])

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

    function handleAddClick(e) {
        const exId = e.target.dataset.id
        const exName = e.target.dataset.name
        
        if(exId) {
            addUpdateWorkoutList(exId, exName, usersInDB, currentUser)
            setExNameMessage(prev => ({...prev, name: exName}))
            setToggleNewExModal(true)
        }
    }
    // addUpdateWorkoutList(docInfo.id, docInfo.name, usersInDB, currentUser)

    const renderedSearchItems = searchData ? searchData.map((exercise, index) => {
        return (
            <div key={index} className="search-item-container">
                <li className="search-query-list-item">
                    {exercise.name}
                </li>
                <button onClick={handleAddClick} data-id={exercise.id} data-name={exercise.name}>Add exercise</button>
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
            <span onClick={props.toggleModal} data-close className="material-symbols-outlined close-search">
                close
            </span>
        </div>
        {toggleNewExModal && <ExAdded exName={exNameMessage.name}/>}
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