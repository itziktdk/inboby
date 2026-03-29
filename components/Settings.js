// Settings Component - Advanced Settings Panel
function Settings() {
    const [settings, setSettings] = useState({
        language: 'he', // he, en, ar
        theme: 'dark', // dark, light
        animations: true,
        notifications: true,
        autoplay: true,
        dataUsage: 'standard', // low, standard, high
        fontSize: 'medium' // small, medium, large
    });

    const [dropdowns, setDropdowns] = useState({
        language: false,
        dataUsage: false,
        fontSize: false
    });

    const languages = [
        { code: 'he', name: 'עברית', flag: '🇮🇱' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];

    const dataUsageOptions = [
        { value: 'low', name: 'נמוך - חיסכון בנתונים' },
        { value: 'standard', name: 'רגיל - איזון' },
        { value: 'high', name: 'גבוה - איכות מקסימלית' }
    ];

    const fontSizeOptions = [
        { value: 'small', name: 'קטן' },
        { value: 'medium', name: 'בינוני' },
        { value: 'large', name: 'גדול' }
    ];

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        
        // Apply theme change immediately
        if (key === 'theme') {
            document.documentElement.setAttribute('data-theme', value);
        }
        
        // Apply animations setting
        if (key === 'animations') {
            document.body.classList.toggle('animations-disabled', !value);
        }
        
        // Apply language direction
        if (key === 'language') {
            document.documentElement.setAttribute('dir', value === 'ar' ? 'rtl' : value === 'he' ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', value);
        }
        
        // Save to localStorage
        localStorage.setItem('inboby_settings', JSON.stringify({ ...settings, [key]: value }));
    };

    const toggleDropdown = (dropdown) => {
        setDropdowns(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const selectDropdownOption = (dropdown, value) => {
        updateSetting(dropdown, value);
        setDropdowns(prev => ({ ...prev, [dropdown]: false }));
    };

    // Load saved settings on mount
    React.useEffect(() => {
        const savedSettings = localStorage.getItem('inboby_settings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            
            // Apply saved settings
            document.documentElement.setAttribute('data-theme', parsed.theme);
            document.body.classList.toggle('animations-disabled', !parsed.animations);
            document.documentElement.setAttribute('dir', parsed.language === 'ar' || parsed.language === 'he' ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', parsed.language);
        }
    }, []);

    const resetSettings = () => {
        const defaultSettings = {
            language: 'he',
            theme: 'dark',
            animations: true,
            notifications: true,
            autoplay: true,
            dataUsage: 'standard',
            fontSize: 'medium'
        };
        
        setSettings(defaultSettings);
        localStorage.setItem('inboby_settings', JSON.stringify(defaultSettings));
        
        // Apply defaults
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.remove('animations-disabled');
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'he');
    };

    const exportSettings = () => {
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'inboby-settings.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="settings-container">
            <div className="settings-header animated-fade-in-up">
                <h1 className="settings-title">⚙️ הגדרות</h1>
                <p className="settings-subtitle">התאם את InBoby לפי הטעם שלך</p>
            </div>

            {/* Appearance Settings */}
            <div className="settings-section animated-fade-in-up hover-lift">
                <div className="section-title">
                    🎨 מראה ועיצוב
                </div>
                
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">מצב כהה / בהיר</div>
                        <div className="setting-description">
                            החלף בין עיצוב כהה לבהיר
                        </div>
                    </div>
                    <div 
                        className={`toggle-switch ${settings.theme === 'dark' ? 'active' : ''}`}
                        onClick={() => updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark')}
                    ></div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">אנימציות</div>
                        <div className="setting-description">
                            הפעל/כבה אנימציות וטרנזישנים
                        </div>
                    </div>
                    <div 
                        className={`toggle-switch ${settings.animations ? 'active' : ''}`}
                        onClick={() => updateSetting('animations', !settings.animations)}
                    ></div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">גודל טקסט</div>
                        <div className="setting-description">
                            התאם את גודל הכתב
                        </div>
                    </div>
                    <div className="dropdown">
                        <div 
                            className="dropdown-button"
                            onClick={() => toggleDropdown('fontSize')}
                        >
                            {fontSizeOptions.find(opt => opt.value === settings.fontSize)?.name}
                            <span style={{marginLeft: '10px'}}>▼</span>
                        </div>
                        <div className={`dropdown-menu ${dropdowns.fontSize ? 'open' : ''}`}>
                            {fontSizeOptions.map(option => (
                                <div 
                                    key={option.value}
                                    className="dropdown-item"
                                    onClick={() => selectDropdownOption('fontSize', option.value)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="settings-section animated-fade-in-up hover-lift" style={{animationDelay: '0.1s'}}>
                <div className="section-title">
                    🌍 שפה ואזור
                </div>
                
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">שפת האפליקציה</div>
                        <div className="setting-description">
                            בחר את השפה המועדפת עליך
                        </div>
                    </div>
                    <div className="dropdown">
                        <div 
                            className="dropdown-button"
                            onClick={() => toggleDropdown('language')}
                        >
                            {languages.find(lang => lang.code === settings.language)?.flag} {languages.find(lang => lang.code === settings.language)?.name}
                            <span style={{marginLeft: '10px'}}>▼</span>
                        </div>
                        <div className={`dropdown-menu ${dropdowns.language ? 'open' : ''}`}>
                            {languages.map(language => (
                                <div 
                                    key={language.code}
                                    className="dropdown-item"
                                    onClick={() => selectDropdownOption('language', language.code)}
                                >
                                    {language.flag} {language.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Settings */}
            <div className="settings-section animated-fade-in-up hover-lift" style={{animationDelay: '0.2s'}}>
                <div className="section-title">
                    ⚡ ביצועים ונתונים
                </div>
                
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">השמעה אוטומטית</div>
                        <div className="setting-description">
                            הפעל סרטונים אוטומטית
                        </div>
                    </div>
                    <div 
                        className={`toggle-switch ${settings.autoplay ? 'active' : ''}`}
                        onClick={() => updateSetting('autoplay', !settings.autoplay)}
                    ></div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">שימוש בנתונים</div>
                        <div className="setting-description">
                            בחר איכות תוכן לפי הצרכים שלך
                        </div>
                    </div>
                    <div className="dropdown">
                        <div 
                            className="dropdown-button"
                            onClick={() => toggleDropdown('dataUsage')}
                        >
                            {dataUsageOptions.find(opt => opt.value === settings.dataUsage)?.name}
                            <span style={{marginLeft: '10px'}}>▼</span>
                        </div>
                        <div className={`dropdown-menu ${dropdowns.dataUsage ? 'open' : ''}`}>
                            {dataUsageOptions.map(option => (
                                <div 
                                    key={option.value}
                                    className="dropdown-item"
                                    onClick={() => selectDropdownOption('dataUsage', option.value)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="settings-section animated-fade-in-up hover-lift" style={{animationDelay: '0.3s'}}>
                <div className="section-title">
                    🔔 התראות
                </div>
                
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">התראות push</div>
                        <div className="setting-description">
                            קבל התראות על הודעות חדשות ועדכונים
                        </div>
                    </div>
                    <div 
                        className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
                        onClick={() => updateSetting('notifications', !settings.notifications)}
                    ></div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="settings-section animated-fade-in-up hover-lift" style={{animationDelay: '0.4s'}}>
                <div className="section-title">
                    🔧 מתקדם
                </div>
                
                <div className="setting-item" onClick={exportSettings} style={{cursor: 'pointer'}}>
                    <div className="setting-info">
                        <div className="setting-label">ייצא הגדרות</div>
                        <div className="setting-description">
                            שמור את ההגדרות שלך לקובץ
                        </div>
                    </div>
                    <div style={{fontSize: '20px', color: 'var(--accent-color)'}}>
                        💾
                    </div>
                </div>

                <div className="setting-item" onClick={resetSettings} style={{cursor: 'pointer'}}>
                    <div className="setting-info">
                        <div className="setting-label">איפוס הגדרות</div>
                        <div className="setting-description">
                            החזר את כל ההגדרות לברירת מחדל
                        </div>
                    </div>
                    <div style={{fontSize: '20px', color: 'var(--warning-color)'}}>
                        🔄
                    </div>
                </div>
            </div>

            {/* App Info */}
            <div className="settings-section animated-fade-in-up hover-lift" style={{animationDelay: '0.5s', marginBottom: '100px'}}>
                <div className="section-title">
                    📱 אודות InBoby
                </div>
                
                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">גרסה</div>
                        <div className="setting-description">
                            InBoby v4.5 - Social Platform
                        </div>
                    </div>
                    <div style={{fontSize: '16px', color: 'var(--accent-color)', fontWeight: 'bold'}}>
                        v4.5
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <div className="setting-label">פותח על ידי</div>
                        <div className="setting-description">
                            Lyrbox & Jhony 🚀
                        </div>
                    </div>
                    <div style={{fontSize: '20px'}}>
                        💻
                    </div>
                </div>
            </div>
        </div>
    );
}