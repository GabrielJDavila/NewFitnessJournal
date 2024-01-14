import { useState, useEffect } from "react"
import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import { addSetsReps, usersInDB} from "../firebase"
import BackBtn from "../components/BackBtn"
import SetAdded from "../components/modals/SetAdded"

export default function ExerciseDetail() {
    const params = useParams()
    const [repsAndWeight, setRepsAndWeight] = useState({
        reps: 0,
        weight: 0
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
    const navigate = useNavigate()

    function handleAddSetClick(e) {
        e.preventDefault()
        if (repsAndWeight.reps > 0) {
            addSetsReps(params.id, repsAndWeight.weight, repsAndWeight.reps, usersInDB, currentUser)
            setShowModal(true)
            navigate("/Dashboard")
        } else {
            alert("Please enter an amount for reps.")
        }        
    }
    // handles change of purchaseInfo if user increments/decrements quantity
    function addOrMinusWeight(e) {
        if(e.target.dataset.addweight) {
            setRepsAndWeight(prev => ({
                ...prev,
                weight: prev.weight + 1
            }))
        }
        if(e.target.dataset.minusweight && repsAndWeight.weight > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                weight: prev.weight - 1
            }))
        }
    }

    function addOrMinusReps(e) {
        if(e.target.dataset.addreps) {
            setRepsAndWeight(prev => ({
                ...prev,
                reps: prev.reps + 1
            }))
        }
        if(e.target.dataset.minusreps && repsAndWeight.reps > 0) {
            setRepsAndWeight(prev => ({
                ...prev,
                reps: prev.reps - 1
            }))
        }
    }

    // handle change of reps and sets
    function handleChange(name, value) {
        const newVal = parseInt(value, 10) || 0
        setRepsAndWeight(prev => ({
            ...prev,
            [name]: newVal
        }))
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
                        <select className="weight-type">
                            <option>lb</option>
                            <option>kg</option>
                        </select>
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