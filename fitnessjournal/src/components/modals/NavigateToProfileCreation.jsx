import { Link } from "react-router-dom";

export default function NavigateToProfileCreation(props) {
    return (
        <div className="navigate-to-profilecreation-modal">
            <p>Creating your profile is recommended for an optimized experience. Would you like to set up your profile?</p>
            <Link to="/" onClick={e => props.handleSignUp(e)}>Skip for now</Link>
            <Link to="profilecreation" onClick={e => props.handleSignUp(e)}>Create profile</Link>
        </div>
    )
}