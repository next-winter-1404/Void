'use client'
import { toPersianFormat } from "@/util/helper/persianFormat";
import {useState,useEffect, useMemo} from "react"

interface paginationProps {
    productInArray:any[],
    itemsPerPage : number,
    setCurrentItems:React.Dispatch<React.SetStateAction<any[]>>

}

export default function paginationPage ({productInArray,itemsPerPage,setCurrentItems}:paginationProps) {

  const [currentPage, setCurrentPage] = useState<number>(1);
  
  
  const currentItems = useMemo(()=>{
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   
   return Array.isArray(productInArray) && productInArray.length > 0
      ? productInArray.slice(indexOfFirstItem, indexOfLastItem)
      : [];
    
  },[productInArray,currentPage]);
    
   
    useEffect(()=>{
       setCurrentItems(currentItems);
       setCurrentPage(1);
    },[currentPage,productInArray,setCurrentItems]) 
    
  
  
  const totalPages =
    Array.isArray(productInArray) && productInArray.length > 0
      ? Math.ceil(productInArray.length / itemsPerPage)
      : 0;


  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 100, behavior: "smooth" });
  };


  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5; 

    if (totalPages <= maxVisible) {
      
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 text-center rounded ${
              currentPage === i
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {toPersianFormat(i)}
          </button>
        );
      }
    } else {
      
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 text-center rounded ${
            currentPage === 1
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          1
        </button>
      );

   
      if (currentPage > 3) {
        buttons.push(
          <span
            key="dots1"
            className="w-8 h-8 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 text-center rounded ${
              currentPage === i
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {toPersianFormat(i)}
          </button>
        );
      }

    
      if (currentPage < totalPages - 2) {
        buttons.push(
          <span
            key="dots2"
            className="w-8 h-8 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

  
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-8 h-8 text-center rounded ${
            currentPage === totalPages
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {toPersianFormat(totalPages)}
        </button>
      );
    }

    return buttons;
  };

  return(
    <>
     <div className=" w-full p-5 flex justify-center mt-6 space-x-2">
            <button
              type="submit"
              onClick={() =>
                currentPage != 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`w-8 h-8 text-center rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {"<"}
            </button>

            {renderPageButtons()}

            <button
              type="submit"
              onClick={() =>
                totalPages != currentPage && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`w-8 h-8 text-center rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {">"}
            </button>
          </div>
    </>
  )

}