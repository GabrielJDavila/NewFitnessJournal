import { useState } from "react"

export default function CreateRoutine() {
    const [routineData, setRoutineData] = useState({
        routineTitle: "",
        exercises: [],

    })
    return (
        <div className="create-routine-container">
            <form className="create-routine-form">
                <label className="routine-label">
                    Routine Name
                    <input type="text" name="routineTitle" className="routine-title"/>
                </label>
                <button>
                    <span class="material-symbols-outlined">
                        check
                    </span>
                </button>
            </form>
        </div>
    )
}