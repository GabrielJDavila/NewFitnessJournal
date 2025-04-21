import { use, useState } from "react";
import WorkoutDay from "./WorkoutDay";

export default function Routine({routines, setSelectedRoutine, setProgramConfirmed, handleConfirmClick}) {
    const [showConfirmation, setShowConfirmation] = useState(false)
    // const [programConfirmed, setProgramConfirmed] = useState(false)
    // const [selectedRoutine, setSelectedRoutine] = useState()

    function handleClick() {
        setShowConfirmation(prev => !prev)
    }

    // function handleConfirmClick() {
    //     setSelectedRoutine(routines)
    //     setProgramConfirmed(prev => !prev)
    //     handleClick()
    // }
    const sortedRoutines = routines.workoutDays.sort((a, b) => a.order - b.order)

    // const sortedRoutine = programConfirmed ? selectedRoutine.workoutDays.sort((a, b) => a.order - b.order) : ""

    const confirmationPopup =
    <div className="program-confirmation">
        <p>Are you sure you want to add {routines.programType} to log?</p>
        <div className="confirmation-btn-container">
            <button onClick={handleClick}>Cancel</button>
            <button onClick={() => handleConfirmClick(routines, handleClick)}>Confirm</button>
        </div>
    </div>
    
    return (
        <div className="routine-preview">
            <h2 className="routine-type">{routines.programType}</h2>
            
            <div className="routine-preview-container">
                {
                sortedRoutines.map((day, index) => (
                    <WorkoutDay key={index} day={day} />
                ))
                }
            </div>
            {showConfirmation && confirmationPopup}
            <button onClick={handleClick} className="routine-button">Choose this program</button>
        </div>
    )
}