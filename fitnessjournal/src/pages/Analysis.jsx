import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { RetrieveAllPRs, usersInDB } from "../firebase"

export default function Analysis(props) {
    const [prData, setPRData] = useState(props.allPRs)
    const { currentUser } = useOutletContext()

    // useEffect(() => {
    //     loadData()
    // }, [])
    // async function loadData() {
    //     try {
    //         const data = await RetrieveAllPRs(usersInDB, currentUser)
    //         console.log(data)
    //         setPRData(data)
    //     } catch(err) {
    //         console.error("error retrieving data: ", err)
    //     }
    // }

    const tableData = props.allPRs.map(ex => {
        const milliseconds = ex.createdAt.seconds * 1000 + ex.createdAt.nanoseconds / 1000000
        const date = new Date(milliseconds)
        const stringDate = date.toISOString().split("T")[0]
        console.log(stringDate)
        const [year, month, day] = stringDate.split("-")
        const formattedDate = `${month}/${day}/${year}`
        return (
        <tr key={ex.exId} className="log-row">
            <td>{ex.exName}</td>
            <td>{ex.weight}</td>
            <td>{ex.reps}</td>
            <td>{formattedDate}</td>
        </tr>
        )
    })
    return (
        <main className="log-analysis-container">
            <div className="log-analysis">
                <h2 className="log-analysis-title2">Personal Records</h2>
                <table className="log-table">
                    <tbody>
                        <tr className="log-row-titles">
                            <th>Exercise</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Date</th>
                        </tr>
                        {tableData}
                        {/* <tr className="log-row">
                            <td>RFE Split Squat</td>
                            <td>70</td>
                            <td>10</td>
                            <td>06/26/2024</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </main>
    )
}