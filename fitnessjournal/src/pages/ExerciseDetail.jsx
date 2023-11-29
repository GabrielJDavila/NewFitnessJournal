import { useState, useEffect } from "react"
import { useParams } from "react-router-dom" 

export default function ExerciseDetail() {
    const params = useParams()
    console.log(params)
    return (
        <div>
            <fieldset className="dash-input-fieldset">
                <label htmlFor="sets">Sets:</label>
                <input type="text" name="sets"/>
            </fieldset>
            <fieldset className="dash-input-fieldset">
                <label htmlFor="sets">Reps:</label>
                <input type="text" name="sets"/>
            </fieldset>
            <fieldset className="dash-input-fieldset">
                <label htmlFor="sets">Weight:</label>
                <input type="text" name="sets"/>
                <select>
                    <option>lb</option>
                    <option>kg</option>
                </select>
            </fieldset>
            <button className="add-set-btn">Add set</button>
        </div>
    )
}