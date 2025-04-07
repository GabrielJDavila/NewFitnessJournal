
export default function WorkoutDay({day}) {

    const sortedExercises = day.exercises.sort((a, b) => a.order - b.order)

    return (
        <div className="workout-day-preview">
            <h2>{day.day}</h2>
            <div className="workout-day-exercises-container">
                {sortedExercises.map((exercise, index) => (
                    <div key={index} className="exercises-preview">
                        <p className="exercises-preview-name">{exercise.name}</p>
                        <div className="reps-and-sets-preview">
                            <p>Goal Sets: {exercise.goalSets}</p>
                            <p>Goal Reps: {exercise.goalReps}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}