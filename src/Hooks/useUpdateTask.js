import { patchTask } from '@/api/todos/patchTask'
import { useToast } from '@/context/ToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateTask() {

    const queryClient = useQueryClient()
    const { showToast } = useToast()

    return useMutation({
        mutationFn: ({ update, todoID, taskID }) => patchTask(update, todoID, taskID),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user'])
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    })
}

