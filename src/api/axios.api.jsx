import axios from "axios";

const api =  axios.create({
    baseURL:'https://bewved-2ed900875474.herokuapp.com/'
})

export default api