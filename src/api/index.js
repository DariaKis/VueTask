import axios from 'axios'

const axiosInstance=axios.create({
    baseURL: 'http://93.95.97.34/api'
    }
);
// export const api = {
//     users: {
//         all() {
//             return axiosInstance.get('users/all')
//         },
//         pagination(page, limit) {
//             return axiosInstance.post('/users', {
//                 filter: {},
//                 page: page,
//                 limit: limit
//             })
//         },
//         login(login, password) {
//             return axiosInstance.post('users/login', {
//                 login: login,
//                 password: password
//             })
//         },
//         id(id) {
//             return axiosInstance.get(`users/${id}`)
//         },
//         edit(id, login, username, about, url, password) {
//             return axiosInstance.put('users/edit', {
//                 id: id,
//                 login: login,
//                 username: username,
//                 about: about,
//                 photoUrl: url,
//                 password: password,
//             })
//         },
//         userTasks(id, page, limit) {
//             return axiosInstance.post('/tasks', {
//                 filter: {
//                     assignedUsers: [
//                         id
//                     ]
//                 },
//                 page: page,
//                 limit: limit
//             })
//         }
//     },
// }
export default axiosInstance;