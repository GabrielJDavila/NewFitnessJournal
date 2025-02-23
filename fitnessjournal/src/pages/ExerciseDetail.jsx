import { useState, useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { addSetsReps, usersInDB} from "../firebase"
import ExDetailBackBtn from "../components/ExDetailBackBtn"
import SetAdded from "../components/modals/SetAdded"
import { v4 as uuidv4 } from 'uuid'

export default function ExerciseDetail(props) {
    // const params = useParams()
    // Check if params ID in local storage matches. If so, then get the wieght/reps in storage; if not, empty state like below
    const [repsAndWeight, setRepsAndWeight] = useState(() => {
        const savedData = localStorage.getItem(props.exid)
        return savedData ? JSON.parse(savedData) : {reps: 0, weight: 0, weightType: ""}
    })
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())
    
    const [showModal, setShowModal] = useState(false)
    const { currentUser } = useOutletContext()
    
    useEffect(() => {
        if(showModal) {
            const flipModalState = setTimeout(() => {
                setShowModal(false)
            }, 4000)

            return () => clearTimeout(flipModalState)
        }
    }, [showModal])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        // Might have to store 3 things at once: params ID, wieght and reps. Check for ID when initializing state.
        localStorage.setItem(props.exid, JSON.stringify(repsAndWeight))
    }, [repsAndWeight])

    function handleAddSetClick(e) {
        e.preventDefault()

        if (repsAndWeight.reps > 0) {
            const newSet = {
                setId: uuidv4(),
                exId: "",
                date: props.date,
                reps: repsAndWeight.reps,
                weight: repsAndWeight.weight,
                note: "",
                setIndex: ""
            }

            if(!props.alreadySavedWorkout) {
                const workoutData = JSON.parse(localStorage.getItem('exercises')) || []
                const updatedWorkoutData = workoutData.map(exercise => {
                    const newDate = new Date(newSet.date)
                    const convertedDate = newDate.toISOString()
                    
                    if (exercise.id === props.exid && exercise.date === convertedDate) {
                        return {
                            ...exercise,
                            setsReps: [...(exercise.setsReps || []), newSet]
                        }
                    }
                    return exercise
                })
                // console.log(updatedWorkoutData)
                localStorage.setItem('exercises', JSON.stringify(updatedWorkoutData))
            } else if(props.alreadySavedWorkout) {
                addSetsReps(props.exid, repsAndWeight.weight, repsAndWeight.reps, usersInDB, currentUser)
            }
            props.loadExerciseList(props.date)
            // props.setWorkoutDataInStorage(prev => {
            //     prev.map((exercise) => {
            //         console.log(exercise)
            //     })
            // })
            setShowModal(true)
            
        } else {
            alert("Please enter an amount for reps.")
        }        
    }
    // handles change of purchaseInfo if user increments/decrements quantity
    function addOrMinusWeight(e) {
        let currentWeight = parseInt(repsAndWeight.weight, 10)
        if(e.target.dataset.addweight) {
            setRepsAndWeight(prev => ({
                ...prev,
                weight: currentWeight + 5
            }))
        }
        if(e.target.dataset.minusweight && currentWeight > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                weight: currentWeight - 5
            }))
        }
    }

    function addOrMinusReps(e) {
        let currentReps = parseInt(repsAndWeight.reps, 10)
        if(e.target.dataset.addreps) {
            setRepsAndWeight(prev => ({
                ...prev,
                reps: currentReps + 1
            }))
        }
        if(e.target.dataset.minusreps && currentReps > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                reps: currentReps - 1
            }))
        }
    }

    // handle change of reps and sets
    function handleChange(name, value) {
        if(typeof value === "number") {
            const newVal = parseInt(value, 10) || 0
            setRepsAndWeight(prev => ({
                ...prev,
                [name]: newVal
            }))
        } else {
            setRepsAndWeight(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    return (
        <form onSubmit={e => handleAddSetClick(e)} className="set-detail">
            {/* <span onClick={e => props.toggleAddSet(e)} class="material-symbols-outlined close-addset">
                close
            </span> */}
            
            <fieldset className="dash-input-fieldset">   
                <div className="ex-info-container">
                    <p className="ex-info-text weight">Weight (lbs):</p>
                        <div className="ex-info-btns">
                            <p onClick={e => addOrMinusWeight(e)} data-minusweight="weight" className="q-btn">-</p>
                            <input
                                name="weight"
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                value={repsAndWeight.weight}
                                className="weight-input"
                                required
                            />
                            <p onClick={e => addOrMinusWeight(e)} data-addweight="weight" className="q-btn">+</p>
                        </div>
                </div>
            </fieldset>

            <fieldset className="dash-input-fieldset">
                <div className="ex-info-container">
                    <p className="ex-info-text reps">Reps:</p>
                    <div className="ex-info-btns">
                        <p onClick={e => addOrMinusReps(e)} data-minusreps="minusreps" className="q-btn">-</p>
                        <input
                            name="reps"
                            onChange={e => handleChange(e.target.name, e.target.value)}
                            value={repsAndWeight.reps}
                            className="reps-input"
                            required
                        />
                        <p onClick={e => addOrMinusReps(e)} data-addreps="addreps" className="q-btn">+</p>
                    </div>
                </div>
            </fieldset>

            <div className="ex-detail-btn-container">
                <button onClick={e => props.toggleAddSet(e)} className="add-set-btn">cancel</button>
                <button type="submit" className="add-set-btn">Add set</button>
            </div>
            

            {showModal && <SetAdded />}
        </form>
    )
}