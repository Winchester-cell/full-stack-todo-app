import { deleteTodoTask } from '@/api/todos/deleteTodoTask'
import { useToast } from '@/context/ToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteTask() {

    const queryClient = useQueryClient()
    const { showToast } = useToast()

    return useMutation({
        mutationFn: ({ projectID, taskID }) => deleteTodoTask(projectID, taskID),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user'])
            showToast('Task deleted successfully', "success")
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    })

}
