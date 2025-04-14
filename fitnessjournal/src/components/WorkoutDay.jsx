
export default function WorkoutDay({day}) {

    const sortedExercises = day.exercises.sort((a, b) => a.order - b.order)

    return (
        <div className="workout-day-preview">
            <table>
                <thead>
                    <tr>
                        <th>{day.day}</th>
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