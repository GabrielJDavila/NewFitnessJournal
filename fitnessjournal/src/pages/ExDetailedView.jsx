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
        <div style={{marginTop: "200px"}}>
            <p>{exData.exName && exData.exName}</p>
            {exData.setsReps && exData.setsReps.length > 0 &&
                exData.setsReps.map((set, index) => {
                    return (
                        <div key={index} style={{display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center"}}>
                            <p>{set.weight}</p>
                            <p>{set.reps}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}