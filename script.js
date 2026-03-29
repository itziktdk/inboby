// Enhanced JavaScript - InBoby v4.5 Core System
console.log('🚀 InBoby v4.5 - Loading Advanced Systems...');

// Global InBoby object with enhanced features
window.InBoby = {
    version: '4.5',
    author: 'Lyrbox & Jhony',
    buildDate: new Date().toISOString(),
    features: [
        '📱 Mobile-First PWA Design',
        '🎥 Advanced TikTok-Style Videos',
        '💬 Real-time Private Messages',
        '📺 Smart Channel Discovery',
        '👤 Rich User Profiles',
        '⚙️ Comprehensive Settings',
        '✨ Telegram-Style Smooth Animations',
        '🌐 Multi-language Support',
        '🎨 Dark/Light Theme System',
        '⚡ High Performance Optimizations'
    ],
    performance: {
        startTime: performance.now(),
        loadTime: null,
        animationsEnabled: true
    }
};

// Advanced Animation System
class AnimationEngine {
    constructor() {
        this.isEnabled = true;
        this.observers = new Map();
        this.init();
    }

    init() {
        // Intersection Observer for scroll animations
        this.createScrollObserver();
        
        // Performance-based animation controls
        this.monitorPerformance();
        
        // Reduced motion preference
        this.handleReducedMotion();
    }

    createScrollObserver() {
        const options = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '20px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);
    }

    triggerAnimation(element) {
        if (!this.isEnabled) return;

        const animationType = element.dataset.animation || 'fadeIn';
        const delay = element.dataset.delay || '0';
        
        setTimeout(() => {
            element.classList.add('animated', `animated-${animationType}`);
        }, parseInt(delay));
    }

    observe(element) {
        if (this.scrollObserver) {
            this.scrollObserver.observe(element);
        }
    }

    disable() {
        this.isEnabled = false;
        document.body.classList.add('animations-disabled');
    }

    enable() {
        this.isEnabled = true;
        document.body.classList.remove('animations-disabled');
    }

    monitorPerformance() {
        // Auto-disable animations on low-end devices
        if ('deviceMemory' in navigator && navigator.deviceMemory < 2) {
            console.log('⚡ Low-end device detected, optimizing animations');
            this.optimizeForLowEnd();
        }
    }

    optimizeForLowEnd() {
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            .low-end-optimized * {
                animation-duration: 0.2s !important;
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('low-end-optimized');
    }

    handleReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disable();
            console.log('♿ Reduced motion preference detected');
        }
    }
}

// Touch and Gesture System
class GestureHandler {
    constructor() {
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        this.setupGestures();
    }

    setupGestures() {
        // Touch events
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Mouse events for desktop testing
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleTouchStart(e) {
        this.touchStartY = e.changedTouches[0].screenY;
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndY = e.changedTouches[0].screenY;
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleMouseDown(e) {
        this.touchStartY = e.screenY;
        this.touchStartX = e.screenX;
    }

    handleMouseUp(e) {
        this.touchEndY = e.screenY;
        this.touchEndX = e.screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const deltaY = this.touchStartY - this.touchEndY;
        const deltaX = this.touchStartX - this.touchEndX;
        const absDeltaY = Math.abs(deltaY);
        const absDeltaX = Math.abs(deltaX);

        // Vertical swipe (video navigation)
        if (absDeltaY > this.minSwipeDistance && absDeltaY > absDeltaX) {
            if (deltaY > 0) {
                this.onSwipeUp();
            } else {
                this.onSwipeDown();
            }
        }
        
        // Horizontal swipe (tab navigation)
        if (absDeltaX > this.minSwipeDistance && absDeltaX > absDeltaY) {
            if (deltaX > 0) {
                this.onSwipeLeft();
            } else {
                this.onSwipeRight();
            }
        }
    }

    onSwipeUp() {
        console.log('📱 Swipe up - Next video');
        this.vibrate(30);
        // Could trigger next video
    }

    onSwipeDown() {
        console.log('📱 Swipe down - Previous video');
        this.vibrate(30);
        // Could trigger previous video
    }

    onSwipeLeft() {
        console.log('📱 Swipe left - Next tab');
        this.vibrate(20);
        // Could change tabs
    }

    onSwipeRight() {
        console.log('📱 Swipe right - Previous tab');
        this.vibrate(20);
        // Could change tabs
    }

    vibrate(duration = 50) {
        if ('vibrate' in navigator && window.InBoby.performance.animationsEnabled) {
            navigator.vibrate(duration);
        }
    }
}

// Theme and Settings Manager
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.savedSettings = this.loadSettings();
        this.init();
    }

    init() {
        this.applySettings(this.savedSettings);
        this.setupThemeToggle();
    }

    loadSettings() {
        const saved = localStorage.getItem('inboby_settings');
        return saved ? JSON.parse(saved) : {
            theme: 'dark',
            language: 'he',
            animations: true,
            notifications: true,
            autoplay: true,
            dataUsage: 'standard',
            fontSize: 'medium'
        };
    }

    saveSettings(settings) {
        localStorage.setItem('inboby_settings', JSON.stringify(settings));
        this.savedSettings = settings;
    }

    applySettings(settings) {
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        this.currentTheme = settings.theme;

        // Apply language and direction
        const isRTL = settings.language === 'he' || settings.language === 'ar';
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', settings.language);

        // Apply animations
        if (!settings.animations) {
            window.animationEngine?.disable();
        } else {
            window.animationEngine?.enable();
        }

        // Apply font size
        document.documentElement.style.setProperty('--base-font-size', 
            settings.fontSize === 'small' ? '14px' :
            settings.fontSize === 'large' ? '18px' : '16px'
        );
    }

    setupThemeToggle() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (this.savedSettings.theme === 'auto') {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update saved settings
        this.saveSettings({ ...this.savedSettings, theme });
        
        // Add theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            memoryUsage: 0,
            fps: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.monitorMemory();
        this.monitorFPS();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.loadTime = Math.round(loadTime);
            window.InBoby.performance.loadTime = loadTime;
            console.log(`⚡ App loaded in ${this.metrics.loadTime}ms`);
        });
    }

    monitorMemory() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            }, 5000);
        }
    }

    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;

        const countFrames = (currentTime) => {
            frames++;
            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(countFrames);
        };

        requestAnimationFrame(countFrames);
    }

    getReport() {
        return {
            ...this.metrics,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
}

// Keyboard Shortcuts
class KeyboardManager {
    constructor() {
        this.shortcuts = new Map([
            ['Space', () => this.togglePlayback()],
            ['ArrowUp', () => this.previousVideo()],
            ['ArrowDown', () => this.nextVideo()],
            ['ArrowLeft', () => this.previousTab()],
            ['ArrowRight', () => this.nextTab()],
            ['KeyL', () => this.toggleLike()],
            ['KeyS', () => this.toggleSettings()],
            ['KeyT', () => this.toggleTheme()]
        ]);
        
        this.setupListeners();
    }

    setupListeners() {
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            const handler = this.shortcuts.get(e.code);
            if (handler) {
                e.preventDefault();
                handler();
            }
        });
    }

    togglePlayback() {
        console.log('⏯️ Toggle playback');
        // Implement video play/pause
    }

    previousVideo() {
        console.log('⬆️ Previous video');
        // Implement video navigation
    }

    nextVideo() {
        console.log('⬇️ Next video');
        // Implement video navigation
    }

    previousTab() {
        console.log('⬅️ Previous tab');
        // Implement tab navigation
    }

    nextTab() {
        console.log('➡️ Next tab');
        // Implement tab navigation
    }

    toggleLike() {
        console.log('❤️ Toggle like');
        // Implement like toggle
    }

    toggleSettings() {
        console.log('⚙️ Toggle settings');
        // Implement settings panel
    }

    toggleTheme() {
        console.log('🌙 Toggle theme');
        window.themeManager?.toggleTheme();
    }
}

// Initialize all systems when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 InBoby v4.5 - Initializing Systems...');
    
    // Initialize core systems
    window.animationEngine = new AnimationEngine();
    window.gestureHandler = new GestureHandler();
    window.themeManager = new ThemeManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.keyboardManager = new KeyboardManager();
    
    // Auto-observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        window.animationEngine.observe(element);
    });
    
    console.log('✨ All systems initialized successfully!');
    console.log('🎮 Features loaded:', window.InBoby.features);
    console.log('⌨️ Keyboard shortcuts: Space, Arrows, L, S, T');
});

// Export global utilities
window.InBoby.utils = {
    vibrate: (pattern = 50) => {
        if ('vibrate' in navigator && window.InBoby.performance.animationsEnabled) {
            navigator.vibrate(pattern);
        }
    },
    
    animate: (element, animation, duration = 300) => {
        if (!window.InBoby.performance.animationsEnabled) return;
        
        element.style.animation = `${animation} ${duration}ms ease`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },
    
    smoothScroll: (element, options = {}) => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
            ...options
        });
    }
};

console.log('🚀 InBoby v4.5 Core Systems Ready!');
console.log('👨‍💻 Built with ❤️ by Lyrbox & Jhony');