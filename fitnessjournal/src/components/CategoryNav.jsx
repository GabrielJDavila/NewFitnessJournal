import { useEffect, useState } from "react"; 
import BackBtn from "./BackBtn";
import { Link } from "react-router-dom"
import SearchTool from "./modals/SearchTool";
import NewCat from "./NewCat";
import NewEx from "../pages/NewEx";

export default function CategoryNav(props) {
    const [toggleNewCatModal, setToggleNewCatModal] = useState(false)
    const [toggleNewExModal, setToggleNewExModal] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)
    const [closeExToggle, setCloseExToggle] = useState(false)
    
    useEffect(() => {
        if(closeExToggle) {
            const timeout = setTimeout(() => {
                setCloseExToggle(false)
                setToggleNewExModal(false)
            }, 2000)

            return () => clearTimeout(timeout) 
        }
    }, [closeExToggle])

    function toggleModal(e) {
        if(e.target.dataset.newcat) {
            setToggleNewCatModal(prev => !prev)
           
        } else if(e.target.dataset.addex) {
            setToggleNewExModal(prev => !prev)
            
        } else if(e.target.dataset.search || e.target.dataset.close) {
            setToggleSearch(prev => !prev)
        }
    }

    function flipNewExModal(flip) {
        if(flip) {
            setCloseExToggle(true)
          
        }
    }

    return (
        <div className="category-interface-btns-outer-container">
            
            <div className="cat-interface-btn-container">
                
                <Link
                    className="back-btn"
                    to=".."
                    relative="path"
                >
                    <button className="category-interface-btn">
                        <span className="material-symbols-outlined arrow-back-catnav">
                            arrow_back
                        </span>
                    </button>
                </Link>
                <p className="category-interface-btn-text">go back</p>
            </div>

            <div className="cat-interface-btn-container">
                <button className="category-interface-btn">
                    <span onClick={toggleModal} data-search className="material-symbols-outlined">
                        search
                    </span>
                </button>
                <p className="category-interface-btn-text">search</p>
            </div>

            <div className="cat-interface-btn-container">
                <button className="category-interface-btn">
                    <span onClick={toggleModal} data-newcat className="material-symbols-outlined">
                        create_new_folder
                    </span>
                </button>
                <p className="category-interface-btn-text">new category</p>
            </div>

            <div className="cat-interface-btn-container">
                <button className="category-interface-btn">
                    <span onClick={toggleModal} data-addex className="material-symbols-outlined">
                        add
                    </span>
                </button>
                <p className="category-interface-btn-text">new exercise</p>
            </div>
            <SearchTool toggleModal={toggleModal} toggleSearchBar={toggleSearch}/>
            {toggleNewCatModal && <NewCat toggleModal={toggleModal} loadCats={props.loadData}/>}
            {toggleNewExModal && <NewEx reloadExData={props.reloadExData} toggleModal={toggleModal} flipNewExModal={flipNewExModal} currentCatId={props.currentCatId}/>}

        </div>
    )
}