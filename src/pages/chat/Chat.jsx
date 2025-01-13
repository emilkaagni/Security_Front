import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllChats, getMessages, sendMessage } from '../../apis/Api';
import './ChatPage.css';

const Chat = () => {
    const { id } = useParams();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat._id);
        }
    }, [selectedChat]);

    const fetchChats = async () => {
        const res = await getAllChats();
        if (res.data.success) {
            setChats(res.data.chats);
        }
    };

    const fetchMessages = async (chatId) => {
        const res = await getMessages(chatId);
        if (res.data.success) {
            setMessages(res.data.messages);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;

        const newMessage = {
            message,
        };

        const res = await sendMessage(selectedChat._id, newMessage);
        if (res.data.success) {
            setMessages([...messages, res.data.message]);
            setMessage('');
        }
    };

    return (
        <div className="chatpage-chat-container">
            <div className="chatpage-sidebar">
                <div className="chatpage-new-conversation">+ New conversation</div>
                <div className="chatpage-contacts">
                    {chats.map(chat => (
                        <div key={chat._id} className="chatpage-contact-item" onClick={() => setSelectedChat(chat)}>
                            <img src="path_to_avatar" alt="avatar" className="chatpage-avatar" />
                            <div className="chatpage-contact-info">
                                <span className="chatpage-name">{chat.users.map(user => user.fname).join(', ')}</span>
                                <span className="chatpage-last-message">Last message</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatpage-chat-window">
                {selectedChat ? (
                    <>
                        <div className="chatpage-chat-header">
                            <span>Chat with {selectedChat.users.map(user => user.fname).join(', ')}</span>
                        </div>
                        <div className="chatpage-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chatpage-message ${msg.sender._id === localStorage.getItem('userId') ? 'chatpage-sent' : 'chatpage-received'}`}>
                                    {msg.sender._id !== localStorage.getItem('userId') && <img src="path_to_avatar" alt="avatar" className="chatpage-avatar" />}
                                    <div className="chatpage-message-content">
                                        <span>{msg.content}</span>
                                        <span className="chatpage-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                                    </div>
                                    {msg.sender._id === localStorage.getItem('userId') && <img src="path_to_avatar" alt="avatar" className="chatpage-avatar" />}
                                </div>
                            ))}
                        </div>
                        <form className="chatpage-message-input" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Send a message..."
                            />
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </>
                ) : (
                    <p>Select a chat to start messaging</p>
                )}
            </div>
        </div>
    );
};

export default Chat;