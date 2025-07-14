import axios from "axios";


const getUser = async () => {
    try {
        const res = await axios.get("/api/auth/getme");
        if (res.status === 200) {
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