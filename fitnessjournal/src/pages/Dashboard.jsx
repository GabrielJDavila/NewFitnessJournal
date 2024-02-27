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

export default function Dashboard() {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <main className="dashboard">
            <section className="hero-section dash-hero">
                <h1>Dashboard</h1>
            </section>
            {/* <h1 className="current-log-title">Nothing to Show</h1> */}
            <div className="dashboard-top-content-container">

                <div className="log-container">
                    <div className="log-text-container">
                        <p className="log-text">4 Sessions This Week</p>
                        {/* <p className="log-text">3 PRs</p> */}
                    </div>
                    <Link className="workout-log-link">
                        <button>Go to workout log</button>
                    </Link>
                </div>

                <div className="log-container">
                    <div className="log-text-container">
                        <p className="log-text">1500/2300cal</p>
                    </div>
                    <Link className="workout-log-link">
                        <button>Go to food log</button>
                    </Link>
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