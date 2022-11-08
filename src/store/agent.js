import superagentPromise from 'superagent-promise';
import _superagent from "superagent";
import { getToken } from '../storage/Storage';

const superagent = superagentPromise(_superagent, global.Promise);
const encode = encodeURIComponent
const API_ROOT =  'https://conduit.productionready.io/api';

const ResponseBody = res => res.body;

let token = getToken();
// console.log(token)
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
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

const limit = (count, p) => `limit=${count}&offset=${p ? (p-1) * count : 0}`
const Articles = {
  all: page => 
    requests.get(`/articles?${limit(10, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  byAuthor: (username, page) => 
    // console.log(username, page),
    requests.get(`/articles?author=${username}&${limit(5, page)}`),
  get: slug =>
    requests.get(`/articles/${slug}`),
  byTag: (tag, page) => 
  // console.log(tag, page)
    requests.get(`/articles?tag=${tag}&${limit(5, page)}`),
  favoriteBy: (author, page) => 
    // console.log(author, page)
    requests.get(`/articles?favorited=${author}&${limit(5, page)}`)

}

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
  follow: username => 
    // console.log(username),
    requests.post(`/profiles/${username}/follow`),
  unfollow: username => 
    // console.log(username),
    requests.del(`/profiles/${username}/follow`),
}

const Comments = {
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`),
  create: (slug, body) =>
    requests.post(`/articles/${slug}/comments`, {comment: { body }}),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`)
  }
const agent = {
  Tags, 
  Auth,
  Articles,
  Profile,
  Comments,
  setToken: token1 => { token = token1}
};

export default agent;