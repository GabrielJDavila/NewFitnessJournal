import { useState, useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { addSetsReps, usersInDB} from "../firebase"
import ExDetailBackBtn from "../components/ExDetailBackBtn"
import SetAdded from "../components/modals/SetAdded"

export default function ExerciseDetail() {
    const params = useParams()
    const [repsAndWeight, setRepsAndWeight] = useState({
        reps: 0,
        weight: 0,
        weightType: ""
    })
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

    function handleAddSetClick(e) {
        e.preventDefault()
        if (repsAndWeight.reps > 0) {
            addSetsReps(params.id, repsAndWeight.weight, repsAndWeight.reps, repsAndWeight.weightType, usersInDB, currentUser)
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
                reps: currentReps + 5
            }))
        }
        if(e.target.dataset.minusreps && currentReps > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                reps: currentReps - 5
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