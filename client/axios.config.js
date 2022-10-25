import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tweep1.herokuapp.com'
});

export default instance;   