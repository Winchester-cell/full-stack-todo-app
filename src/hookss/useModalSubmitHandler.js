import { useToast } from "@/context/ToastContext";
import { useState } from "react";

export default function useModalSubmitHandler(mutation, reset , setIsOpen) {

    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useToast()

    const handlerFunction = async (mutateEntry) => {

        if (isLoading) {
            return;
        }

        try {
            setIsLoading(true)
            const res = await mutation.mutateAsync(mutateEntry)
            if (res.isOk) {
                showToast(res.result)
                reset()
                setIsOpen(false)
            } else {
                showToast(res.result, "error")
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }

    }

    return { handlerFunction, isLoading }

}
