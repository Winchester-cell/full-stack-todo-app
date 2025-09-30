import postTodo from "@/api/todos/postTodo";
import { useToast } from "@/context/ToastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddProject() {

    const queryClient = useQueryClient();
    const { showToast } = useToast()

    return useMutation({
        mutationFn: (todo) => postTodo(todo),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user']);
        },
        onError: () => {
            showToast('Something went wrong , try again', "error")
        }
    });

}
