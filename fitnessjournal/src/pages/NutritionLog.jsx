import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
export default function NutritionLog() {
    const [searchQuery, setSearchQuery] = useState()
    const [foodData, setFoodData] = useState(null)
    
    useEffect(() => {
        const fetchedFoodData = async () => {
            try {
                const res = await fetch(
                    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=OAsoWYlRcvGgu4PIfutME2Mmo0LsyoU5n8ANr0Ym&query=Cheddar%20Cheese`
                )
                if(!res.ok) {
                    throw new Error("Failed to fetch food data.")
                }

                const data = await res.json()

                setFoodData(data)
            }catch(err) {
                console.error("error fetching data:", err)
            }
        }

        fetchedFoodData()
    }, [])
    console.log(foodData)

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    return (
        <div className="nutrition-page">
            <section className="hero-section food-log-hero">
                <h1>Nutrition</h1>
            </section>
            <section className="cal-remaining-section">
                <h2>Calories</h2>
                <div className="calories-remaining-container">
                    <p>2390</p>
                    <p>-</p>
                    <p>0</p>
                    <p>=</p>
                    <h3>2390 remaining</h3>
                </div>
            </section>
            <section className="nutrition-log">
                <div className="log-mini">
                    <div className="food-log-title">
                        <h1>Breakfast</h1>
                        <h1>0</h1>
                    </div>
                    
                    <Link to="SearchAllFoods" className="food-log-link">
                        <p className="food-log-link-text">add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <div className="food-log-title">
                        <h1>Lunch</h1>
                        <h1>0</h1>
                    </div>
                    <Link className="food-log-link">
                        <p className="food-log-link-text">add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <div className="food-log-title">
                        <h1>Dinner</h1>
                        <h1>0</h1>
                    </div>
                    <Link className="food-log-link">
                        <p className="food-log-link-text">add food</p>
                    </Link>
                </div>

                <div className="log-mini">
                    <div className="food-log-title">
                        <h1>Snacks</h1>
                        <h1>0</h1>
                    </div>
                    <Link className="food-log-link">
                        <p className="food-log-link-text">add food</p>
                    </Link>
                </div>
            </section>
            {/* <section className="dash-links-container">
                <Link to="AllCategories" className="date-dash link-portal-dash">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <p className="link-text">Add To Log</p>
                </Link>
                <div className="date-dash">
                    <span className="material-symbols-outlined" >
                        delete
                    </span>
                    <p className="link-text">Delete</p>
                </div>
                <div className="workout-timer-container date-dash">
                    <span className="material-symbols-outlined">
                        timer
                    </span>
                    <p className="link-text">Timer</p>
                </div>
                <div className="date-dash">
                    <span className="material-symbols-outlined calendar-icon">
                         calendar_month
                    </span>
                    <p className="link-text">Date</p>
                </div>
            </section> */}
        </div>
    )
}