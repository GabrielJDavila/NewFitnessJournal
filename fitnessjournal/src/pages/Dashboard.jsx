import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { currentWorkoutList, retrieveCurrentExSetsReps } from "../firebase" 

export default function Dashboard() {
    const [workoutData, setWorkoutData] = useState([])

    useEffect(() => {
        loadExerciseList()
    }, [])

    async function loadExerciseList() {
        try {
            const setsData = await retrieveCurrentExSetsReps(currentWorkoutList)
            setWorkoutData(setsData)

        } catch(e) {

            console.log("error fetching exercises list: ", e)
        }
    }

    const workoutList = workoutData.map((ex, index) => {
        return (
            <div key={index} className="rendered-ex-dash-container">
                <div className="ex-name-container">
                    <p className="current-ex-name">{ex.name}</p>
                    <i
                        
                        className="fa-solid fa-trash curr-ex-delete"
                        
                    ></i>
                </div>
                
                <ul className="all-sets-container">
                    {ex.setsReps.map((set, setIndex) => (
                        <li key={setIndex} className="set-container">
                            {/* <p className="set-number"># {setIndex + 1}.</p> */}
                            <p className="set-weight">lbs: {set.weight}</p>
                            <p className="set-reps">reps: {set.reps}</p>
                            <span className="material-symbols-outlined edit-ex">
                                edit
                            </span>
                        </li>
                    ))}
                </ul>
                <Link to={`/ExerciseDetail/${ex.id}`} className="add-set-link">
                    <button className="add-set-btn">Add set</button>
                </Link>
                {}
            </div>
        )
    })
    return (
        <main className="dashboard">

            <div className="current-log-container">
                {
                    workoutData ?
                    workoutList : <h1 className="current-log-title">Workout Log Empty</h1>
                }
            </div>

            <section className="dash-links-container">
                <div className="start-new-workout-container">
                    <Link to="AllCategories" className="link-portal-dash">
                        <i className="fa-solid fa-plus"></i>
                        <p className="link-text">Start New Workout</p>
                    </Link>
                </div>
                <div className="see-previous-workout-container">
                    <Link className="link-portal-dash">
                    <i className="fa-regular fa-note-sticky"></i>
                    <p className="link-text">Previous Workout</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}