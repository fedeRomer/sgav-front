import React, { useState } from "react";
import { ChatEngine } from 'react-chat-engine';
import { styles } from './styles'

const Avatar = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div style={props.style}>
            <div 
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                Chat
            </div>

            <div 
            
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid white' : '4px solid white' }
                }}
            />
        </div>
    )
}

export default Avatar;