import { useState } from "react"

export default function CreateRoutine() {
    const [routineData, setRoutineData] = useState({
        routineTitle: "",
        exercises: [],

    })
    return (
        <div className="create-routine-container">
            <h2>Routine Name</h2>
        </div>
    )
}