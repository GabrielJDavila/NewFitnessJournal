import { useState, useEffect } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import { deleteAllEx, usersInDB, retrieveCurrentExSetsReps } from "../firebase"
import EditSetModal from "./modals/EditSetModal"

export default function WorkoutLogLayout() {
    const { currentUser } = useOutletContext()

    return (
        <div className="workout-log-layout">
            <Outlet context={{ currentUser }}/>
        </div>
    )
}