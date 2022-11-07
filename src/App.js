import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router';

// styles
import './App.css';

// componenets
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AuthorProfile from './pages/AuthorProfile/AuthorProfile';
import { appLoaded } from './store/reducers/commonReducer';
import { SelectUser, SelectToken } from './store/reducers/authReducer';
import agent from './store/agent';
import { SelectRedirectTo } from './store/reducers/authReducer';
import { getToken, getUser } from './storage/Storage';
import Article from './pages/Article/Article';

function App({children}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectUser = useSelector(SelectUser)
  const selectToken = useSelector(SelectToken)
  const selectRedirect = useSelector(SelectRedirectTo);

  // for appLoaded log and add token and user in commonReducer
  useEffect(() =>  {
    const token = getToken();
    const user = getUser();
    if (token) {
      agent.setToken(token)
    } else {
      agent.setToken(null)
    }
    dispatch(appLoaded({ token: selectToken? selectToken : token, user: selectUser? selectUser : user }))
  }, [dispatch, selectUser, selectToken])

  // for navigating when login or register
  useEffect(() => {
    if (selectRedirect){
      navigate(selectRedirect)
    } 
  },[selectRedirect, navigate])

  return (
    <div className="App">
      <Header >
        {children}
      </Header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/@:username" element={<AuthorProfile />}/>
        <Route path="/article/:id" element={<Article />}/>
      </Routes>
    </div>
  );
}

export default App;