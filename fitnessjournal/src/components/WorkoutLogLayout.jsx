import { useState, useEffect } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import { deleteAllEx, usersInDB, retrieveCurrentExSetsReps } from "../firebase"
import EditSetModal from "./modals/EditSetModal"
import CategoryNav from "./CategoryNav"

export default function WorkoutLogLayout() {
    const { currentUser } = useOutletContext()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div className="workout-log-layout">
            {/* <CategoryNav /> */}
            <Outlet context={{ currentUser }}/>
        </div>
    )
}