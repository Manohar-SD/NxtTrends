
import "./index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSort } from "@fortawesome/free-solid-svg-icons"
const ProductHeader = (props) => {

  const { sortbyOptions, activeOptionId } = props

  let onChangeSortby = (event) => {
    const { changeSortBy } = props
    changeSortBy(event.target.value)
  }

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <FontAwesomeIcon className="icon" icon={faSort} />
        <p className="sort-by">Sort by :</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductHeader