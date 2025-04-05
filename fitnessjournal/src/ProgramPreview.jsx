import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { previewWorkoutRoutines, usersInDB } from "./firebase"
import Spinner from "./components/spinner"
// once navigated to program preview, build routine asynchronously while loading screen appears.
// show recommended programs based on user inputs, but still give the option to choose other routines,
// Or create their own.

export default function ProgramPreview() {
    const { currentUser } = useOutletContext()
    const [loadedRoutines, setLoadedRoutines] = useState()

    async function loadData() {
        try {
            // const data = await previewWorkoutRoutines(currentUser, usersInDB)
            // if(data) {
            //     setLoadedRoutines(data)
            // }
            
        } catch(err) {
            console.error("error retrieving loaded workouts: ", err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    
    const renderedRoutines = loadedRoutines && loadedRoutines.map((routine, index) => (
        
        <div key={index}>
            <h2>{routine.programType}</h2>
                <div>
                    <h2>{routine.day}</h2>
                    <div></div>
                </div>
            
        </div>
    ))
    
    return (
        <div className="program-preview">
            <h1>program options here</h1>
            {!loadedRoutines ? <Spinner /> : renderedRoutines}
            
        </div>
    )
}