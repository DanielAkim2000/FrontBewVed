import axios from "axios";

const api =  axios.create({
    baseURL:'https://backbewved-33702fab1b4a.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api