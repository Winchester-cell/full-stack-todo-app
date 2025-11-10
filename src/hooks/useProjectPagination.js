import { useProjectsPaginationStore } from "@/store/useProjectsPaginationStore"
import { useEffect, useState } from "react"

export default function useProjectsPagination(totalPagesFromResponse) {

    const {currentPage , setCurrentPage , totalPages , setTotalPages} = useProjectsPaginationStore()

    useEffect(()=>{
        if(totalPagesFromResponse){
            setTotalPages(totalPagesFromResponse)
        }
    },[totalPagesFromResponse])

    return {currentPage , setCurrentPage , totalPages}

}
