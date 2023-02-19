import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import Cookies from 'js-cookie'

function Chat(){

  // const [username, setUsername] = useState(null)

	// function createDirectChat(creds) {
	// 	getOrCreateChat(
	// 		creds,
	// 		{ is_direct_chat: true, usernames: [username] },
	// 		() => setUsername('')
	// 	)
	// }

	// function renderChatForm(creds) {
	// 	return (
	// 		<div>
	// 			<input 
	// 				placeholder='Username' 
	// 				value={username} 
	// 				onChange={(e) => setUsername(e.target.value)} 
	// 			/>
	// 			<button onClick={() => createDirectChat(creds)}>
	// 				Create
	// 			</button>
	// 		</div>
	// 	)
	// }


  if(Cookies.get('rol') === 'propietario'){
    //setUsername(Cookies.get('user'))
    return (
      <div>
        <ChatEngine
          height='90vh'
          userName={Cookies.get('user')}
          userSecret={Cookies.get('user')}
          //projectID='a06c1e27-cbea-40fb-b46e-57c7b4847949'
          projectID='4d2e52bd-b601-4bd3-a87e-4ffd0439b876'
        />
      </div>

    );
  }

  if(Cookies.get('rol') === 'guardia'){
    return (
      <div>
        <ChatEngine
          height='90vh'
          userName='guardia'
          userSecret='guardia2021'
          //projectID='a06c1e27-cbea-40fb-b46e-57c7b4847949'
          projectID='4d2e52bd-b601-4bd3-a87e-4ffd0439b876'
        />
      </div>

    );
  }

  if(Cookies.get('rol') === 'administracion'){
    return (
      <div>
        <ChatEngine
          height='90vh'
          userName='administracion@sgav.com'
          userSecret='administracion@sgav.com'
          //projectID='a06c1e27-cbea-40fb-b46e-57c7b4847949'
          projectID='4d2e52bd-b601-4bd3-a87e-4ffd0439b876'
        />
      </div>

    );
  }
    

  }

export default Chat;