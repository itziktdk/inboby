// Video Feed Component - Enhanced TikTok Style with Smooth Animations
function VideoFeed() {
    const [videos] = useState([
        {
            id: 1,
            creator: 'Gaming_Pro',
            description: 'אתגר 24 שעות במיינקראפט! 🎮⛏️ #מיינקראפט #גיימינג',
            likes: 1205,
            comments: 89,
            shares: 34,
            views: '12.5K',
            category: 'גיימינג',
            duration: '0:45',
            verified: true
        },
        {
            id: 2,
            creator: 'TechMaster',
            description: 'איך לבנות מחשב גיימינג בזול! 💻🔥 #טכנולוגיה #PC',
            likes: 890,
            comments: 67,
            shares: 23,
            views: '8.9K',
            category: 'טכנולוגיה',
            duration: '2:13',
            verified: false
        },
        {
            id: 3,
            creator: 'FunnyMoments',
            description: 'הרגעים הכי מצחיקים השבוע 😂💀 #מצחיק #וויראלי',
            likes: 2340,
            comments: 156,
            shares: 78,
            views: '25.1K',
            category: 'מצחיק',
            duration: '1:23',
            verified: true
        },
        {
            id: 4,
            creator: 'MusicVibes',
            description: 'השיר החדש שכולם חייבים לשמוע! 🎵🎧 #מוזיקה',
            likes: 1567,
            comments: 234,
            shares: 89,
            views: '19.3K',
            category: 'מוזיקה',
            duration: '3:45',
            verified: true
        },
        {
            id: 5,
            creator: 'ArtCreator',
            description: 'ציור דיגיטלי בזמן אמת! 🎨✨ #אומנות #דיגיטל',
            likes: 945,
            comments: 45,
            shares: 19,
            views: '7.2K',
            category: 'אומנות',
            duration: '4:12',
            verified: false
        }
    ]);

    const [likedVideos, setLikedVideos] = useState(new Set());
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleLike = (videoId) => {
        const newLiked = new Set(likedVideos);
        if (newLiked.has(videoId)) {
            newLiked.delete(videoId);
        } else {
            newLiked.add(videoId);
            // Vibration feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        }
        setLikedVideos(newLiked);
    };

    const handleShare = (video) => {
        if (navigator.share) {
            navigator.share({
                title: `${video.creator} - InBoby`,
                text: video.description,
                url: `${window.location.href}#video=${video.id}`
            });
        } else {
            navigator.clipboard.writeText(`${video.description} - צפו ב-InBoby!`);
            alert('הקישור הועתק ללוח!');
        }
    };

    const formatViews = (views) => {
        if (typeof views === 'string') return views;
        if (views > 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views > 1000) return `${(views / 1000).toFixed(1)}K`;
        return views.toString();
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'גיימינג': '🎮',
            'טכנולוגיה': '💻',
            'מצחיק': '😂',
            'מוזיקה': '🎵',
            'אומנות': '🎨'
        };
        return icons[category] || '📱';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'גיימינג': '#9c88ff',
            'טכנולוגיה': '#3742fa',
            'מצחיק': '#ffa502',
            'מוזיקה': '#ff3838',
            'אומנות': '#2ed573'
        };
        return colors[category] || '#ff6b6b';
    };

    return (
        <div className="video-feed">
            {videos.map((video, index) => (
                <div 
                    key={video.id} 
                    className="video-container"
                    style={{
                        animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                    }}
                >
                    {/* Video Background */}
                    <div 
                        className="video-placeholder animated-float"
                        style={{
                            background: `linear-gradient(135deg, ${getCategoryColor(video.category)}, #667eea)`,
                            position: 'relative'
                        }}
                    >
                        {/* Video Duration */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {video.duration}
                        </div>

                        {/* Category Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: getCategoryColor(video.category),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            {getCategoryIcon(video.category)}
                            {video.category}
                        </div>

                        {/* Main Content */}
                        <div style={{
                            fontSize: '80px',
                            marginBottom: '20px',
                            animation: 'float 3s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                        }}>
                            {getCategoryIcon(video.category)}
                        </div>
                        
                        <h3 style={{
                            marginBottom: '15px', 
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>
                            @{video.creator}
                            {video.verified && (
                                <span style={{
                                    marginLeft: '8px',
                                    fontSize: '18px'
                                }}>✅</span>
                            )}
                        </h3>
                        
                        <p style={{
                            fontSize: '16px',
                            opacity: 0.9,
                            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                        }}>
                            {formatViews(video.views)} צפיות
                        </p>

                        {/* Play/Pause Button */}
                        <div 
                            onClick={() => setIsPlaying(!isPlaying)}
                            style={{
                                position: 'absolute',
                                bottom: '50%',
                                left: '50%',
                                transform: 'translate(-50%, 50%)',
                                width: '80px',
                                height: '80px',
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                border: '2px solid rgba(255,255,255,0.3)'
                            }}
                            className="hover-scale"
                        >
                            {isPlaying ? '⏸️' : '▶️'}
                        </div>

                        {/* Progress Bar */}
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            height: '4px',
                            background: 'rgba(255,255,255,0.2)'
                        }}>
                            <div style={{
                                height: '100%',
                                background: 'var(--accent-color)',
                                width: `${30 + (index * 15)}%`,
                                transition: 'width 1s ease',
                                borderRadius: '2px'
                            }}></div>
                        </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="video-info animated-fade-in-left">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                        }}>
                            <h3 style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>
                                @{video.creator}
                            </h3>
                            {video.verified && <span>✅</span>}
                        </div>
                        <p style={{
                            color: 'white',
                            fontSize: '15px',
                            lineHeight: '1.4',
                            marginBottom: '10px'
                        }}>
                            {video.description}
                        </p>
                        <div style={{
                            fontSize: '13px',
                            opacity: 0.8,
                            color: 'white'
                        }}>
                            {formatViews(video.views)} צפיות • {video.duration}
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="video-actions animated-fade-in-right">
                        {/* Like Button */}
                        <div className="action-group">
                            <button 
                                className={`action-btn hover-scale ${likedVideos.has(video.id) ? 'liked animated-pulse' : ''}`}
                                onClick={() => handleLike(video.id)}
                                style={{
                                    background: likedVideos.has(video.id) 
                                        ? 'rgba(255, 107, 107, 0.9)' 
                                        : 'rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                ❤️
                            </button>
                            <div className="action-count">
                                {video.likes + (likedVideos.has(video.id) ? 1 : 0)}
                            </div>
                        </div>
                        
                        {/* Comment Button */}
                        <div className="action-group">
                            <button className="action-btn hover-scale">
                                💬
                            </button>
                            <div className="action-count">
                                {video.comments}
                            </div>
                        </div>
                        
                        {/* Share Button */}
                        <div className="action-group">
                            <button 
                                className="action-btn hover-scale"
                                onClick={() => handleShare(video)}
                            >
                                📤
                            </button>
                            <div className="action-count">
                                {video.shares}
                            </div>
                        </div>
                        
                        {/* Favorite Button */}
                        <div className="action-group">
                            <button className="action-btn hover-scale animated-wave">
                                ⭐
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Add enhanced CSS for video feed
const videoFeedStyles = document.createElement('style');
videoFeedStyles.textContent = `
    .video-feed {
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
    }

    .video-feed::-webkit-scrollbar {
        display: none;
    }

    .video-container {
        height: 100vh;
        scroll-snap-align: start;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .video-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        text-align: center;
        position: relative;
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
    }

    .video-info {
        position: absolute;
        bottom: 140px;
        right: 20px;
        left: 80px;
        color: white;
        text-align: right;
        z-index: 10;
    }

    .video-actions {
        position: absolute;
        left: 20px;
        bottom: 150px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 10;
    }

    .action-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .action-btn {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(15px);
        border: none;
        color: white;
        font-size: 22px;
        cursor: pointer;
        transition: all var(--transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        will-change: transform;
    }

    .action-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .action-btn:active {
        transform: scale(0.95);
    }

    .action-btn.liked {
        background: rgba(255, 107, 107, 0.9);
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    }

    .action-count {
        color: white;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        min-width: 30px;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

document.head.appendChild(videoFeedStyles);