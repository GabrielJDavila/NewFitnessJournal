import { Link } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
export default function CurrentWorkoutList(props) {
   const { data, toggleDel, toggleEdit } = props
   

    const currentWorkout = props.data.map((ex, index) => {
        return (
            <Draggable key={ex.id} draggableId={ex.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={index} className="rendered-ex-dash-container">
                        <div className="ex-name-container">
                            <p className="current-ex-name">{ex.name}</p>
                            <i
                                onClick={e => props.toggleDel(e)}
                                data-deleteexid={ex.id}
                                className="fa-solid fa-trash curr-ex-delete"
                            ></i>
                        </div>
                        
                        <ul className="all-sets-container">
                            {ex.setsReps.map((set, setIndex) => (
                                <li key={setIndex} className="set-container">
                                    <p className="set-weight">{set.weightType}: {set.weight}</p>
                                    <p className="set-reps">reps: {set.reps}</p>
                                    <span
                                        id={ex.id}
                                        data-editsetid={set.setId}
                                        onClick={e => props.toggleEdit(e)}
                                        className="material-symbols-outlined edit-ex"
                                    >
                                        edit
                                    </span>
                                    <i
                                        onClick={e => props.toggleDel(e)}
                                        id={ex.id}
                                        data-deletesetid={set.setId}
                                        className="fa-solid fa-trash"
                                    ></i>
                                </li>
                            ))}
                        </ul>
                        <Link to={`ExerciseDetail/${ex.id}`} className="add-set-link">
                            <button className="add-set-btn">Add set</button>
                        </Link>
                    </div>
                )}
            </Draggable>
        )
    })

    // <div key={index} className="rendered-ex-dash-container">
    //             <div className="ex-name-container">
    //                 <p className="current-ex-name">{ex.name}</p>
    //                 <i
    //                     onClick={e => props.toggleDel(e)}
    //                     data-deleteexid={ex.id}
    //                     className="fa-solid fa-trash curr-ex-delete"
    //                 ></i>
    //             </div>
                
    //             <ul className="all-sets-container">
    //                 {ex.setsReps.map((set, setIndex) => (
    //                     <li key={setIndex} className="set-container">
    //                         <p className="set-weight">{set.weightType}: {set.weight}</p>
    //                         <p className="set-reps">reps: {set.reps}</p>
    //                         <span
    //                             id={ex.id}
    //                             data-editsetid={set.setId}
    //                             onClick={e => props.toggleEdit(e)}
    //                             className="material-symbols-outlined edit-ex"
    //                         >
    //                             edit
    //                         </span>
    //                         <i
    //                             onClick={e => props.toggleDel(e)}
    //                             id={ex.id}
    //                             data-deletesetid={set.setId}
    //                             className="fa-solid fa-trash"
    //                         ></i>
    //                     </li>
    //                 ))}
    //             </ul>
    //             <Link to={`ExerciseDetail/${ex.id}`} className="add-set-link">
    //                 <button className="add-set-btn">Add set</button>
    //             </Link>
    //         </div>
    return (
        currentWorkout
    )
}