import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
export default function CurrentWorkoutList(props) {
    const [flipView, setFlipView] = useState(new Array(props.data.length).fill(false))
    const [currentIndex, setCurrentindex] = useState(null)

    // function to reset flipView to close any existing edit/view modals
    function resetFlipView() {
        setFlipView(new Array(flipView.length).fill(false))
    }

    // function to flip current flipView boolean to true. Allows for edit/view modal to pop up for given exercise.
    function handleFlipView(e) {
        resetFlipView()
        console.log(e.target.dataset.flipview)
        const index = Number(e.target.dataset.flipview)
        setFlipView(prev => {
            const boolArr = [...prev]
            boolArr[index] = !boolArr[index]
            return boolArr
        })
        setCurrentindex(index)
    }

    const divStyles = {
        height: flipView[currentIndex] ? "100px" : "0px",
        border: flipView[currentIndex] ? "2px solid black" : "none"
    }
        const currentWorkout = props.data.map((ex, index) => {
            return (
                <Draggable key={ex.id} draggableId={ex.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                            data-currentex={index}
                            onClick={e => props.handleClick(e)}
                            className="rendered-ex-dash-container"
                        >
                            <div className="ex-name-container">
                                <p className="ex-number">{index + 1}</p>
                                <p className="current-ex-name">{ex.name}</p>
                                {!flipView[index] ?
                                <i onClick={e => handleFlipView(e)} data-flipview={index} style={{transform: flipView[index] ? "rotate(90deg)" : "rotate(0deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis-vertical"></i>
                                :
                                <i onClick={e => resetFlipView()} data-flipview={index} style={{transform: flipView[index] ? "rotate(0deg)" : "rotate(90deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis"></i>
                                }
                                {flipView[index] &&
                                <div
                                    style={{
                                        height: flipView[index] ? "100px" : "0px",
                                    }}
                                    className="ex-detail-div"
                                >
                                    <i
                                        onClick={e => props.toggleDel(e)}
                                        data-deleteexid={ex.id}
                                        className="fa-solid fa-trash curr-ex-delete"
                                    ></i>
                                </div>
                                }
                            </div>
                            
                            <ul className="all-sets-container">
                                {ex.setsReps.map((set, setIndex) => (
                                    <li key={setIndex} className="set-container">
                                        {set.isPR ?
                                        <span className="material-symbols-outlined pr-icon">
                                            trophy
                                        </span> :
                                        <p className="hidden-el">h</p>
                                        }
                                        <p className="set-weight">lbs: {set.weight}</p>
                                        <p className="set-reps">reps: {set.reps}</p>
                                        <span
                                            id={ex.id}
                                            data-editsetid={set.setId}
                                            onClick={e => props.toggleEdit(e)}
                                            className="material-symbols-outlined edit-ex"
                                        >
                                            edit
                                        </span>
                                        <span
                                            onClick={e => props.toggleDel(e)}
                                            id={ex.id}
                                            data-deletesetid={set.setId}
                                            className="material-symbols-outlined delete-set"
                                        >
                                            delete
                                        </span>
                                        {/* <i
                                            onClick={e => props.toggleDel(e)}
                                            id={ex.id}
                                            data-deletesetid={set.setId}
                                            className="fa-solid fa-trash delete-set"
                                        ></i> */}
                                    </li>
                                ))}
                            </ul>
                            {/* <Link to={`ExerciseDetail/${ex.id}`} className="add-set-link"> */}
                                <button data-exid={ex.id} onClick={e => props.toggleAdd(e)} className="add-set-btn">Add set</button>
                            {/* </Link> */}
                        </div>
                    )}
                </Draggable>
            )
        })

        return (
            currentWorkout
        )
}