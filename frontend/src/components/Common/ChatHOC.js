import React from 'react'
import Chat from './Chat'
import { useLocation } from 'react-router-dom'

const ChatHOC = ({ role, username }) => {
    const location = useLocation()
    const chatId = location.state?location.state.chatId:undefined
    

    return (
        <Chat role={role} currentUser = {username} chatId={chatId} />
    )
}

export default ChatHOC