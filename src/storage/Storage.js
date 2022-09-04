// return user from the localStorage
export const getUser = () => {
    return localStorage.getItem('user') || null;
}

// return user from the localStorage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// set token and user in localStorage
export const setUserLocal = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
}

//remove token and user from localStorage
export const removeUserLocal = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}