import { useState, useEffect } from "react"
import { saveTimerWorkout, usersInDB } from "../../firebase"
import { useOutletContext } from "react-router-dom"

export default function TimerModal(props) {
    const [startTime, setStartTime] = useState(false)
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [showSavedText, setShowSavedText] = useState(false)
   
    useEffect(() => {
        if(startTime) {
            const interval = setInterval(() => {
                if(timer.seconds < 59) {
                    setTimer(prev => ({
                        ...prev,
                        seconds: prev.seconds + 1
                    }))
                } else if(timer.seconds >= 59) {
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
            return () => clearInterval(interval)
            
        }

    }, [startTime, timer])

    useEffect(() => {
        const showModal = setTimeout(() => {
            setShowSavedText(false)
        }, 3000)

        return () => clearTimeout(showModal)
    }, [showSavedText])    

    function flipTimer() {
        setStartTime(prev => !prev)
    }

    function clearTimer() {
        setTimer(prev => ({
            hours: 0,
            minutes: 0,
            seconds: 0
        }))
        setStartTime(false)
    }

    function saveTimer() {
        if(timer.seconds > 0) {
            saveTimerWorkout(usersInDB, props.userId, props.date, timer)
            setStartTime(false)
        }
        setShowSavedText(prev => !prev)
    }

    const timerHours = timer.hours >= 10 ? timer.hours : `0${timer.hours}`
    const timerMinutes = timer.minutes >= 10 ? timer.minutes : `0${timer.minutes}`
    const timerSeconds = timer.seconds >= 10 ? timer.seconds : `0${timer.seconds}`

    const savedTextStyles = {
        height: showSavedText ? "40px" : "0px",
        padding: showSavedText ? ".5rem" : "0px",
        background: showSavedText ? "#DC684B" : ""
    }
    
    return (
        <div className="timer-outer-container">
            {/* <h2 className="timer-modal-title">Workout Timer</h2> */}
            <div className="timer-modal">
                <div className="timer-modal-btns-container">
                    <button onClick={props.toggleTimer} className="timer-btn timer-close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button onClick={flipTimer} className="timer-btn">
                        {!startTime ? <i className="fa-solid fa-hourglass-start"></i> : <i className="fa-solid fa-hourglass-end"></i>}
                    </button>
                </div>
                <div className="clock-container">
                    <p className="time-clock">{timerHours}: {timerMinutes}: {timerSeconds}</p>
                    {/* <p className="minutes">{timerMinutes}:</p>
                    <p className="seconds">{timerSeconds}:</p> */}
                </div>
                <div className="timer-save-clear-container">
                    <button onClick={clearTimer} className="timer-clear">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button onClick={saveTimer} className="timer-save">
                        Save
                    </button>
                </div>
            </div>
            <p className="saved-time-text" style={savedTextStyles}>
                {timer.seconds > 0 ? `${timer.hours}:${timer.minutes}:${timer.seconds} recorded!` : "no time saved"}
            </p>
        </div>
    )
}