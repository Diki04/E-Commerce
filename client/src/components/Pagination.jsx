/* eslint-disable */
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { page, totalPage } = pagination;
  const {search, pathname} = useLocation()
  const navigation = useNavigate()

  const handlePageChange = (number) => {
    // console.log(number);
    // console.log(search);
    // console.log(pathname);

    const searchParams = new URLSearchParams(search)
    searchParams.set("page", number)
    navigation(`${pathname}?${searchParams.toString()}`)
    
  }

  const pages = Array.from({ length: totalPage }, (_, index) => {
    return index + 1;
  });
  return (
    <div className="join">
      {pages.map((pageNumber) => {
        return <button 
        onClick={() => handlePageChange(pageNumber)}
        key={pageNumber} 
        className={`btn btn-lg border-none join-item 
        ${pageNumber === page ? "bg-primary" : ""}` }
        >
          {pageNumber}
        </button>;
      })}
    </div>
  );
};

export default Pagination;
