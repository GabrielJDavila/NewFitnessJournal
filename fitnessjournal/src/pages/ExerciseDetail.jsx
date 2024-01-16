import { useState, useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { addSetsReps, usersInDB} from "../firebase"
import BackBtn from "../components/BackBtn"
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
    const date = new Date().toISOString().split("T")[0]

    useEffect(() => {
        if(showModal) {
            const flipModalState = setTimeout(() => {
                setShowModal(false)
            }, 4000)

            return () => clearTimeout(flipModalState)
        }
    }, [showModal])

    function handleAddSetClick(e) {
        e.preventDefault()
        if (repsAndWeight.reps > 0) {
            addSetsReps(params.id, repsAndWeight.weight, repsAndWeight.reps, repsAndWeight.weightType, usersInDB, currentUser, date)
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
                weight: currentWeight + 1
            }))
        }
        if(e.target.dataset.minusweight && currentWeight > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                weight: currentWeight - 1
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
            <BackBtn />
            <fieldset className="dash-input-fieldset">   
                <div className="ex-info-container">
                    <p className="ex-info-text weight">Weight:</p>
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
                    <p className="ex-info-text weight">Weight Type:</p>
                            <select
                                name="weightType"
                                value={repsAndWeight.weightType}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                className="weight-type"
                                required
                            >
                                <option value="">-- select --</option>
                                <option value="lb">lb</option>
                                <option value="kg">kg</option>
                            </select>
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