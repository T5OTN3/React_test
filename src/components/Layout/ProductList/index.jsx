

export default function ProductList({recipesList}){

    return(
        <div className="w-1/5">
            {
                recipesList?.map(el => {
                    return (
                        <div key={el.recipe_id}>
                            <img className="w-16 h-16 rounded-full" src={el.image_url} alt={el.title} />
                            <p>{el.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}