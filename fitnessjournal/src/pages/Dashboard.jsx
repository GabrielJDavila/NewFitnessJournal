import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { getCategories, currentWorkoutList } from "../firebase" 

export default function Dashboard() {
    const [workoutData, setWorkoutData] = useState([])

    useEffect(() => {
        loadExerciseList()
    }, [])

    async function loadExerciseList() {
        try {
            const data = await getCategories(currentWorkoutList)
            setWorkoutData(data)
        } catch(e) {

            console.log("error fetching exercises list: ", e)
        }
    }

    const workoutList = workoutData.map((ex, index) => {
        return (
            <div key={index} className="rendered-ex-dash-container">
                <p>{ex.name}</p>
                <span className="material-symbols-outlined edit-ex">
                    edit
                </span>
                <fieldset className="dash-input-fieldset">
                    <label htmlFor="sets">Sets:</label>
                    <input type="text" name="sets"/>
                </fieldset>
                <fieldset className="dash-input-fieldset">
                    <label htmlFor="sets">Reps:</label>
                    <input type="text" name="sets"/>
                </fieldset>
                <fieldset className="dash-input-fieldset">
                    <label htmlFor="sets">Weight:</label>
                    <input type="text" name="sets"/>
                    <select>
                        <option>lb</option>
                        <option>kg</option>
                    </select>
                </fieldset>
                <button className="add-set-btn">Add set</button>
                
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