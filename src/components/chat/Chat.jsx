import React from 'react';
import axios from 'axios';
import { ChatEngine } from 'react-chat-engine';
import Cookies from 'js-cookie'
import { checkAccess} from '../../utils/Common'

function Chat(){


  if(Cookies.get('rol') === 'propietario'){
    return (
      <div>
        <ChatEngine
          height='90vh'
          userName='guardia'
          userSecret='guardia2021'
          projectID='a06c1e27-cbea-40fb-b46e-57c7b4847949'
        />
      </div>

    );
  }
    

  }

export default Chat;