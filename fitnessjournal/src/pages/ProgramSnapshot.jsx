import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProgramSnapshot({currentProgram}) {

    return (
        <div className="log-analysis-container">
            <div className="log-analysis">
                <h2 className="log-analysis-title2">Current Program</h2>
                <div>
                    {currentProgram ?
                        currentProgram
                        :
                        <div>
                            <p>No current program</p>
                            <Link to='ProgramIntake'>
                                <button>
                                create a program
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}