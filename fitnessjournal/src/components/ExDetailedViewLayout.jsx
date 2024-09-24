import { useState, useEffect } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import ExDetailedViewNav from "./DetailedViewNav"

export default function ExDetailedViewLayout() {
    const { currentUser } = useOutletContext()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div className="ex-detail-layout" style={{marginTop: "100px"}}>
            <ExDetailedViewNav />
            <Outlet context={{ currentUser }} />
        </div>
    )
}