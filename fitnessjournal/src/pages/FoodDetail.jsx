import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import BackBtn from "../components/BackBtn"
export default function FoodDetail() {
    const params = useParams()
    const foodId = params.id
    const [foodData, setFoodData] = useState(null)
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

    // const nutrients = []
    // for(const key in foodData.labelNutrients) {
    //     if(foodData.labelNutrients.hasOwnProperty(key)) {
    //         const nutrient = foodData.labelNutrients[key]
    //         nutrients.push(
    //             <div></div>
    //         )
    //     }
    // }

    // const nutrientExample = foodData && foodData.labelNutrients ? Object.entries(foodData.labelNutrients) : ""
    // console.log(foodData.labelNutrients)

    const nutrients = foodData && Object.entries(foodData.labelNutrients).map(([key, nutrient], index) => {
        return (
            <div key={index} className="nutrient-container">
                <p>{key}</p>
                <p>{Math.round(nutrient.value)}</p>
            </div>
        )
    })
    console.log(nutrients)

    // const nutrients = foodData & foodData.labelNutrients.map((nutrient, index) => {
    //     return (
    //         <div key={index} className="nutrient-container">
    //             {nutrient.value}
    //         </div>
    //     )
    // })

    return (
        <div className="food-detail-page">
            <div className="food-detail-top-container">
                <BackBtn />
                <p>{capWord}</p>
            </div>
            <div className="all-nutrients-container">
                {nutrients}
            </div>
        </div>
    )
}