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
    return (
        <div className="ex-detailed-history-page">
            <h2>History</h2>
        </div>
    )
}