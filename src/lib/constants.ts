export const YOUTUBE_API = {
    BASE_URL: 'https://www.googleapis.com/youtube/v3',
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL: 'https://oauth2.googleapis.com/token',
    ANALYTICS_BASE_URL: 'https://youtubeanalytics.googleapis.com/v2',
    WATCH_URL: 'https://youtube.com/watch',
    SCOPES: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/yt-analytics.readonly'
    ],
    DEFAULTS: {
        MAX_RESULTS: 20,
        SEARCH_MAX_RESULTS: 10,
    }
};

export const APP_CONFIG = {
    NAME: 'Creaovate',
    // Add other app-wide constants here
};
