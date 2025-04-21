
export default function WorkoutDay({day, programConfirmed}) {

    const sortedExercises = day.exercises.sort((a, b) => a.order - b.order)

    return (
        <div className="workout-day-preview">
            <table>
                <thead>
                    <tr>
                        <th className="table-head-container">
                            <p className="table-head-title">{day.day}</p>
                            <div className="workoutday-interface-btn-container">
                                <button className="workoutday-interface-btn">
                                    <span data-addex className="material-symbols-outlined">
                                        add
                                    </span>
                                </button>
                                <p className="workoutday-interface-btn-text">Log all</p>
                            </div>
                        </th>
                        <th>Goal Sets</th>
                        <th>Goal Reps</th>
                    </tr>
                </thead>
                <tbody>
                {sortedExercises.map((exercise, index) => (
                    <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>{exercise.goalSets}</td>
                        <td>{exercise.goalReps}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}