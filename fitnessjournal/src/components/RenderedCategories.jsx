import Category from "./Category"
import { Skeleton } from "@mui/material"

export default function RenderedCategories({loadedCategories, skeletonArr}) {

    // fix toggle edit and toggle delete functions. pass them as props and deconstruct.
    const renderedCategories = loadedCategories.map(obj => {
        return (
            <Category
                key={obj.id}
                id={obj.id}
                name={obj.name}
                toggleEdit={(e) => toggleEdit(e)}
                toggleDelete={(e) => toggleDelete(e)}
            />
        )
    })

    const renderedSkelCategories = skeletonArr.map((_, index) => {
        return (
            <div key={index} className="skeleton-cat-container">
                <Skeleton width="50%" height={50}/>
                <Skeleton width={75} height={50}/>
            </div>
        )
    })

    return (
        <div>
            {loadedCategories.length === 0 ?
                renderedSkelCategories
                :
                renderedCategories
            }
        </div>
    )
}