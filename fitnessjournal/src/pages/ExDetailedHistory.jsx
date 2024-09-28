import { useEffect, useState } from "react"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveExHistory } from "../firebase"

export default function ExDetailedHistory() {
    const params = useParams()
    const { currentUser } = useOutletContext()
    const [data, setData] = useState([])

    useEffect(() => {
        retrieveExHistoryFromFirebase()
    }, [])
    console.log(data)
    async function retrieveExHistoryFromFirebase() {
        try {
            const exData = await retrieveExHistory(usersInDB, currentUser, params.id)
            if(exData) {
                setData(exData)
            }
        } catch(error) {
            console.error("error fetching exercise history: ", error)
        }
    }

    const renderedData = data && data.exHistory.map((entry, index) => {
        return (
            <div key={index} className="ex-history-day-container">
                <p className="ex-history-date">{entry.date}</p>
                {entry.sets.map((set, setIndex) => {
                    return (
                      <div key={setIndex} className="ex-history-weight-reps-container">
                        <p className="ex-history-weight">weight: {set.weight}</p>
                        <p className="ex-history-reps">reps: {set.reps}</p>
                      </div>  
                    )
                })}
            </div>
        )
    })
    return (
        <div className="ex-detailed-history-page">
            <h2>History</h2>
            {data && renderedData}
        </div>
    )
}