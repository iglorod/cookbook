import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tranquil-reef-23276.herokuapp.com/'
});

export default instance;
