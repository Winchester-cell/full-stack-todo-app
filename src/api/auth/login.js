import axios from "axios"

const loginUser = async (user) => {
  try {
    const res = await axios.post('/api/auth/login', user)

    if (res.status === 201) {
      return { result: 'Welcome', isOk: true }
    }

    return 'Something went wrong, try later'
  } catch (err) {
    if (err.response && err.response.status === 422) {
      return { result: `"Email" or "Password" is incorrect`, isOk: false }
    }

    return { result: 'Something went wrong, try later', isOk: false }
  }
}

export default loginUser
