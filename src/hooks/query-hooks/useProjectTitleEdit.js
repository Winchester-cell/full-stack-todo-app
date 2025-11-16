import { patchProjectTitle } from '@/api/todos/patchProjectTitle'
import { useToast } from '@/context/ToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useProjectTitleEdit() {

    const queryClient = useQueryClient()
    const { showToast } = useToast()

    return useMutation({
        mutationFn: ({ todoID, newTitle }) => patchProjectTitle(todoID, newTitle),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['todo'])
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    })
}

