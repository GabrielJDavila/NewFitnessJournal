import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProgramIntake() {

    const [formData, setFormData] = useState({
        currentLevel: "",
        goals: "",
        workoutDaysTarget: "",
        equipment: ""
    })
    let navigate = useNavigate()

    function handleChange(name, value) {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        navigate("/program-preview")
    }
    return (
        <form onSubmit={handleSubmit} className="program-intake-form">
            <h1 className="title">Program Creation</h1>
            <div className="program-intake-container">
                <fieldset>
                    <legend>Current Training Level:</legend>
                    <p>* Note: years of lifting experience doesn't necessarily equate to experience level.
                        If you find that you have multiple years of experience but gains are more in line with
                        a certain category, pick the appropriate one.</p>
                    <select
                        name="currentLevel"
                        className="program-select"
                        value={formData.currentLevel}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="beginner">Beginner (no experience)</option>
                        <option value="novice">Novice (6 months - 1 year experience)</option>
                        <option value="intermediate">Intermediate (1 - 3 years experience)</option>
                        <option value="advanced">Advanced (3+ years experience)</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend>Goals:</legend>
                    <select
                        name="goals"
                        className="program-select"
                        value={formData.goals}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="weight loss">Weight loss</option>
                        <option value="build strength">Strength</option>
                        <option value="build muscle">Hypertrophy</option>
                        <option value="build endurance">Endurance</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend>How many sessions per week would you like to train?</legend>
                    <p>* Generally, it's recommended to start with an easily attainable frequency of training.
                        Training should be sustainable!
                    </p>
                    <select
                        name="workoutDaysTarget"
                        className="program-select"
                        value={formData.workoutDaysTarget}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="1">1 session</option>
                        <option value="2">2 sessions</option>
                        <option value="3">3 sessions (recommended)</option>
                        <option value="4">4 sessions (recommended)</option>
                        <option value="5">5 sessions</option>
                        <option value="6">6 sessions</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend>What kind of equipment would you be using?</legend>
                    <select
                        name="equipment"
                        className="program-select"
                        value={formData.equipment}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="commercial-gym">commercial gym equipment (large variety of equipment)</option>
                        <option value="home-gym">home gym setup (mix of dumbbells, barbells, cables, etc.)</option>
                        <option value="bodyweight">bodyweight</option>
                    </select>
                </fieldset>

                {/* instead of having a fieldset for injury considerations, I should just offer
                    the alternative when user is viewing exercises. So on workout log, there should
                    be an option to swap exercises for common injuries - knee, shoulder, low back, etc.
                */}
            </div>
            <button>Create Routine</button>
        </form>
    )
}