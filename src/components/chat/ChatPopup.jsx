// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { getAllChats, getMessages, sendMessage } from '../../apis/Api';
// import './ChatPopup.css';

// const ChatPopup = ({ product, onClose }) => {
//     const [message, setMessage] = useState('');
//     const [chat, setChat] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const socket = io('http://localhost:5500');

//     useEffect(() => {
//         fetchChats();
//     }, []);

//     const fetchChats = async () => {
//         try {
//             const userId1 = localStorage.getItem('userId');
//             const userId2 = product.createdBy;
//             const res = await getAllChats();
//             if (res.data.success) {
//                 const fetchedChat = res.data.chats.find(chat =>
//                     chat.users.some0(user => user._id === userId1) &&
//                     chat.users.some(user => user._id === userId2)
//                 );
//                 if (fetchedChat && fetchedChat._id) {
//                     setChat(fetchedChat);
//                     fetchMessages(fetchedChat._id);
//                     socket.emit('joinRoom', { chatId: fetchedChat._id });
//                 } else {
//                     console.error('Chat object or _id is missing:', fetchedChat);
//                 }
//             } else {
//                 console.error('Error fetching chats:', res.data.message);
//             }
//         } catch (error) {
//             console.error('Error fetching chats:', error);
//         }
//     };

//     const fetchMessages = async (chatId) => {
//         const res = await getMessages(chatId);
//         if (res.data.success) {
//             setMessages(res.data.messages);
//         }
//     };

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!message || !chat) return;

//         const userId = localStorage.getItem('userId');
//         const newMessage = { sender: userId, content: message };

//         const res = await sendMessage(chat._id, { message: newMessage });
//         if (res.data.success) {
//             setMessages([...messages, res.data.message]);
//             setMessage('');
//         }
//     };

//     return (
//         <div className="chatpopup-container">
//             <div className="chatpopup-header">
//                 <h3>Chat with Specialist</h3>
//                 <button onClick={onClose} className="chatpopup-btn-close">X</button>
//             </div>
//             <div className="chatpopup-messages">
//                 {messages.length > 0 ? (
//                     messages.map((msg, index) => (
//                         <div key={index} className={`chatpopup-message ${msg.sender === localStorage.getItem('userId') ? 'chatpopup-sent' : 'chatpopup-received'}`}>
//                             <div className="chatpopup-message-content">
//                                 <p>{msg.content}</p>
//                                 <div className="chatpopup-time">{new Date(msg.createdAt).toLocaleTimeString()}</div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No messages yet.</p>
//                 )}
//             </div>
//             <form className="chatpopup-form" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button type="submit" className="btn btn-primary">Send</button>
//             </form>
//         </div>
//     );
// };

// export default ChatPopup;





import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getMessages, sendMessage } from '../../apis/Api';
import './ChatPopup.css';

const ChatPopup = ({ product, chatId, onClose }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:5500');

    useEffect(() => {
        if (chatId) {
            fetchMessages(chatId);
            socket.emit('joinRoom', chatId);

            socket.on('message', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [chatId, socket]);

    const fetchMessages = async (chatId) => {
        const res = await getMessages(chatId);
        if (res.data.success) {
            setMessages(res.data.messages);
        } else {
            console.error('Error fetching messages:', res.data.message);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message || !chatId) return;

        const newMessage = { message };

        const res = await sendMessage(chatId, newMessage);
        if (res.data.success) {
            setMessages([...messages, res.data.message]);
            setMessage('');
        } else {
            console.error('Error sending message:', res.data.message);
        }
    };

    return (
        <div className="chatpopup-container">
            <div className="chatpopup-header">
                <h3>Chat with {product.createdBy.fname}</h3>
                <button onClick={onClose} className="chatpopup-btn-close">X</button>
            </div>
            <div className="chatpopup-messages">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`chatpopup-message ${msg.sender === localStorage.getItem('userId') ? 'chatpopup-sent' : 'chatpopup-received'}`}>
                            <div className="chatpopup-message-content">
                                <span>{msg.content}</span>
                                <span className="chatpopup-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No messages yet.</p>
                )}
            </div>
            <form className="chatpopup-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    );
};

export default ChatPopup;




// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { getMessages, sendMessage } from '../../apis/Api';
// import './ChatPopup.css';

// const ChatPopup = ({ product, chatId, onClose }) => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const socket = io('http://localhost:5500');

//     useEffect(() => {
//         if (chatId) {
//             fetchMessages(chatId);
//             socket.emit('join_chat', chatId);
//         }

//         socket.on('receive_message', (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [chatId]);

//     const fetchMessages = async (chatId) => {
//         try {
//             const res = await getMessages(chatId);
//             if (res.data.success) {
//                 setMessages(res.data.messages);
//             }
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!message) return;

//         const newMessage = {
//             sender: localStorage.getItem('userId'),
//             receiver: product.createdBy._id,
//             content: message,
//         };

//         try {
//             const res = await sendMessage(chatId, newMessage);
//             if (res.data.success) {
//                 setMessages([...messages, res.data.message]);
//                 setMessage('');
//                 socket.emit('send_message', res.data.message);
//             } else {
//                 console.error('Error sending message:', res.data.message);
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
//         <div className="chatpopup-container">
//             <div className="chatpopup-header">
//                 <h3>Chat with {product.createdBy.fname} {product.createdBy.lname}</h3>
//                 <button onClick={onClose} className="chatpopup-btn-close">X</button>
//             </div>
//             <div className="chatpopup-messages">
//                 {messages.length > 0 ? (
//                     messages.map((msg, index) => (
//                         <div key={index} className={`chatpopup-message ${msg.sender === localStorage.getItem('userId') ? 'self' : 'other'}`}>
//                             <div className="chatpopup-avatar"></div>
//                             <div className="chatpopup-message-content">
//                                 <p>{msg.content}</p>
//                                 <div className="chatpopup-time">{new Date(msg.createdAt).toLocaleTimeString()}</div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No messages yet.</p>
//                 )}
//             </div>
//             <form className="chatpopup-form" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button type="submit" className="btn btn-primary">Send</button>
//             </form>
//         </div>
//     );
// };

// export default ChatPopup;