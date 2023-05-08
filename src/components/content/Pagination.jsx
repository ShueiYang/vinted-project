

const Pagination = ({ docsCount, totalCount, pageLimit, gotoNextPage, gotoPrevPage }) => {
    
    return (
        <div className="flex gap-2">
          <button 
            onClick={()=>{gotoPrevPage(pageLimit)}} 
            className={`${docsCount > pageLimit ? "active" : ""} chevron`}
          >
            <img src="/icons/chevron_left.svg" alt="chevron" />
          </button>        
    
          <button 
            onClick={()=>{gotoNextPage(pageLimit)}} 
            className={`${docsCount < totalCount ? "active" : ""} chevron`}
          >
            <img src="/icons/chevron_right.svg" alt="chevron" />
          </button> 
        </div>
    )
}
export default Pagination;
