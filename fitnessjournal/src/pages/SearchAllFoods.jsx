import { useState, useEffect } from "react"
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom"

export default function SearchAllFoods() {
    const [searchQuery, setSearchQuery] = useState({
        name: ""
    })
    const [foodData, setFoodData] = useState(null)
    console.log(searchQuery.name.length)
    useEffect(() => {
        fetchedFoodData()
    }, [])

    async function fetchedFoodData() {
        if(searchQuery.name.length > 0) {
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
    if (foodData) {
        foodData.foods.forEach(food => {
            if(!foodMap.has(food.description)) {
                foodMap.set(food.description, food)
            }
        })
    }

    const foodArr = Array.from(foodMap.values())

    console.log(foodArr)
    const renderedFoods = foodArr.map((food, index) => {
        const foodId = food.fdcId
        const firstChar = food.description.charAt(0).toUpperCase()
        const slicedLetters = food.description.toLowerCase().slice(1)
        const capWord = firstChar + slicedLetters
        const cals = food.foodNutrients.find(nutrient => nutrient.nutrientName === "Energy")
        const calsvalue = cals ? cals.value : ""
        return (
        <Link key={index} to={`${foodId}`}>
            <div className="rendered-foods-container">
                <p className="food-description">{capWord}</p>
                <p className="food-calories-preview">{calsvalue} KCALS</p>
            </div>
        </Link>
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
            {foodData && searchQuery && renderedFoods}
        </div>
        
    )
}