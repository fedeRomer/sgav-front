import React from 'react';
import { removeUserCookie } from '../../../utils/Common';
import Cookies from 'js-cookie';
 
function Dashboard(props) {
  
  const handleLogout = () => {
    removeUserCookie();
    props.history.push('/login');
  }

  const user = Cookies.get("user");

  return (
    <div>
      Bienvenido {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;