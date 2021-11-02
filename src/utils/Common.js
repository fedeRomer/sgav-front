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

export const getUserType = () => {
  return Cookies.get("rol")
}


export const checkAccess = (path) =>{

  var checkAccessObj = new Object();
  checkAccessObj.typeOfUser = Cookies.get("rol");
  checkAccessObj.moduleToAccess = path;


  fetch("http://localhost:8080/api/usuario/checkaccess",{
      method:"POST",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify(checkAccessObj)
  }).then(response => {

      if(response.ok){
          return true;

      }else{
          var respuesta = response.json()
          alert(respuesta.response);
          return false;
      }
  }).catch((error) =>{
      alert('Error no controlado')
      console.log(error);
      return false;
  })
}


//return true if cookie is valid
export const getCookie = (props) => {

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