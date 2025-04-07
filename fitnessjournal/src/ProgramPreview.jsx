import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { previewWorkoutRoutines, usersInDB } from "./firebase"
import Spinner from "./components/spinner"
import Routine from "./components/Routine"
// once navigated to program preview, build routine asynchronously while loading screen appears.
// show recommended programs based on user inputs, but still give the option to choose other routines,
// Or create their own.

export default function ProgramPreview() {
    const { currentUser } = useOutletContext()
    const [loadedRoutines, setLoadedRoutines] = useState()

    async function loadData() {
        try {
            const data = await previewWorkoutRoutines(currentUser, usersInDB)
            if(data) {
                setLoadedRoutines(data)
            }
            
        } catch(err) {
            console.error("error retrieving loaded workouts: ", err)
        }
    }

    console.log(loadedRoutines)

    useEffect(() => {
        loadData()
    }, [])
    
    const renderedRoutines = loadedRoutines?.map((routine, index) => (
        <Routine key={index} routines={routine} />
    ))
    
    return (
        <div className="program-preview">
            {!loadedRoutines ?
                <div className="rendered-program-preview">
                    <p>Loading your templates now...</p>
                    <Spinner />
                </div>
                :
                renderedRoutines
            }
            
        </div>
    )
}