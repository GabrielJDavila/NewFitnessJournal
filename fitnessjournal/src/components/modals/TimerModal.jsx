import { useState, useEffect } from "react"

export default function TimerModal() {
    const [currentDate, setCurrentDate] = useState(new Date())

    console.log(currentDate)
    console.log(currentDate.getHours())
    console.log(typeof(currentDate.getMinutes()))
    console.log(typeof(10))
    console.log(currentDate.getSeconds())
    const currentMins = currentDate.getMinutes() >= 10 ? currentDate.getMinutes() : `0${currentDate.getMinutes()}`
    console.log(currentMins)
    console.log(`current time is: ${currentDate.getHours()}: ${currentMins}: ${currentDate.getSeconds()}`)
    return (
        <div className="">
            <h2>Workout Timer</h2>
            <div className="timer-modal-btns-container">
                <button>Close</button>
                <button>Start timer</button>
            </div>
        </div>
    )
}