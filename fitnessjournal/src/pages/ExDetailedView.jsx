import { useEffect, useState } from "react"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveExDetailedView } from "../firebase"

export default function ExDetailedView() {
    const params = useParams()
    const location = useLocation()
    const currDate = location.state?.date
    const { currentUser } = useOutletContext()
    const [exData, setExData] = useState([])

    useEffect(() => {
        grabExDetailedView()
    }, [])

    async function grabExDetailedView() {
        try {
            const ex = await retrieveExDetailedView(usersInDB, currentUser, params.id, currDate)
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