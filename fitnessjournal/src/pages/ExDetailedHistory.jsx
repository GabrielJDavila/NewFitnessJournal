import { useEffect, useState } from "react"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveExHistory } from "../firebase"

export default function ExDetailedHistory() {
    const params = useParams()
    const { currentUser } = useOutletContext()
    const [data, setData] = useState([])
    const storedDate = localStorage.getItem("selectedDate")
    const [date, setDate] = useState(storedDate ? new Date(storedDate) : new Date())

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

    const renderedData = data && data.exHistory?.map((entry, index) => {
        return (
            <div key={index} className="ex-history-day-container">
                <p className="ex-history-date">{entry.date.slice(0, 9)}</p>
                <div className="ex-history-categories-container">
                    <p>weight</p>
                    <p>reps</p>
                    <p>PR</p>
                    <p>note</p>
                </div>
                {entry.sets.map((set, setIndex) => {
                    return (
                      <div key={setIndex} className="ex-history-weight-reps-container">
                        <p className="ex-history-weight">{set.weight}</p>
                        <p className="ex-history-reps">{set.reps}</p>
                        <p className="ex-history-pr">{set.pr? `${set.pr}` : ""}</p>
                        <p className="ex-history-note">{set.note? `${set.note}` : ""}</p>
                      </div>  
                    )
                })}
            </div>
        )
    })
    return (
        <div className="ex-detailed-history-page">
            <h2>History</h2>
            <div className="ex-history-data-container">
                {data && renderedData}
            </div>
            
        </div>
    )
}