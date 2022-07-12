import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

/*API.interceptors.request.use((req) => {
    
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`;
    }

    return req;
});*/

export const signIn = (formData) => API.post('users/signin', formData);

const urlForUsers = '/users';

export const createUser = (newUser) => API.post(urlForUsers, newUser);
export const deleteUser = (id) => API.delete(`${urlForUsers}/${id}`);
export const fetchUserById  = (id) => API.get(`${urlForUsers}/${id}`).catch((error) => console.log("Error: ", error));
export const fetchUsers  = () => API.get(urlForUsers).catch((error) => console.log("Error: ", error));
export const updateUser = (id, updateUser) => API.patch(`${urlForUsers}/${id}`, updateUser);
