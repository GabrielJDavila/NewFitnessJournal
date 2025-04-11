
export default function WorkoutDay({day}) {

    const sortedExercises = day.exercises.sort((a, b) => a.order - b.order)

    return (
        <div className="workout-day-preview">
            <table>
                <tr>
                    <th>{day.day}</th>
                    <th>Goal Sets</th>
                    <th>Goal Reps</th>
                </tr>
            {sortedExercises.map((exercise, index) => (
                <tr key={index}>
                    <td>{exercise.name}</td>
                    <td>{exercise.goalSets}</td>
                    <td>{exercise.goalReps}</td>
                </tr>
                // <div key={index} className="exercises-preview">
                //     <p className="exercises-preview-name">{exercise.name}</p>
                //     <div className="reps-and-sets-preview">
                //         <p>Goal Sets: {exercise.goalSets}</p>
                //         <p>Goal Reps: {exercise.goalReps}</p>
                //     </div>
                // </div>
            ))}
            </table>
        </div>
    )
}