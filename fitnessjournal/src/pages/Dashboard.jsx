import { useState, useEffect } from "react"
import { NavLink, Link, useOutletContext } from "react-router-dom"
import { usersInDB, editSingleSet, deleteCategory, deleteEx, deleteSingleSet, deleteAllEx, grabLatestPR } from "../firebase"
import ConfirmDeleteExModal from "../components/modals/ConfirmDeleteExModal"
import ConfirmDeleteSetModal from "../components/modals/ConfirmDeleteSetModal"
import EditSetModal from "../components/modals/EditSetModal"
import CurrentWorkoutList from "../components/CurrentWorkoutList"
import { handleDeleteExerciseSubmit, handleDeleteSetSubmit, handleEditSetSubmit, toggleEdit, toggleDelete } from "../Utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { queryWorkoutLogs } from "../firebase"
import Button from "@mui/material/Button"
import { Skeleton } from "@mui/material"


export default function Dashboard() {
    const [totalWorkouts, setTotalWorkouts] = useState()
    const [averageLoggedTime, setAverageLoggedTime] = useState()
    const [newPR, setNewPR] = useState()
    const { currentUser } = useOutletContext()
    
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        setTimeout(() => {
            loadDashboardWorkoutData()
        }, 1000)
        
    }, [])

    useEffect(() => {
        setTimeout(() => {
            renderedWorkoutTime()
        }, 1000)
        
    }, [totalWorkouts])

    async function loadDashboardWorkoutData() {
        try {
            const data = await queryWorkoutLogs(usersInDB, currentUser)
            setTotalWorkouts(data)
            const prData = await grabLatestPR(usersInDB, currentUser)
            setNewPR(prData)
        } catch(e) {
            console.error("error fetching logged workouts: ", e)
        }
    }
    
    function renderedWorkoutTime() {
        let averageTime = 0
        let totalTime = 0
        if(totalWorkouts && totalWorkouts.length > 0) {
            totalWorkouts.forEach(workoutObj => {
                if(workoutObj.workoutTime) {
                    const hrs = (workoutObj.workoutTime.hours * 60) * 60
                    const mins = workoutObj.workoutTime.minutes * 60
                    const secs = workoutObj.workoutTime.seconds
                    totalTime += (hrs + mins + secs)
                    
                } else {
                    totalTime = 0
                }
            })
            averageTime = totalTime / totalWorkouts.length
            const date = new Date(null)
            date.setSeconds(averageTime)
            const result = date.toISOString().slice(11, 19)
            setAverageLoggedTime(result)
        } else {
            setAverageLoggedTime("00:00:00")
        }
    }

    return (
        <main className="dashboard">
            <section className="hero-section dash-hero">
                <h1>Dashboard</h1>
            </section>
            {/* <h1 className="current-log-title">Nothing to Show</h1> */}
            <div className="dashboard-top-content-container">

                <div className="log-container">
                    { totalWorkouts ?
                    <div className="log-title-container">
                            <span className="material-symbols-outlined dash-icon">
                                fitness_center
                            </span>
                            <p className="log-title">Workouts this week</p>
                    </div> :
                    <div className="log-title-container">
                        <Skeleton variant="circular" width={25} height={25}/>
                        <Skeleton variant="rounded" width="60%" height={10}/>
                    </div>
                    }
                    { totalWorkouts ?
                    <div className="log-text-container">
                        <p className="log-text">{totalWorkouts ? totalWorkouts.length : "0"} / 7</p>
                    </div> :
                    <div className="log-text-container">
                        <Skeleton variant="rounded" width="100%" height={75}/>
                    </div>
                    }
                </div>

                { averageLoggedTime ?
                    <div className="log-container">
                        <div className="log-title-container">
                            <span className="material-symbols-outlined dash-icon">
                                timer
                            </span>
                            <p className="log-title">Average time</p>
                        </div>
                        <div className="log-text-container">
                            <p className="log-text">{averageLoggedTime ? averageLoggedTime : "00:00:00"}</p>
                        </div>
                    </div> :
                    <div className="log-container">
                        <div className="log-title-container">
                            <Skeleton variant="circular" width={25} height={25}/>
                            <Skeleton variant="rounded" width="60%" height={10}/>
                        </div>
                        <div className="log-text-container">
                            <Skeleton variant="rounded" width="100%" height={75}/>
                        </div>
                    </div>
                }
                { newPR ?
                    <div className="log-container">
                        <div className="log-title-container">
                            <span className="material-symbols-outlined dash-icon">
                                trophy
                            </span>
                            <p className="log-title">Recent PRs</p>
                        </div>
                        <div className="log-text-container">
                            {/* <p className="log-text">{averageLoggedTime ? averageLoggedTime : "00:00:00"}</p> */}
                            {newPR ?
                                <p className="log-text">
                                    ⭐{newPR.name}⭐
                                    <br></br>
                                    {newPR.weight} x {newPR.reps}
                                </p> :
                                <p className="log-text">no PRs logged</p>
                            }
                            {/* <p className="log-text">188 x 10</p> */}
                        </div>
                    </div> :
                    <div className="log-container">
                        <div className="log-title-container">
                            <Skeleton variant="circular" width={25} height={25}/>
                            <Skeleton variant="rounded" width="60%" height={10}/>
                        </div>
                        <div className="log-text-container">
                            <Skeleton variant="rounded" width="100%" height={75}/>
                        </div>
                    </div>
                }

            </div>


        </main>
    )
}