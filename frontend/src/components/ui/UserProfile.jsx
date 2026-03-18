import { useState } from 'react';
import './UserProfile.css';

function UserProfile({ user, onClose }) {
    // Initialize user stats from props or use default values
    const [userStats] = useState({
        username: user?.username || 'MusicLover',
        joinDate: 'January 2026',
        totalSongsPlayed: 157,
        totalPracticeTime: '42 hours',
        achievements: 12,
        currentStreak: 7,
        longestStreak: 15,
        favoriteGenre: 'Pop',
        level: 8,
        experience: 2340,
        nextLevelExp: 3000
    });

    // Track active tab state for content switching
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'achievements', 'stats'

    // Recent user activity records
    const recentActivities = [
        { id: 1, action: 'Played', song: 'Bohemian Rhapsody', artist: 'Queen', time: '2 hours ago' },
        { id: 2, action: 'Earned', achievement: 'Perfect Score', song: 'Yellow', time: 'Yesterday' },
        { id: 3, action: 'Played', song: 'Free Loop', artist: 'Daniel Powter', time: 'Yesterday' },
        { id: 4, action: 'Reached', milestone: 'Level 8', time: '3 days ago' },
        { id: 5, action: 'Played', song: 'Something Just Like This', artist: 'The Chainsmokers', time: '4 days ago' },
    ];

    // Calculate experience progress percentage
    const expPercentage = (userStats.experience / userStats.nextLevelExp) * 100;

    return (
        <div className="profile-overlay">
            <div className="profile-container">
                {/* Profile header with close button */}
                <div className="profile-header">
                    <button className="close-button" onClick={onClose}>✕</button>
                    <h1>My Profile</h1>
                </div>

                {/* Main profile content area */}
                <div className="profile-content">
                    {/* Left sidebar - user info and quick stats */}
                    <div className="profile-sidebar">
                        <div className="user-avatar-large">
                            {userStats.username.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="user-name">{userStats.username}</h2>
                        <p className="user-email">{userStats.email}</p>
                        <p className="user-join-date">Member since {userStats.joinDate}</p>

                        <div className="quick-stats">
                            <div className="quick-stat-item">
                                <span className="quick-stat-value">{userStats.totalSongsPlayed}</span>
                                <span className="quick-stat-label">Songs</span>
                            </div>
                            <div className="quick-stat-item">
                                <span className="quick-stat-value">{userStats.achievements}</span>
                                <span className="quick-stat-label">Badges</span>
                            </div>
                            <div className="quick-stat-item">
                                <span className="quick-stat-value">{userStats.currentStreak}</span>
                                <span className="quick-stat-label">Streak</span>
                            </div>
                        </div>

                        {/* Experience level indicator */}
                        <div className="level-container">
                            <div className="level-info">
                                <span>Level {userStats.level}</span>
                                <span>{userStats.experience}/{userStats.nextLevelExp} XP</span>
                            </div>
                            <div className="exp-bar">
                                <div 
                                    className="exp-fill" 
                                    style={{ width: `${expPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Right main content area with tabbed interface */}
                    <div className="profile-main">
                        <div className="profile-tabs">
                            <button 
                                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                Stats
                            </button>
                        </div>

                        <div className="tab-content">
                            {/* Overview tab - Recent activities */}
                            {activeTab === 'overview' && (
                                <div className="overview-tab">
                                    <h3>Recent Activity</h3>
                                    <div className="activity-list">
                                        {recentActivities.map(activity => (
                                            <div key={activity.id} className="activity-item">
                                                <div className="activity-icon">
                                                    {activity.action === 'Played' ? '🎵' : '🏆'}
                                                </div>
                                                <div className="activity-details">
                                                    <p>
                                                        {activity.action === 'Played' ? (
                                                            <>Played <strong>{activity.song}</strong> by {activity.artist}</>
                                                        ) : activity.action === 'Earned' ? (
                                                            <>Earned <strong>{activity.achievement}</strong> on {activity.song}</>
                                                        ) : (
                                                            <>{activity.action} <strong>{activity.milestone}</strong></>
                                                        )}
                                                    </p>
                                                    <span className="activity-time">{activity.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stats tab - Detailed user statistics */}
                            {activeTab === 'stats' && (
                                <div className="stats-tab">
                                    <h3>Detailed Statistics</h3>
                                    
                                    <div className="stats-grid">
                                        <div className="stat-card">
                                            <div className="stat-icon">🎵</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Total Songs</span>
                                                <span className="stat-number">{userStats.totalSongsPlayed}</span>
                                            </div>
                                        </div>

                                        <div className="stat-card">
                                            <div className="stat-icon">⏱️</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Practice Time</span>
                                                <span className="stat-number">{userStats.totalPracticeTime}</span>
                                            </div>
                                        </div>

                                        <div className="stat-card">
                                            <div className="stat-icon">🏆</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Achievements</span>
                                                <span className="stat-number">{userStats.achievements}</span>
                                            </div>
                                        </div>

                                        <div className="stat-card">
                                            <div className="stat-icon">🔥</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Current Streak</span>
                                                <span className="stat-number">{userStats.currentStreak} days</span>
                                            </div>
                                        </div>

                                        <div className="stat-card">
                                            <div className="stat-icon">📈</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Longest Streak</span>
                                                <span className="stat-number">{userStats.longestStreak} days</span>
                                            </div>
                                        </div>

                                        <div className="stat-card">
                                            <div className="stat-icon">🎸</div>
                                            <div className="stat-details">
                                                <span className="stat-label">Favorite Genre</span>
                                                <span className="stat-number">{userStats.favoriteGenre}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;