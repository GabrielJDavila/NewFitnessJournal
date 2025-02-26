export default function ProgramSnapshot({currentProgram}) {

    return (
        <div className="log-analysis-container">
            <div className="log-analysis">
                <h2 className="log-analysis-title2">Personal Records</h2>
                <div>
                    {currentProgram ?
                        currentProgram
                        :
                        <div>
                            <p>No current program</p>
                            <button>create a program</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}