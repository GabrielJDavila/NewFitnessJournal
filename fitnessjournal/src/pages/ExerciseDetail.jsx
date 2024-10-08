import { useState, useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { addSetsReps, usersInDB} from "../firebase"
import ExDetailBackBtn from "../components/ExDetailBackBtn"
import SetAdded from "../components/modals/SetAdded"

export default function ExerciseDetail(props) {
    console.log(props.exid)
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
            addSetsReps(props.exid, repsAndWeight.weight, repsAndWeight.reps, repsAndWeight.weightType, usersInDB, currentUser, date)
            setShowModal(true)
            props.loadExerciseList(props.date)
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
            <ExDetailBackBtn />
            <p onClick={e => props.toggleAddSet(e)}>cancel</p>
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
            
            <button className="add-set-btn">Add set</button>

            {showModal && <SetAdded />}
        </form>
    )
}