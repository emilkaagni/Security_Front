import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getAllChats } from '../../apis/Api';
import './ChatPage.css';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:5500');

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const res = await getAllChats();
            if (res.data.success) {
                setChats(res.data.chats);
            } else {
                console.error('Error fetching chats:', res.data.message);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    useEffect(() => {
        if (selectedChat) {
            socket.emit('joinRoom', { chatId: selectedChat._id });

            socket.on('message', (newMessage) => {
                setSelectedChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, newMessage]
                }));
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [selectedChat, socket]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!selectedChat || !message) return;

        const userId = localStorage.getItem('userId');
        const newMessage = { sender: userId, content: message };

        socket.emit('sendMessage', { chatId: selectedChat._id, message: newMessage });

        setSelectedChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, newMessage]
        }));
        setMessage('');
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
                                <span className="chatpage-name">{chat.users.map(user => user.name).join(', ')}</span>
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
                            <span>Chat with {selectedChat.users.map(user => user.name).join(', ')}</span>
                        </div>
                        <div className="chatpage-messages">
                            {selectedChat.messages.map((msg, index) => (
                                <div key={index} className={`chatpage-message ${msg.sender === localStorage.getItem('userId') ? 'chatpage-sent' : 'chatpage-received'}`}>
                                    {msg.sender !== localStorage.getItem('userId') && <img src="path_to_avatar" alt="avatar" className="chatpage-avatar" />}
                                    <div className="chatpage-message-content">
                                        <span>{msg.content}</span>
                                        <span className="chatpage-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    {msg.sender === localStorage.getItem('userId') && <img src="path_to_avatar" alt="avatar" className="chatpage-avatar" />}
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

export default ChatPage;

