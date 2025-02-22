import { useEffect, useState } from "react"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveExDetailedView, addSetsReps } from "../firebase"

export default function ExDetailedView() {
    const params = useParams()
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())
    const { currentUser } = useOutletContext()
    const [exData, setExData] = useState([])
    const [exSetsData, setExSetsData] = useState({
        exName: "",
        exWeight: 0,
        exReps: 0,
    })
    console.log(date)
    useEffect(() => {
        grabExDetailedView()
    }, [])

    function addOrMinusWeight(e) {
        let currentWeight = parseInt(exSetsData.exWeight, 10)
        console.log(currentWeight)
        if(e.target.dataset.minusweight && currentWeight > 0) {
            setExSetsData(prev => ({
                ...prev,
                exWeight: currentWeight - 1
            }))
        } else if(e.target.dataset.addweight) {
            setExSetsData(prev => ({
                ...prev,
                exWeight: currentWeight + 1
            }))
        } 
    }

    function addOrMinusReps(e) {
        let currentReps = parseInt(exSetsData.exReps, 10)
        if(e.target.dataset.minusreps && currentReps > 0) {
            setExSetsData(prev => ({
                ...prev,
                exReps: currentReps - 1
            }))
        } else if(e.target.dataset.addreps) {
            setExSetsData(prev => ({
                ...prev,
                exReps: currentReps + 1
            }))
        }
    }

    function handleChange(name, value) {
        setExSetsData(prev => ({
            ...prev,
            [name]: value
        }))
        // if(typeof value === "number") {
        //     const newVal = parseInt(value, 10) | 0
        //     setExSetsData(prev => ({
        //         ...prev,
        //         [name]: newVal
        //     }))
        // } else {
        //     setExSetsData(prev => ({
        //         ...prev,
        //         [name]: value
        //     }))
        // }
    }
    console.log(exSetsData.exReps)
    function handleSubmit(e) {
        e.preventDefault()
        if(exSetsData.exReps > 0) {
            addSetsReps(params.id, exSetsData.exWeight, exSetsData.exReps, usersInDB, currentUser)
            grabExDetailedView()
        }
        
    }
    async function grabExDetailedView() {
        try {
            const ex = await retrieveExDetailedView(usersInDB, currentUser, params.id, date)
            if(ex) {
                setExData(ex)
            }
        } catch(e) {
            console.error("error fetching detailed view: ", e)
        }
    }
    return (
        <div className="ex-detailed-view-page">
            <h2 className="ex-detailed-view-name">{exData.exName && exData.exName}</h2>
            <form onSubmit={e => handleSubmit(e)} className="ex-detail-form">
                <div>
                    <p>Weight (lbs)</p>
                    <div className="ex-detail-addminus-div">
                        <p onClick={e => addOrMinusWeight(e)} data-minusweight="weight" className="q-btn">-</p>
                        <input
                            name="exWeight"
                            onChange={e => handleChange(e.target.name, e.target.value)}
                            value={exSetsData.exWeight}
                            className="weight-input"
                            required
                        />
                        <p onClick={e => addOrMinusWeight(e)} data-addweight="weight" className="q-btn">+</p>
                    </div>
                </div>

                <div>
                    <p>Reps</p>
                    <div className="ex-detail-addminus-div">
                        <p onClick={e => addOrMinusReps(e)} data-minusreps="reps" className="q-btn">-</p>
                        <input
                            name="exReps"
                            onChange={e => handleChange(e.target.name, e.target.value)}
                            value={exSetsData.exReps}
                            className="weight-input"
                            required
                        />
                        <p onClick={e => addOrMinusReps(e)} data-addreps="reps" className="q-btn">+</p>
                    </div>
                </div>
                <button className="ex-detail-add-set-btn">Add set</button>
            </form>
            <div className="ex-detail-current-sets">
                {exData.setsReps && exData.setsReps.length > 0 &&
                    exData.setsReps.map((set, index) => {
                        return (
                            // Turn this into a form element that can be edited. Will send back to firebase to update.
                            <div key={index} style={{display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center"}} className="ex-detail-rendered-set">
                                <p>Weight: {set.weight}</p>
                                <p>Reps: {set.reps}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}