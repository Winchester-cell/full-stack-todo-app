import api from "../mainInstance/main"

const postTodo = async (todo) => {

    try {

        const res = await api.post('/todos', todo)

        if (res.status === 201) {
            return { isOk: true, result: 'Todo created successfully' }
        }

        return { isOk: false, result: 'Something went wrong' }

    } catch (err) {
        return { isOk: false, result: 'Something went wrong' }
    }

}

export default postTodo