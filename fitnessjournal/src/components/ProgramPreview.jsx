import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { previewWorkoutRoutines, usersInDB } from "../firebase"
import Spinner from "./spinner"
import Routine from "./Routine"
import WorkoutDay from "./WorkoutDay"
// once navigated to program preview, build routine asynchronously while loading screen appears.
// show recommended programs based on user inputs, but still give the option to choose other routines,
// Or create their own.

export default function ProgramPreview({loadedRoutines}) {
    const [programConfirmed, setProgramConfirmed] = useState(false)
    const [selectedRoutine, setSelectedRoutine] = useState()

    function handleConfirmClick(routines, handleClick) {
        setProgramConfirmed(prev => !prev)
        handleClick()
       setSelectedRoutine(routines)
    }

    function handleCreateProgram() {
        console.log("create program")
    }

    const sortedRoutine = programConfirmed ? selectedRoutine.workoutDays.sort((a, b) => a.order - b.order) : ""
    
    const renderedRoutines = loadedRoutines?.map((routine, index) => (
        <Routine
            key={index}
            routines={routine}
            setSelectedRoutine={setSelectedRoutine} 
            setProgramConfirmed={setProgramConfirmed}
            handleConfirmClick={handleConfirmClick}
        />
    ))

    const renderedSelectedWorkout = programConfirmed &&
        <div className="routine-preview">
            <div className="routine-preview-title-container">
                <h2 className="routine-type">{selectedRoutine.programType}</h2>
                <div className="routine-interface-btn-container">
                    <button className="category-interface-btn">
                        <span data-addex className="material-symbols-outlined">
                            save
                        </span>
                    </button>
                    <p className="category-interface-btn-text">Save</p>
                </div>
            </div>
            <div className="routine-preview-container">
                {programConfirmed &&
                sortedRoutine.map((day, index) => (
                    <WorkoutDay key={index} day={day} programConfirmed={programConfirmed} />
                ))
                }
            </div>
        </div>

    
    return (
        <div className="program-preview">
            {!loadedRoutines &&
                <div className="rendered-program-preview">
                    <p>Loading your templates now...</p>
                    <Spinner />
                </div>
            }
            {loadedRoutines && !programConfirmed &&
                <button onClick={handleCreateProgram}>Create a program</button>
            }
            {loadedRoutines && !programConfirmed ?
                renderedRoutines
                :
                renderedSelectedWorkout
            }
            
        </div>
    )
}