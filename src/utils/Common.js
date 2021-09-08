import Cookies from 'js-cookie'
import axios from 'axios';

// return the user data from the session storage

//https://github.com/js-cookie/js-cookie/

export const getUser = () => {
  const user = Cookies.get("user");
  if(user){
    return user;
  }else{
    return null;
  }
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

//return true if cookie is valid
export const getCookie = () => {
  const user = Cookies.get("user");
  const status = Cookies.get("logged_in")
  if (status && user) {
    if (status === "true") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  //sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// remove the user cookie
export const removeUserCookie = () => {
  const user = getUser();
  //add api call to logout
  axios.post('http://localhost:8080/api/login/logout', 
    { username: user },
    {headers: {'Content-Type': 'application/json', crossdomain: true}}
    ).then(response => {

      if (response.status === 200) {
        Cookies.remove("user");
        Cookies.remove("logged_in");
        alert('Logged out');
      }else{
        alert('Error loggin out');
      }

    })



}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  //sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}