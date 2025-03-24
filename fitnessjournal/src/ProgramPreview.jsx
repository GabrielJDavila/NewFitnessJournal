import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { previewWorkoutRoutines, usersInDB } from "./firebase"
// once navigated to program preview, build routine asynchronously while loading screen appears.
// show recommended programs based on user inputs, but still give the option to choose other routines,
// Or create their own.

export default function ProgramPreview() {
    const { currentUser } = useOutletContext()

    async function loadData() {
        try {
            const data = await previewWorkoutRoutines(currentUser, usersInDB)
        } catch(err) {
            console.error("error retrieving loaded workouts: ", err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    
    return (
        <div className="program-preview">
            <h1>program options here</h1>
        </div>
    )
}