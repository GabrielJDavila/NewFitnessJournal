import { useState, useEffect } from "react"

export default function TimerModal(props) {
    const [startTime, setStartTime] = useState(false)
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const date = new Date()
    const currentMins = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    const currentSec = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`

    console.log(startTime)
    // function timerInterval() {
    //     const timer = setInterval(() => {
    //         if(timer.seconds < 60) {
    //             setTimer(prev => ({
    //                 ...prev,
    //                 seconds: prev.seconds + 1
    //             }))
    //         } else if(timer.seconds >= 60) {
    //             setTimer(prev => ({
    //                 ...prev,
    //                 minutes: prev.minutes + 1,
    //                 seconds: 0
    //             }))
    //         } else if(timer.minutes >= 60) {
    //             setTimer(prev => ({
    //                 hours: prev.hours + 1,
    //                 minutes: 0,
    //                 seconds: 0
    //             }))
    //         }

    //     }, 1000)

    //     return timer
    // }

    // const timerId = timerInterval()
    useEffect(() => {
        let interval
        if(startTime) {
            interval = setInterval(() => {
                if(timer.seconds < 60) {
                    setTimer(prev => ({
                        ...prev,
                        seconds: prev.seconds + 1
                    }))
                } else if(timer.seconds >= 60) {
                    setTimer(prev => ({
                        ...prev,
                        minutes: prev.minutes + 1,
                        seconds: 0
                    }))
                } else if(timer.minutes >= 60) {
                    setTimer(prev => ({
                        hours: prev.hours + 1,
                        minutes: 0,
                        seconds: 0
                    }))
                }

            }, 1000)
        }

        return () => clearInterval(interval)
    }, [timer])

    function flipTimer() {
        setStartTime(prev => !prev)
    }

    return (
        <div className="timer-container">
            <h2 className="timer-modal-title">Workout Timer</h2>
            <div className="timer-modal-btns-container">
                <button onClick={props.toggleTimer}>Close</button>
                <button onClick={flipTimer}>Start timer</button>
            </div>
        </div>
    )
}