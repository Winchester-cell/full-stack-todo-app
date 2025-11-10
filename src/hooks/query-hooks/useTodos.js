import getTodos from "@/api/todos/getTodos"
import { useProjectsPaginationStore } from "@/store/useProjectsPaginationStore"
import { useQuery } from "@tanstack/react-query"

export default function useTodos({ queryType, enableOption, filterValue }) {

    const { currentPage } = useProjectsPaginationStore()

    if (queryType === 'normal') {
        return useQuery({
            queryKey: ['todos', currentPage],
            queryFn: () => getTodos(currentPage),
            enabled: enableOption
        })
    }
    if (queryType === 'filtering') {
        return useQuery({
            queryKey: ['todos', filterValue],
            queryFn: () => getTodos(null, filterValue),
            enabled: enableOption
        })
    }

    else return 'no valid query type'

}
