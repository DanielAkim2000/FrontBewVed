import axios from "axios";

const api =  axios.create({
    baseURL:'https://bewved-4efa698bf3e0.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api