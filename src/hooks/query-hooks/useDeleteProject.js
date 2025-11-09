import { deleteTodo } from '@/api/todos/deleteTodo'
import { useToast } from '@/context/ToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteProject() {

    const queryClient = useQueryClient()
    const { showToast } = useToast()

    return useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['todos'])
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    })

}
