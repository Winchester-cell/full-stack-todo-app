const { default: api } = require("../mainInstance/main")

const getTodos = async () => {
    try {
        const res = await api.get('/todos')
        return res.data
    } catch (err) {
        return 'something went wrong'
    }
}


export default getTodos