import superagentPromise from 'superagent-promise';
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT =  'https://conduit.productionready.io/api';

const ResponseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token${token}`)
    }
};

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(ResponseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(ResponseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(ResponseBody),
    post: async (url, body) =>
       await superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(ResponseBody),
};

const Auth = {
    login: ( email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password} }),
};

const Tags = {
    getAll: () => requests.get('/tags')
};

const agent = {
    Tags, 
    Auth,
    setToken: _token => { token = _token }
};
export default agent;