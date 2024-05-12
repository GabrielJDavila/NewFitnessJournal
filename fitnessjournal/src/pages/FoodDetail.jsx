import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import BackBtn from "../components/BackBtn"
export default function FoodDetail() {
    const params = useParams()
    const foodId = params.id
    const [foodData, setFoodData] = useState(null)
    const [servingSizeAmnt, setServingSizeAmnt] = useState({
        amount: "1"
    })
    const firstChar = foodData ? foodData.description.charAt(0).toUpperCase() : ""
    const slicedLetters = foodData ? foodData.description.toLowerCase().slice(1) : ""
    const capWord = foodData && firstChar + slicedLetters
    console.log(foodData)
    useEffect(() => {
        fetchedSingleFoodData()
    }, [])

    async function fetchedSingleFoodData() {
        
            try {
                const res = await fetch(
                    `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=OAsoWYlRcvGgu4PIfutME2Mmo0LsyoU5n8ANr0Ym`
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

    function handleChange(name, value) {
        setServingSizeAmnt(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // const nutrients = foodData ? Object.entries(foodData.labelNutrients).map(([key, nutrient], index) => {
    //     return (
    //         <div key={index} className="nutrient-container">
    //             <p>{key}</p>
    //             <p>{Math.round(nutrient.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //     )
    // }) : ""

    const nutrientOrder = [
        "calories",
        "fat",
        "saturatedFat",
        "transFat",
        "cholesterol",
        "sodium",
        "carbohydrates",
        "fiber",
        "sugars",
        "protein",
        "vitaminD",
        "calcium",
        "iron",
        "potassium"
    ]

    const nutrients = foodData && foodData.labelNutrients ? (
        <div className="rendered-nutrients">
            {nutrientOrder.map((nutrientName, index) => (
                foodData.labelNutrients[nutrientName] ?
                <div key={index} className="nutrient-container">
                    <p>{nutrientName}</p>
                    <p>{Math.round(foodData.labelNutrients[nutrientName].value * servingSizeAmnt.amount)}</p>
                </div>
                :
                <div key={index} className="nutrient-container">
                    <p>{nutrientName}</p>
                    <p>--</p>
                </div>
            ))}
        </div>
    ) :
    (
        <div className="no-nutrients-available">
            {nutrientOrder.map((nutrientName, index) => (
                <div key={index} className="nutrient-container">
                    <p>{nutrientName}</p>
                    <p>--</p>
                </div>
            ))}
        </div>
    )

    // const noNutrientsAvailable = (
    //     <div className="no-nutrients-available">
    //         {nutrientOrder.map((nutrientName, index) => {
    //             <div key={index} className="nutrient-container">
    //                 <p>{nutrientName}</p>
    //                 <p>--</p>
    //             </div>
    //         })}
    //     </div>
    // )

    // const nutrients = foodData && 
    //     <div>
    //         <div classname="nutrient-container">
    //             <p>{foodData.labelNutrients.calories}</p>
    //             <p>{Math.round(foodData.labelNutrients.calories.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //         <div classname="nutrient-container">
    //             <p>{foodData.labelNutrients.fat}</p>
    //             <p>{Math.round(foodData.labelNutrients.fat.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //         <div classname="nutrient-container">
    //             <p>{foodData.labelNutrients.transFat}</p>
    //             <p>{Math.round(foodData.labelNutrients.transFat.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //         <div classname="nutrient-container">
    //             <p>{foodData.labelNutrients.carbohydrates}</p>
    //             <p>{Math.round(foodData.labelNutrients.carbohydrates.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //         <div classname="nutrient-container">
    //             <p>{foodData.labelNutrients.transFat}</p>
    //             <p>{Math.round(foodData.labelNutrients.transFat.value * servingSizeAmnt.amount)}</p>
    //         </div>
    //     </div>
    
    

    const formulaGramsToOz = 0.035274
    const originalServingSize = foodData && `${foodData.servingSize * servingSizeAmnt.amount}${foodData.servingSizeUnit}`
    const originalServingSizeOz = foodData && `${Math.round(foodData.servingSize * servingSizeAmnt.amount * formulaGramsToOz)}oz`
    // console.log(originalServingSize, originalServingSizeOz)
    // console.log(foodData && servingSizeAmnt.amount * foodData.servingSize)
    return (
        <div className="food-detail-page">
            <div className="food-detail-top-container">
                <BackBtn />
                <p>{capWord}</p>
            </div>
            {foodData && foodData.servingSize &&
                <form className="serving-size-form">
                    <input
                        type="text"
                        name="amount"
                        value={servingSizeAmnt.amount}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    />
                    <select>
                        <option value={originalServingSize}>{originalServingSize}</option>
                        <option value={originalServingSizeOz}>{originalServingSizeOz}</option>
                        <option value={foodData.servingSize}>{foodData.servingSize}{foodData.servingSizeUnit}</option>
                    </select>
                </form>
            }
            <div className="all-nutrients-container">
                {/* {foodData && foodData.labelNutrients !== undefined && foodData.labelNutrients !== null ? 
                    (Object.keys(foodData.labelNutrients).length === 0 ? noNutrientsAvailable : nutrients) 
                    : noNutrientsAvailable} */}
                {nutrients}
            </div>
        </div>
    )
}