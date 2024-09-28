import { useEffect, useState } from "react"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveExDetailedView } from "../firebase"
import ExerciseDetailEdit from "./ExerciseDetailEdit"

export default function ExDetailedView() {
    const params = useParams()
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())
    const { currentUser } = useOutletContext()
    const [exData, setExData] = useState([])
    const [exSetsData, setExSetsData] = useState({
        exName: "",
        exWeight: "",
        exReps: "",
    })
    console.log(exSetsData)
    useEffect(() => {
        grabExDetailedView()
    }, [])

    function handleChange(name, value) {
        setExSetsData(prev => ({
            ...prev,
            [name]: value
        }))
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
            <form>
                <div>
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
                <div>
                    <p onClick={e => addOrMinusWeight(e)} data-minusweight="weight" className="q-btn">-</p>
                    <input
                        name="exReps"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        value={exSetsData.exReps}
                        className="weight-input"
                        required
                    />
                    <p onClick={e => addOrMinusWeight(e)} data-addweight="weight" className="q-btn">+</p>
                </div>
            </form>
            {exData.setsReps && exData.setsReps.length > 0 &&
                exData.setsReps.map((set, index) => {
                    return (
                        // Turn this into a form element that can be edited. Will send back to firebase to update.
                        <div key={index} style={{display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center"}} className="">
                            <p>Weight: {set.weight}</p>
                            <p>Reps: {set.reps}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}