import { useState, useEffect } from "react"
import { Link, useParams, useOutletContext } from "react-router-dom"
import { retreiveExFromCategory, retrieveSelectedCatName, usersInDB } from "../firebase"
import CategoryNav from "../components/CategoryNav"
import Exercise from "../components/Exercise"
import { Skeleton } from "@mui/material"
import ExAdded from "../components/modals/ExAdded"

export default function LoadedExercises() {
    const params = useParams()
    const [exercises, setExercises] = useState([])
    const [hideSkeleton, setHideSkeleton] = useState(false)
    const [selectedCat, setSelectedCat] = useState({
        name: ""
    })
    const [clickedEx, setClickedEx] = useState("")
    const { currentUser } = useOutletContext()
    const [toggleModal, setToggleModal] = useState(false)
    
    useEffect(() => {
        loadExercisesData()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const skeletonArr = Array.from({length: 7}, (_, index) => index)

    const renderedSkelCategories = skeletonArr.map((_, index) => {
        return (
            <div key={index} className="skeleton-cat-container">
                <Skeleton width="50%" height={50}/>
                <Skeleton width={75} height={50}/>
            </div>
        )
    })

    async function loadExercisesData() {
        try {
            const catNameData = await retrieveSelectedCatName(usersInDB, currentUser, params.id)
            setSelectedCat(prev => ({
                ...prev,
                name: catNameData
            }))

            const data = await retreiveExFromCategory(usersInDB, currentUser, params.id)
            setExercises(data)
            setHideSkeleton(true)
        } catch(e) {
            console.log("error retrieving data: ", e)
        }
    }

    const renderedExercises = exercises.map(exercise => {
        return (
            exercises.length >= 1 ?
            <Exercise
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                scheme={exercise.scheme}
                unit={exercise.weightUnit}
                toggleEdit={(e) => toggleEdit(e)}
                toggleDelete={(e) => toggleDelete(e)}
                toggleModal={toggleModal}
                setToggleModal={setToggleModal}
                setClickedEx={setClickedEx}
            /> :
            <h1 className="current-log-title">No Exercises Exist in Category!</h1>
        )

    })

    return (
        <div className="rendered-ex-container">
            <CategoryNav
                reloadExData={loadExercisesData}
                currentCatId={selectedCat.name}
            />
            <div className="rendered-ex-header">
                <h2 className="selected-cat-title">
                {
                    !hideSkeleton ? <Skeleton width={100}/> : selectedCat.name
                }
                </h2>
            </div>
            <div className="rendered-ex-list">
                {
                    !hideSkeleton ? renderedSkelCategories : renderedExercises
                }
            </div>
            { toggleModal && <ExAdded text={clickedEx}/> }
        </div>
        
    )
}