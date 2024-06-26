import { useState, useEffect } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"

export default function SettingsLayout() {
    const { currentUser } = useOutletContext()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div className="workout-log-layout">
            <Outlet context={{ currentUser }} />
        </div>
    )
}