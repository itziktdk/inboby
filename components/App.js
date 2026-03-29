// Main App Component - InBoby v4.5
const { useState, useEffect } = React;

function App() {
    const [currentView, setCurrentView] = useState('splash');
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({
        name: 'Lyrbox',
        bio: 'לחץ כדי לערוך את הביו שלך',
        avatar: '😎',
        posts: 47,
        likes: 1250,
        followers: 523
    });

    // Initialize app
    useEffect(() => {
        // Simulate loading process
        const loadingSteps = [
            { text: 'טוען רכיבים...', progress: 20 },
            { text: 'מתחבר לשרתים...', progress: 40 },
            { text: 'מטעין תוכן...', progress: 60 },
            { text: 'מכין הכל בשבילך...', progress: 80 },
            { text: 'כמעט מוכן...', progress: 95 },
            { text: 'מוכן! 🚀', progress: 100 }
        ];

        let currentStep = 0;
        const loadingInterval = setInterval(() => {
            const step = loadingSteps[currentStep];
            const progressBar = document.getElementById('loading-progress');
            const loadingText = document.getElementById('loading-text');
            
            if (progressBar && loadingText) {
                progressBar.style.width = `${step.progress}%`;
                loadingText.textContent = step.text;
            }
            
            currentStep++;
            
            if (currentStep >= loadingSteps.length) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    setIsLoading(false);
                    setCurrentView('home');
                    
                    // Hide loading screen with animation
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                        setTimeout(() => {
                            loadingScreen.remove();
                        }, 500);
                    }
                }, 500);
            }
        }, 400);

        // Load saved settings
        const savedSettings = localStorage.getItem('inboby_settings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
            document.body.classList.toggle('animations-disabled', !settings.animations);
            document.documentElement.setAttribute('dir', settings.language === 'ar' || settings.language === 'he' ? 'rtl' : 'ltr');
        }

        return () => clearInterval(loadingInterval);
    }, []);

    const renderView = () => {
        if (isLoading || currentView === 'splash') {
            return null; // Loading screen handles this
        }

        switch(currentView) {
            case 'home':
                return <VideoFeed />;
            case 'messages':
                return <Messages />;
            case 'channels':
                return <Channels />;
            case 'profile':
                return <Profile user={user} />;
            case 'settings':
                return <Settings />;
            default:
                return <VideoFeed />;
        }
    };

    const NavigationItem = ({ view, icon, isActive, onClick }) => (
        <div 
            className={`nav-item hover-scale ${isActive ? 'active' : ''}`}
            onClick={onClick}
            style={{
                animationDelay: `${Object.keys({home: 0, channels: 1, messages: 2, profile: 3, settings: 4})[view] * 0.1}s`
            }}
        >
            {icon}
        </div>
    );

    if (isLoading) {
        return null; // Loading screen is in HTML
    }

    return (
        <div className="app animated-fade-in-up">
            {renderView()}
            
            <nav className="nav animated-slide-in-up">
                <NavigationItem
                    view="home"
                    icon="🏠"
                    isActive={currentView === 'home'}
                    onClick={() => setCurrentView('home')}
                />
                <NavigationItem
                    view="channels"
                    icon="📺"
                    isActive={currentView === 'channels'}
                    onClick={() => setCurrentView('channels')}
                />
                <NavigationItem
                    view="messages"
                    icon="💬"
                    isActive={currentView === 'messages'}
                    onClick={() => setCurrentView('messages')}
                />
                <NavigationItem
                    view="profile"
                    icon="👤"
                    isActive={currentView === 'profile'}
                    onClick={() => setCurrentView('profile')}
                />
                <NavigationItem
                    view="settings"
                    icon="⚙️"
                    isActive={currentView === 'settings'}
                    onClick={() => setCurrentView('settings')}
                />
            </nav>
        </div>
    );
}

// Enhanced error boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('InBoby Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>😵</div>
                    <h2>אופס! משהו השתבש</h2>
                    <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                        InBoby נתקל בבעיה לא צפויה
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        🔄 טען מחדש
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

// Performance monitoring
const PerformanceMonitor = () => {
    useEffect(() => {
        // Monitor performance
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure') {
                        console.log(`⚡ ${entry.name}: ${Math.round(entry.duration)}ms`);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['measure'] });
            } catch (e) {
                // Fallback for older browsers
            }
        }

        // Log app initialization
        console.log('🚀 InBoby v4.5 initialized');
        console.log('👨‍💻 Built by Lyrbox & Jhony');
        console.log('🎮 Features: TikTok Videos, Messages, Channels, Settings');
    }, []);

    return null;
};

// Render the app with error boundary
ReactDOM.render(
    <ErrorBoundary>
        <PerformanceMonitor />
        <App />
    </ErrorBoundary>, 
    document.getElementById('root')
);