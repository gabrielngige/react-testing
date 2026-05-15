function Sort({onSort}){
    return(
        <div className="sort-bar">
            <label>Sort by:</label>
            <select onChange={(e) => onSort(e.target.value)}>
                <option value={"description"}>Description</option>
                <option value={"category"}>Category</option>
            </select>
        </div>
    )
}
export default Sort