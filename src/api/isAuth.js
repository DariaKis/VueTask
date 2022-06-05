export default function (axiosInstance) {
    return {
        signIn(payload){
            return axiosInstance.post('/users/login', payload)
        },

    }
}