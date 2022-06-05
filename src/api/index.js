import axios from 'axios'

const axiosInstance=axios.create({
    baseURL: 'http://93.95.97.34/api'
    }
);

export default axiosInstance;