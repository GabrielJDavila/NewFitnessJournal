
export default function ProgramIntake() {
    return (
        <form className="program-intake-form">
            <h1 className="title">Program Creation</h1>
            <div className="program-intake-container">
                <fieldset>
                    <legend>Current Training Level:</legend>
                    <p>* Note: years of lifting experience doesn't necessarily equate to experience level.
                        If you find that you have multiple years of experience but gains are more in line with
                        a certain category, pick the appropriate one.</p>
                    <select name="trainingLevel" className="program-select">
                        <option value="beginner">Beginner (no experience)</option>
                        <option value="novice">Novice (6 months - 1 year experience)</option>
                        <option value="intermediate">Intermediate (1 - 3 years experience)</option>
                        <option value="advanced">Advanced (3+ years experience)</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend>Goals:</legend>
                    <select name="goals" className="program-select">
                        <option value="weight-loss">Weight loss</option>
                        <option value="build-muscle">Build Muscle</option>
                        <option value="both">Both</option>
                    </select>
                </fieldset>
            </div>
        </form>
    )
}