// Profile Component - Instagram/TikTok Style
function Profile({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(user.bio);
    const [editedName, setEditedName] = useState(user.name);
    const [stats, setStats] = useState({
        posts: 47,
        likes: 1250,
        followers: 523,
        following: 189
    });

    const [userPosts] = useState([
        { id: 1, type: 'video', thumbnail: '🎮', title: 'משחק מדהים!', likes: 89, views: '1.2K' },
        { id: 2, type: 'image', thumbnail: '🎨', title: 'יצירה חדשה', likes: 156, views: '856' },
        { id: 3, type: 'video', thumbnail: '😂', title: 'סרטון מצחיק', likes: 234, views: '2.1K' },
        { id: 4, type: 'video', thumbnail: '🎵', title: 'מוזיקה נהדרת', likes: 78, views: '934' },
        { id: 5, type: 'image', thumbnail: '💻', title: 'פרויקט טק', likes: 145, views: '1.8K' },
        { id: 6, type: 'video', thumbnail: '🔥', title: 'תוכן חם!', likes: 203, views: '3.2K' }
    ]);

    const [achievements] = useState([
        { icon: '🏆', title: 'יוצר מוביל', description: 'הגעת ל-1000 לייקים!', earned: true },
        { icon: '⭐', title: 'כוכב עולה', description: '500 עוקבים', earned: true },
        { icon: '🎯', title: 'פופולרי', description: 'סרטון עם 1K צפיות', earned: true },
        { icon: '💎', title: 'יוצר יהלום', description: '10K צפיות סה"כ', earned: false },
        { icon: '🚀', title: 'ויראלי', description: 'סרטון עם 10K צפיות', earned: false }
    ]);

    const handleSave = () => {
        // כאן תהיה לוגיקה לשמירה
        setIsEditing(false);
    };

    const handleFollow = () => {
        setStats(prev => ({
            ...prev,
            followers: prev.followers + 1
        }));
    };

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {user.avatar}
                </div>
                
                {isEditing ? (
                    <div style={{width: '100%', maxWidth: '300px'}}>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: 'none',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '18px',
                                textAlign: 'center',
                                backdropFilter: 'blur(10px)'
                            }}
                            placeholder="השם שלך"
                        />
                        <textarea
                            value={editedBio}
                            onChange={(e) => setEditedBio(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '14px',
                                textAlign: 'center',
                                backdropFilter: 'blur(10px)',
                                resize: 'none',
                                height: '80px'
                            }}
                            placeholder="ספר קצת על עצמך..."
                        />
                        <div style={{marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
                            <button onClick={handleSave} style={{
                                background: '#4ecdc4',
                                border: 'none',
                                color: 'white',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer'
                            }}>
                                💾 שמור
                            </button>
                            <button onClick={() => setIsEditing(false)} style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer'
                            }}>
                                ❌ ביטול
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="profile-name">{editedName}</div>
                        <div className="profile-bio" onClick={() => setIsEditing(true)} style={{cursor: 'pointer'}}>
                            {editedBio}
                            <div style={{fontSize: '12px', opacity: 0.7, marginTop: '5px'}}>
                                👆 לחץ לערוך
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="profile-stats">
                <div className="stat">
                    <span className="stat-number">{stats.posts}</span>
                    <span className="stat-label">פוסטים</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{stats.likes}</span>
                    <span className="stat-label">לייקים</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{stats.followers}</span>
                    <span className="stat-label">עוקבים</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{stats.following}</span>
                    <span className="stat-label">עוקב</span>
                </div>
            </div>

            {/* Achievements */}
            <div style={{padding: '20px'}}>
                <h3 style={{color: 'white', marginBottom: '15px', textAlign: 'center'}}>🏆 הישגים</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                }}>
                    {achievements.map((achievement, index) => (
                        <div key={index} style={{
                            background: achievement.earned ? '#222' : '#111',
                            borderRadius: '15px',
                            padding: '15px',
                            textAlign: 'center',
                            border: achievement.earned ? '1px solid #4ecdc4' : '1px solid #333',
                            opacity: achievement.earned ? 1 : 0.5
                        }}>
                            <div style={{fontSize: '30px', marginBottom: '5px'}}>
                                {achievement.earned ? achievement.icon : '🔒'}
                            </div>
                            <div style={{
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                marginBottom: '3px'
                            }}>
                                {achievement.title}
                            </div>
                            <div style={{
                                color: '#888',
                                fontSize: '10px'
                            }}>
                                {achievement.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Posts Grid */}
            <div style={{padding: '0 20px 20px'}}>
                <h3 style={{color: 'white', marginBottom: '15px', textAlign: 'center'}}>📱 הפוסטים שלי</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px'
                }}>
                    {userPosts.map(post => (
                        <div key={post.id} style={{
                            aspectRatio: '1',
                            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            position: 'relative',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                            {post.type === 'video' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'rgba(0,0,0,0.7)',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px'
                                }}>
                                    ▶️
                                </div>
                            )}
                            <div style={{marginBottom: '5px'}}>{post.thumbnail}</div>
                            <div style={{
                                position: 'absolute',
                                bottom: '5px',
                                left: '5px',
                                background: 'rgba(0,0,0,0.7)',
                                borderRadius: '10px',
                                padding: '2px 6px',
                                fontSize: '8px'
                            }}>
                                ❤️ {post.likes}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                background: 'rgba(0,0,0,0.7)',
                                borderRadius: '10px',
                                padding: '2px 6px',
                                fontSize: '8px'
                            }}>
                                👁️ {post.views}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
                <button className="profile-btn" onClick={() => setIsEditing(true)}>
                    ✏️ ערוך פרופיל
                </button>
                <button className="profile-btn" onClick={handleFollow}>
                    📊 סטטיסטיקות
                </button>
                <button className="profile-btn">
                    ⚙️ הגדרות
                </button>
                <button className="profile-btn">
                    🌙 מצב כהה / בהיר
                </button>
                <button className="profile-btn" style={{marginBottom: '100px'}}>
                    📤 שתף פרופיל
                </button>
            </div>
        </div>
    );
}