import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function FoodDetail() {
    const params = useParams()
    const foodId = params.id
    const [foodData, setFoodData] = useState(null)
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

    return (
        <div className="food-detail-page">
            <h1>Food Detail Page</h1>
        </div>
    )
}