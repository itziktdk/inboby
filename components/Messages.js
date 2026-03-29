// Messages Component - WhatsApp/Telegram Style
function Messages() {
    const [chats] = useState([
        {
            id: 1,
            name: 'Gaming Squad',
            avatar: '🎮',
            lastMessage: 'בואו נשחק פורטנייט הערב!',
            time: '18:30',
            unread: 3,
            online: true
        },
        {
            id: 2,
            name: 'Tech Lovers',
            avatar: '💻',
            lastMessage: 'ראיתם את הגרפיקה החדשה של RTX 4090?',
            time: '17:45',
            unread: 0,
            online: true
        },
        {
            id: 3,
            name: 'Funny Memes',
            avatar: '😂',
            lastMessage: 'המים הזה הורג! 💀',
            time: '16:22',
            unread: 7,
            online: false
        },
        {
            id: 4,
            name: 'Music Discovery',
            avatar: '🎵',
            lastMessage: 'השיר החדש של הזמר פשוט מדהים!',
            time: '15:10',
            unread: 0,
            online: true
        },
        {
            id: 5,
            name: 'Art & Design',
            avatar: '🎨',
            lastMessage: 'העיצוב שלך ממש מעורר השראה!',
            time: '14:33',
            unread: 1,
            online: false
        },
        {
            id: 6,
            name: 'Coding Buddies',
            avatar: '💡',
            lastMessage: 'אפשר עזרה עם הבאג הזה?',
            time: '13:55',
            unread: 0,
            online: true
        }
    ]);

    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState({
        1: [
            { id: 1, sender: 'ProGamer', text: 'בואו נשחק פורטנייט הערב!', time: '18:30', isMine: false },
            { id: 2, sender: 'me', text: 'בטח! איזה שעה?', time: '18:31', isMine: true },
            { id: 3, sender: 'GameMaster', text: '19:00 מתאים?', time: '18:32', isMine: false }
        ],
        2: [
            { id: 1, sender: 'TechGuru', text: 'ראיתם את הגרפיקה החדשה של RTX 4090?', time: '17:45', isMine: false },
            { id: 2, sender: 'me', text: 'וואו! זה נראה מדהים! 🤯', time: '17:46', isMine: true }
        ]
    });

    const openChat = (chat) => {
        setSelectedChat(chat);
    };

    const sendMessage = () => {
        if (newMessage.trim() && selectedChat) {
            const newMsg = {
                id: Date.now(),
                sender: 'me',
                text: newMessage,
                time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
                isMine: true
            };
            
            setMessages(prev => ({
                ...prev,
                [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
            }));
            
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    if (selectedChat) {
        const chatMessages = messages[selectedChat.id] || [];
        
        return (
            <div className="messages-container">
                <div className="messages-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <button 
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff6b6b',
                            fontSize: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedChat(null)}
                    >
                        ← חזור
                    </button>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span>{selectedChat.name}</span>
                        <span style={{fontSize: '24px'}}>{selectedChat.avatar}</span>
                    </div>
                    <div style={{width: '40px'}}></div>
                </div>
                
                <div className="chat-messages" style={{
                    flex: 1,
                    padding: '20px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    {chatMessages.map(msg => (
                        <div key={msg.id} style={{
                            alignSelf: msg.isMine ? 'flex-start' : 'flex-end',
                            background: msg.isMine ? '#ff6b6b' : '#333',
                            color: 'white',
                            padding: '12px 16px',
                            borderRadius: msg.isMine ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                            maxWidth: '70%',
                            wordWrap: 'break-word'
                        }}>
                            {!msg.isMine && (
                                <div style={{
                                    fontSize: '12px',
                                    opacity: 0.7,
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                    {msg.sender}
                                </div>
                            )}
                            <div>{msg.text}</div>
                            <div style={{
                                fontSize: '11px',
                                opacity: 0.6,
                                marginTop: '5px',
                                textAlign: msg.isMine ? 'left' : 'right'
                            }}>
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div style={{
                    padding: '20px',
                    background: '#111',
                    borderTop: '1px solid #333',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="כתוב הודעה..."
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '25px',
                            background: '#222',
                            color: 'white',
                            outline: 'none',
                            fontSize: '16px'
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        style={{
                            background: '#ff6b6b',
                            border: 'none',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            color: 'white',
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="messages-container">
            <div className="messages-header">
                💬 הודעות פרטיות
            </div>
            <div className="chat-list">
                {chats.map(chat => (
                    <div 
                        key={chat.id} 
                        className="chat-item"
                        onClick={() => openChat(chat)}
                    >
                        <div className="chat-avatar">
                            {chat.avatar}
                        </div>
                        <div className="chat-info">
                            <div className="chat-name" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                {chat.name}
                                {chat.online && (
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#4ecdc4',
                                        display: 'inline-block'
                                    }}></div>
                                )}
                            </div>
                            <div className="chat-preview">{chat.lastMessage}</div>
                        </div>
                        <div className="chat-meta">
                            <div>{chat.time}</div>
                            {chat.unread > 0 && (
                                <div style={{
                                    background: '#ff6b6b',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    marginTop: '5px',
                                    marginRight: 'auto'
                                }}>
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}