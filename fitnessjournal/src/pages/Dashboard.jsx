import { useState, useEffect } from "react"
import { NavLink, Link, useOutletContext } from "react-router-dom"
import { usersInDB, retrieveCurrentExSetsReps, editSingleSet, deleteCategory, deleteEx, deleteSingleSet, deleteAllEx } from "../firebase"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit, toggleEdit, toggleDelete } from "../Utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { queryWorkoutLogs, previousModay } from "../firebase"

export default function Dashboard() {
    const [totalWorkouts, setTotalWorkouts] = useState(0)
    const { currentUser } = useOutletContext()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        previousModay()

        const unsubcribe = queryWorkoutLogs(usersInDB, currentUser)
    }, [])

    // const newWeekArr = new Array(7)
    // const today = new Date()
    // console.log(newWeekArr)
    // console.log(today.getMonth(), today.getDate())

    return (
        <main className="dashboard">
            <section className="hero-section dash-hero">
                <h1>Dashboard</h1>
            </section>
            {/* <h1 className="current-log-title">Nothing to Show</h1> */}
            <div className="dashboard-top-content-container">

                <div className="log-container">
                    <div className="log-title-container">
                        <span className="material-symbols-outlined dash-icon">
                            fitness_center
                        </span>
                        <p className="log-title">Workouts</p>
                    </div>
                    <div className="log-text-container">
                        <p className="log-text">4 /<small>7</small></p>
                    </div>
                </div>

                <div className="log-container">
                     <div className="log-title-container">
                        <span className="material-symbols-outlined dash-icon">
                            nutrition
                        </span>
                        <p className="log-title">Nutrition</p>
                    </div>
                    <div className="log-text-container">
                        <p className="log-text">1500/<small>2300cal</small></p>
                    </div>
                </div>

            </div>

            <div className="dashboard-bottom-container">
                <p>Progress</p>
                <div className="graph-container">
                    <img src="./src/assets/graph.svg" className="graph"/>
                </div>
            </div>

        </main>
    )
}