const { default: api } = require("../mainInstance/main")

const getTodos = async (page = 1, filter = null) => {
    try {
        const res = await api.get('/todos', {
            params: { page, filter }
        })
        return res.data
    } catch (err) {
        return 'something went wrong'
    }
}


export default getTodos