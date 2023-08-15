import "./index.css"
let FilterContainer = (props) => {


    let renderRatingList = () => {
        const { ratingOptions } = props
        return ratingOptions.map(rating => {
            const { activeRating, changeRating } = props
            const onChangeRating = () => changeRating(rating.ratingId)
            const ratingClassName = activeRating === rating.ratingId ? "and-up active-rating" : "and-up"
            return (
                <li
                    className="rating-item"
                    key={rating.ratingId}
                    onClick={onChangeRating}
                >
                    <img alt={rating.ratingId} className="rating-image" src={rating.imageUrl} />
                    <p className={ratingClassName}>&Up</p>
                </li>
            )
        })
    }

    let renderRatingFilters = () => (
        <div>
            <h1 className="rating-heading">Rating</h1>
            <ul className="ratings-list">{renderRatingList()}</ul>
        </div>
    )

    let renderCategoryList = () => {
        const { categoryOptions } = props
        return categoryOptions.map(category => {

            const { activeCategory, changeActtiveCategory } = props

            let onClickCategory = () => changeActtiveCategory(category.categoryId)

            const isActive = activeCategory === category.categoryId ? "category-name active-category-name" : "category-name"

            return <li className="category-item" onClick={onClickCategory} key={category.categoryId}><p className={isActive}>{category.name}</p></li>
        })
    }

    let renderCategoryProducts = () => {
        return (
            <>
                <h1 className="category-heading">Categories</h1>
                <ul className="categories-list">{renderCategoryList()}</ul>
            </>
        )
    }

    let onChangeSearchInput = (event) => {
        const { changeSearchInput } = props
        changeSearchInput(event.target.value)
    }

    let onKeyDownPressed = (event) => {
        const { searchEnterPressed } = props
        if (event.key === "Enter") {
            searchEnterPressed()
        }
    }

    let renderSearchBar = () => {
        const { searchInput } = props
        return (
            <div className="search-input-container">
                <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    value={searchInput}
                    onChange={onChangeSearchInput}
                    onKeyDown={onKeyDownPressed}
                />
            </div>
        )
    }

    const {clearFilters} = props

    return (
        <div className="filters-group-container">
            {renderSearchBar()}
            {renderCategoryProducts()}
            {renderRatingFilters()}
            <button
            type="button"
            className="clear-filters-btn"
            onClick={clearFilters}
            >
                Clear Filters 
            </button>
        </div>
    )
}

export default FilterContainer