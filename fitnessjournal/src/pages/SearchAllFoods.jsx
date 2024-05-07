import { useState, useEffect } from "react"
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchAllFoods() {
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })
    const [foodData, setFoodData] = useState(null)
    console.log(foodData.foods)

    useEffect(() => {
        fetchedFoodData()
    }, [])

    async function fetchedFoodData() {
        try {
            const res = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=OAsoWYlRcvGgu4PIfutME2Mmo0LsyoU5n8ANr0Ym&query=${searchQuery.name}`
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

    function handleSubmit(e) {
        e.preventDefault()
        fetchedFoodData()
    }

    function handleChange(name, value) {
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))
    }
    // const filteredFoods = [...new Set(foodData.foods.map(food => food.description))]

    const foodMap = new Map()
        foodData.foods.forEach(food => {
            if(!foodMap.has(food.description)) {
                foodMap.set(food.description, food)
            }
        })

    const foodArr = Array.from(foodMap.values())

    console.log(foodArr)
    const renderedFoods = foodArr.map((food, index) => {
        return (
        <div key={index} className="rendered-foods-container">
            <p className="food-description">{food.description}</p>
            <p className="food-calories-preview">{food.foodNutrients[3].value} KCALS</p>
        </div>
        )
    })
    
    return (
        <div className="search-foods-page">
            <form onSubmit={handleSubmit} className="search-food-container">
                <input
                    type="text"
                    name="name"
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    value={searchQuery.name}
                    className="food-search"
                    placeholder="search food"
                />
                <button className="food-search-btn">
                    <span data-search className="material-symbols-outlined search-food-icon">
                        search
                    </span>
                </button>
            </form>
            {foodData && renderedFoods}
        </div>
        
    )
}