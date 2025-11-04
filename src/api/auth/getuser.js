import api from "../mainInstance/main";


const getUser = async () => {
    try {
        const res = await api.get("/auth/getme");
        if (res.status === 200) {
            console.log(res.data);     
            return res.data
        }

    } catch (err) {
        if (err.response?.status === 401) {
            console.log("Not logged in ❌");
            return false
        } else {
            console.log("Something went wrong:", err);
            return false
        }
    }

}

export default getUser