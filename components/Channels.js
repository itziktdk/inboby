// Channels Component - YouTube/TikTok Style Discovery
function Channels() {
    const [channels] = useState([
        {
            id: 1,
            name: 'Gaming Central',
            icon: '🎮',
            subscribers: '12.5K',
            videos: 245,
            category: 'גיימינג',
            description: 'הערוץ הכי חם לגיימינג בישראל!',
            isLive: true
        },
        {
            id: 2,
            name: 'Tech World',
            icon: '💻',
            subscribers: '8.3K',
            videos: 156,
            category: 'טכנולוגיה',
            description: 'כל מה שצריך לדעת על טכנולוגיה',
            isLive: false
        },
        {
            id: 3,
            name: 'Comedy Gold',
            icon: '😂',
            subscribers: '15.2K',
            videos: 89,
            category: 'מצחיק',
            description: 'הסרטונים הכי מצחיקים ברשת',
            isLive: false
        },
        {
            id: 4,
            name: 'Music Vibes',
            icon: '🎵',
            subscribers: '6.7K',
            videos: 134,
            category: 'מוזיקה',
            description: 'המוזיקה הכי טובה כאן',
            isLive: true
        },
        {
            id: 5,
            name: 'Art Studio',
            icon: '🎨',
            subscribers: '4.1K',
            videos: 78,
            category: 'אומנות',
            description: 'יצירות אומנות מרהיבות',
            isLive: false
        },
        {
            id: 6,
            name: 'Code Academy',
            icon: '💡',
            subscribers: '9.8K',
            videos: 203,
            category: 'לימוד',
            description: 'למד לתכנת כמו פרו',
            isLive: false
        },
        {
            id: 7,
            name: 'Sports Zone',
            icon: '⚽',
            subscribers: '11.3K',
            videos: 167,
            category: 'ספורט',
            description: 'הספורט הכי מרגש כאן',
            isLive: true
        },
        {
            id: 8,
            name: 'Food Master',
            icon: '🍳',
            subscribers: '5.9K',
            videos: 95,
            category: 'בישול',
            description: 'מתכונים מדהימים בקלות',
            isLive: false
        }
    ]);

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channelVideos] = useState({
        1: [
            { title: 'פורטנייט - ויקטורי רויאל מדהים!', views: '2.3K', time: '5 דק', thumbnail: '🎮' },
            { title: 'מיינקראפט - בניתי עיר ענקית!', views: '1.8K', time: '12 דק', thumbnail: '⛏️' },
            { title: 'FIFA 24 - הגול הכי יפה השנה!', views: '4.1K', time: '3 דק', thumbnail: '⚽' },
        ],
        2: [
            { title: 'ביקורת iPhone 15 Pro Max', views: '3.2K', time: '8 דק', thumbnail: '📱' },
            { title: 'איך לבנות PC גיימינג בזול', views: '2.7K', time: '15 דק', thumbnail: '💻' },
            { title: 'הגאדג\'טים הכי מגניבים 2024', views: '1.9K', time: '10 דק', thumbnail: '⚡' },
        ]
    });

    const openChannel = (channel) => {
        setSelectedChannel(channel);
    };

    if (selectedChannel) {
        const videos = channelVideos[selectedChannel.id] || [];
        
        return (
            <div className="channels-container">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '30px'
                }}>
                    <button 
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff6b6b',
                            fontSize: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedChannel(null)}
                    >
                        ← חזור
                    </button>
                    <h2 style={{color: 'white', margin: 0}}>{selectedChannel.name}</h2>
                    <div style={{width: '40px'}}></div>
                </div>

                {/* Channel Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    padding: '30px',
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {selectedChannel.isLive && (
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: '#ff4757',
                            color: 'white',
                            padding: '5px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            animation: 'pulse 2s infinite'
                        }}>
                            🔴 LIVE
                        </div>
                    )}
                    
                    <div style={{
                        fontSize: '60px',
                        marginBottom: '15px'
                    }}>
                        {selectedChannel.icon}
                    </div>
                    
                    <h2 style={{marginBottom: '10px'}}>{selectedChannel.name}</h2>
                    <p style={{opacity: 0.9, marginBottom: '20px'}}>{selectedChannel.description}</p>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '30px',
                        marginBottom: '20px'
                    }}>
                        <div>
                            <div style={{fontSize: '20px', fontWeight: 'bold'}}>{selectedChannel.subscribers}</div>
                            <div style={{fontSize: '14px', opacity: 0.7}}>עוקבים</div>
                        </div>
                        <div>
                            <div style={{fontSize: '20px', fontWeight: 'bold'}}>{selectedChannel.videos}</div>
                            <div style={{fontSize: '14px', opacity: 0.7}}>סרטונים</div>
                        </div>
                    </div>
                    
                    <button style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        padding: '12px 30px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                    }}>
                        📺 עקוב
                    </button>
                </div>

                {/* Channel Videos */}
                <h3 style={{color: 'white', marginBottom: '20px'}}>סרטונים אחרונים</h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    {videos.map((video, index) => (
                        <div key={index} style={{
                            background: '#111',
                            borderRadius: '15px',
                            padding: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: '1px solid #222'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#222'}
                        onMouseOut={(e) => e.target.style.background = '#111'}>
                            <div style={{
                                width: '80px',
                                height: '60px',
                                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '25px',
                                flexShrink: 0
                            }}>
                                {video.thumbnail}
                            </div>
                            <div style={{flex: 1}}>
                                <div style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    marginBottom: '5px',
                                    lineHeight: '1.4'
                                }}>
                                    {video.title}
                                </div>
                                <div style={{
                                    color: '#888',
                                    fontSize: '14px',
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    <span>{video.views} צפיות</span>
                                    <span>•</span>
                                    <span>{video.time}</span>
                                </div>
                            </div>
                            <div style={{
                                color: '#ff6b6b',
                                fontSize: '18px'
                            }}>
                                ▶️
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="channels-container">
            <div className="channels-header">
                📺 ערוצים מומלצים
            </div>
            <div className="channel-grid">
                {channels.map(channel => (
                    <div 
                        key={channel.id} 
                        className="channel-card"
                        onClick={() => openChannel(channel)}
                        style={{position: 'relative'}}
                    >
                        {channel.isLive && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: '#ff4757',
                                color: 'white',
                                padding: '3px 8px',
                                borderRadius: '10px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                zIndex: 10
                            }}>
                                🔴 LIVE
                            </div>
                        )}
                        
                        <div className="channel-icon">{channel.icon}</div>
                        <div className="channel-name">{channel.name}</div>
                        <div className="channel-count">{channel.subscribers} עוקבים</div>
                        <div style={{
                            color: '#666',
                            fontSize: '11px',
                            marginTop: '5px'
                        }}>
                            {channel.videos} סרטונים
                        </div>
                        <div style={{
                            background: 'rgba(255, 107, 107, 0.1)',
                            color: '#ff6b6b',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            marginTop: '8px',
                            display: 'inline-block'
                        }}>
                            {channel.category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add pulse animation for live indicator
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(pulseStyle);