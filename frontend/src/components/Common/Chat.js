import React from 'react';
import SidePanel from './SidePanel';
import './Chat.css'
import WebSocketInstance from './WebSocket';
import { HiChevronDoubleRight } from "react-icons/hi2"
import { fetchAPI } from '../../functions';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatId: this.props.chatId,
            messages: []
        }
        this.waitForSocketConnection(() => {
          WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
          WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    componentDidMount() {
        WebSocketInstance.connect(`ws://127.0.0.1:8000/ws/chat/${this.state.chatId}/`)

        const getChats = async () => {
            const fetchChats = await fetchAPI('chats')
            this.state.chats = fetchChats
          }
        
        getChats()
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made")
                callback();
                return;
            } else {
                console.log("wait for connection...")
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message]});
    }

    setMessages(messages) {
        this.setState({ messages: messages.reverse()});
    }

    messageChangeHandler = (event) =>  {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: this.props.currentUser,
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        });
    }

    renderMessages = (messages) => {
        return messages.map((message, i) => (
            <li 
                key={message.id} 
                className={message.author === this.props.currentUser ? 'sent' : 'replies'}>
                
                <p>
                    <small className='msg-content-author'>{message.author}</small>
                    <br />
                    {message.content}
                    <br />
                    <small className={message.author === this.props.currentUser ? 'sent' : 'replies'}>
                    {Math.round((new Date().getTime() - new Date(message.timestamp).getTime())/60000)} minutes ago
                    </small>
                </p>
            </li>
        ));
    }

    switchChat = (id) => {
        WebSocketInstance.connect(`ws://127.0.0.1:8000/ws/chat/${id}/`);
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser);
          });
        this.setState({
            chatId: id
        })
    }

    render() {
        const messages = this.state.messages;
        
        return (
            <div id="frame">
                {this.state.chats&&<SidePanel chats={this.state.chats} role = {this.props.role} switchChat={this.switchChat} currentChatId={this.state.chatId} />}
                <div className="content">
                    <div className="contact-profile">
                        <p>{this.state.chats&&(this.props.role==='Parent'?this.state.chats[this.state.chats.findIndex((obj) => obj.id === this.state.chatId)].tutor.username:this.state.chats[this.state.chats.findIndex((obj) => obj.id === this.state.chatId)].parent.username)}</p>
                    </div>
                    <div className="messages">
                        <ul id="chat-log">
                        { 
                            messages && 
                            this.renderMessages(messages) 
                        }
                        </ul>
                    </div>
                    <div className="message-input">
                        <form onSubmit={this.sendMessageHandler}>
                            <div className="wrap">
                                <input 
                                    onChange={this.messageChangeHandler}
                                    value={this.state.message}
                                    required 
                                    id="chat-message-input" 
                                    type="text" 
                                    placeholder="Write your message..." 
                                    autoComplete="off"
                                    />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button id="chat-message-submit" className="submit">
                                    <HiChevronDoubleRight size={'30px'} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default Chat
