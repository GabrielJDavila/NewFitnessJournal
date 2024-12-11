
export default function ExAdded(props) {
    console.log(props.text)
    return (
        <div className="set-added-modal">
            <p className="set-added-text">{props.text}</p>
        </div>
    )
}