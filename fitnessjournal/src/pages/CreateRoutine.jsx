import { useState } from "react"

export default function CreateRoutine() {
    const [routineData, setRoutineData] = useState({
        routineTitle: "",
        exercises: [],

    })
    return (
        <div className="create-routine-container">
            <form className="create-routine-form">
                <label className="routine-name">
                    Routine Name
                    <input type="text"/>
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