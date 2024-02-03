import BackBtn from "./BackBtn";
import { Link } from "react-router-dom"

export default function CategoryNav(props) {
    return (
        <div className="category-interface-btns-outer-container">
            
            <div className="cat-interface-btn-container">
                
                <Link
                    className="back-btn"
                    to=".."
                    relative="path"
                >
                    <button className="category-interface-btn">
                        <span className="material-symbols-outlined arrow-back">
                            arrow_back
                        </span>
                    </button>
                </Link>
                <p className="category-interface-btn-text">go back</p>
            </div>

            <div className="cat-interface-btn-container">
                <button className="category-interface-btn">
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
                <p className="category-interface-btn-text">search</p>
            </div>

            <div className="cat-interface-btn-container">
                <button onClick={props.toggleModal} data-newcat className="category-interface-btn">
                    <span className="material-symbols-outlined">
                        create_new_folder
                    </span>
                </button>
                <p className="category-interface-btn-text">new category</p>
            </div>

            <div className="cat-interface-btn-container">
                <button onClick={props.toggleModal} data-addex className="category-interface-btn">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </button>
                <p className="category-interface-btn-text">new exercise</p>
            </div>

        </div>
    )
}