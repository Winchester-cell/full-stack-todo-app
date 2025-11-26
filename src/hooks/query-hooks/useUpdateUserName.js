import { patchUserName } from '@/api/user/patchUserName'
import { useToast } from '@/context/ToastContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateUserName() {

    const queryClient = useQueryClient()
    const { showToast } = useToast()

    return useMutation({
        mutationFn: (newName) => patchUserName(newName),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user'])
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    })
}

