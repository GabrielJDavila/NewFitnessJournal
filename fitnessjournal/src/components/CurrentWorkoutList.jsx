import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
export default function CurrentWorkoutList(props) {
    // I should send the flipView, CurrentIndex, handleFlipView state and functions up to parent.
    // That way I can control the state better and manipulate toggle functionality of flipView when
    // delete ex element is toggled and rendered.

    // const [flipView, setFlipView] = useState(new Array(props.data.length).fill(false))
    // const [currentIndex, setCurrentindex] = useState(null)

    // function to reset flipView to close any existing edit/view modals

    // function resetFlipView() {
    //     setFlipView(new Array(flipView.length).fill(false))
    // }

    // function to flip current flipView boolean to true. Allows for edit/view modal to pop up for given exercise.

    // function handleFlipView(e) {
    //     resetFlipView()
    //     console.log(e.target.dataset.flipview)
    //     const index = Number(e.target.dataset.flipview)
    //     setFlipView(prev => {
    //         const boolArr = [...prev]
    //         boolArr[index] = !boolArr[index]
    //         return boolArr
    //     })
    //     setCurrentindex(index)
    // }
    
    const divStyles = {
        height: props.flipView[props.currentIndex] ? "100px" : "0px",
        border: props.flipView[props.currentIndex] ? "2px solid black" : "none"
    }
    
        const currentWorkout = props.data && props.data.length > 0 ? props.data.map((ex, index) => {
            const splitName = ex.name.split(' ')
            const capitalizedWords = splitName.map((string) => {
                const firstChar = string.charAt(0).toUpperCase()
                const slicedString = string.slice(1)
                const combinedString = firstChar + slicedString
                return combinedString
            }).join(' ')
            // fix this to work across all screen sizes. Should only show with ellipses on mobile since its a smaller screen
            const shortenedExName = capitalizedWords.length > 35 ? `${capitalizedWords.slice(0, capitalizedWords.length - 1) + '...'}` : capitalizedWords
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
                                <p className="current-ex-name">{shortenedExName}</p>
                                { props.editMode && props.alreadySavedWorkout &&
                                <div>
                                {!props.flipView[index] ?
                                <i onClick={e => props.handleFlipView(e)} data-flipview={index} style={{transform: props.flipView[index] ? "rotate(90deg)" : "rotate(0deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis-vertical"></i>
                                :
                                <i onClick={e => props.resetFlipView()} data-flipview={index} style={{transform: props.flipView[index] ? "rotate(0deg)" : "rotate(90deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis"></i>
                                }
                                {props.flipView[index] &&
                                <div
                                    style={{
                                        height: props.flipView[index] ? "auto" : "0px",
                                        width: props.flipView[index] ? "100px" : "0px"
                                    }}
                                    className="ex-detail-div"
                                >
                                    <Link to={`ExDetailedView/${ex.id}`} state={{ date: props.date }} className="ex-detail-view-div">
                                        <p>View</p>
                                        <span class="material-symbols-outlined curr-ex-view">
                                            visibility
                                        </span>
                                    </Link>
                                    <div className="ex-detail-delete-div">
                                        <p>Delete</p>
                                        <span
                                            className="material-symbols-outlined curr-ex-delete"
                                            onClick={e => props.toggleDel(e)}
                                            data-deleteexid={ex.id}
                                        >
                                            delete
                                        </span>
                                    </div>
                                    
                                </div>
                                }
                                </div>
                                }
                                {!props.alreadySavedWorkout &&
                                    <div>
                                        {!props.flipView[index] ?
                                        <i onClick={e => props.handleFlipView(e)} data-flipview={index} style={{transform: props.flipView[index] ? "rotate(90deg)" : "rotate(0deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis-vertical"></i>
                                        :
                                        <i onClick={e => props.resetFlipView()} data-flipview={index} style={{transform: props.flipView[index] ? "rotate(0deg)" : "rotate(90deg)", transition: ".2s ease all"}} className="fa-solid fa-ellipsis"></i>
                                        }
                                        {props.flipView[index] &&
                                        <div
                                            style={{
                                                height: props.flipView[index] ? "auto" : "0px",
                                                width: props.flipView[index] ? "100px" : "0px"
                                            }}
                                            className="ex-detail-div"
                                        >
                                            <Link to={`ExDetailedView/${ex.id}`} state={{ date: props.date }} className="ex-detail-view-div">
                                                <p>View</p>
                                                <span class="material-symbols-outlined curr-ex-view">
                                                    visibility
                                                </span>
                                            </Link>
                                            <div className="ex-detail-delete-div">
                                                <p>Delete</p>
                                                <span
                                                    className="material-symbols-outlined curr-ex-delete"
                                                    onClick={e => props.toggleDel(e)}
                                                    data-deleteexid={ex.id}
                                                    // Do I need this data attribute? To flip "flipView" state
                                                    data-index={index}
                                                >
                                                    delete
                                                </span>
                                            </div>
                                            
                                        </div>
                                        }
                                    </div>
                                }
                            </div>

                            {props.alreadySavedWorkout &&
                            <ul className="all-sets-container">
                                {ex.setsReps && Array.isArray(ex.setsReps) && ex.setsReps.map((set, index) => (
                                    
                                    <li key={index} className="set-container">
                                        {set.isPR ?
                                        <span className="material-symbols-outlined pr-icon">
                                            trophy
                                        </span> :
                                        <p className="hidden-el">h</p>
                                        }
                                        <p className="set-weight">lbs: {set.weight}</p>
                                        <p className="set-reps">reps: {set.reps}</p>
                                        { props.editMode &&
                                        <span
                                            id={ex.id}
                                            className="material-symbols-outlined edit-ex"
                                            data-setnoteid={set.setId}
                                            data-setindex={index}
                                            data-note={set.note}
                                            onClick={e => props.toggleNote(e)}
                                        >
                                            comment
                                        </span>
                                        }

                                        { props.editMode ?
                                        <span
                                            id={ex.id}
                                            data-editsetid={set.setId}
                                            data-setindex={index}
                                            onClick={e => props.toggleEdit(e)}
                                            className="material-symbols-outlined edit-ex"
                                        >
                                            edit
                                        </span>
                                        :
                                        <span className="hidden-el">h</span>
                                        }
                                        { props.editMode ?
                                        <span
                                            onClick={e => props.toggleDel(e)}
                                            id={ex.id}
                                            data-deletesetid={set.setId}
                                            className="material-symbols-outlined delete-set"
                                        >
                                            delete
                                        </span>
                                        :
                                        <span className="hidden-el">h</span>
                                        }
                                    </li>
                                ))}
                            </ul>
                            }
                            {!props.alreadySavedWorkout &&
                            <ul className="all-sets-container">
                                {ex.setsReps && Array.isArray(ex.setsReps) && ex.setsReps.map((set, index) => (
                                    
                                    <li key={index} className="set-container">

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
                                            className="material-symbols-outlined edit-ex"
                                            data-setnoteid={set.setId}
                                            data-setindex={index}
                                            data-note={set.note}
                                            onClick={e => props.toggleNote(e)}
                                        >
                                            comment
                                        </span>

                                        <span
                                            id={ex.id}
                                            data-editsetid={set.setId}
                                            data-setindex={index}
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
                                        
                                    </li>
                                ))}
                            </ul>
                            }
                            {/* <Link to={`ExerciseDetail/${ex.id}`} className="add-set-link"> */}
                                <button data-exid={ex.id} onClick={e => props.toggleAdd(e)} className="add-set-btn">Add set</button>
                            {/* </Link> */}
                        </div>
                    )}
                </Draggable>
            )
        }):
            <div className="no-current-workout-container">
                <p className="no-current-text">No workout for this date</p>
                <Link to='AllCategories' className="link-btn">Add some exercises!</Link>
            </div>

        return (
            currentWorkout
        )
}