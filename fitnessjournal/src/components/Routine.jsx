import WorkoutDay from "./WorkoutDay";

export default function Routine({routines}) {

    const sortedRoutines = routines.workoutDays.sort((a, b) => a.order - b.order)
    
    return (
        <div className="routine-preview">
            <h2>{routines.programType}</h2>
            <div className="routine-preview-container">
                {sortedRoutines.map((day, index) => (
                    <WorkoutDay key={index} day={day} />
                ))}
            </div>
        </div>
    )
}