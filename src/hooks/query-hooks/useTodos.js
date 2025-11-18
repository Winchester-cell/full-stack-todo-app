import getTodos from "@/api/todos/getTodos"
import { useProjectsPaginationStore } from "@/store/useProjectsPaginationStore"
import { useQuery } from "@tanstack/react-query"

export default function useTodos({ filterValue }) {

    const { currentPage } = useProjectsPaginationStore()

    return useQuery({
        queryKey: ['todos', currentPage, filterValue],
        queryFn: () => getTodos(currentPage, filterValue),
        staleTime: 1000 * 60 * 5
    })
}
