import { useState } from "react";
import Dialog from "./Dialog";
import styles from "./UserProfileDialog.module.css";

const UserProfileDialog = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'achievements', 'stats'

  console.log(user);

  const recentActivities = [
    { id: 1, action: 'Played', song: 'Bohemian Rhapsody', artist: 'Queen', time: '2 hours ago' },
    { id: 2, action: 'Earned', achievement: 'Perfect Score', song: 'Yellow', time: 'Yesterday' },
    { id: 3, action: 'Played', song: 'Free Loop', artist: 'Daniel Powter', time: 'Yesterday' },
    { id: 4, action: 'Reached', milestone: 'Level 8', time: '3 days ago' },
    { id: 5, action: 'Played', song: 'Something Just Like This', artist: 'The Chainsmokers', time: '4 days ago' },
  ];

  const expPercentage = (user.experience / user.nextLevelExp) * 100;

  return (
    <Dialog
      title="User Profile"
      onClose={onClose}
    >
      {/* Left sidebar - user info and quick stats */}
      <div className={styles.profileSidebar}>
          <div className={styles.userAvatarLarge}>
              {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className={styles.userName}>{user.username}</h2>
          <p className={styles.userJoinDate}>Member since {user.joinDate}</p>

          <div className={styles.quickStats}>
              <div className={styles.quickStatItem}>
                  <span className={styles.quickStatValue}>{user.completedSongs.lenght || 0}</span>
                  <span className={styles.quickStatLabel}>Songs</span>
              </div>
              <div className={styles.quickStatItem}>
                  <span className={styles.quickStatValue}>{user.achievements.lenght || 0}</span>
                  <span className={styles.quickStatLabel}>Badges</span>
              </div>
              <div className={styles.quickStatItem}>
                  <span className={styles.quickStatValue}>{user.currentStreak || 0}</span>
                  <span className={styles.quickStatLabel}>Streak</span>
              </div>
          </div>

          {/* Experience level indicator */}
          <div className={styles.levelContainer}>
              <div className={styles.levelInfo}>
                  <span>Level {user.level}</span>
                  <span>{user.experience}/{user.nextLevelExp} XP</span>
              </div>
              <div className={styles.expBar}>
                  <div 
                      className={styles.expFill} 
                      style={{ width: `${styles.expPercentage}%` }}
                  ></div>
              </div>
          </div>
      </div>

      {/* Right main content area with tabbed interface */}
      <div className={styles.profileMain}>
          <div className={styles.profileTabs}>
              <button 
                  className={`${styles.tabButton} ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
              > {/* TODO: Fix className activeTab call */}
                  Overview
              </button>
              <button 
                  className={`${styles.tabButton} ${activeTab === 'stats' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stats')}
              > {/* TODO: Fix className activeTab call */}
                  Stats
              </button>
          </div>
          <div className={styles.tabContent}>
              {/* Overview tab - Recent activities */}
              {activeTab === 'overview' && (
                  <div className={styles.overviewTab}>
                      <h3>Recent Activity</h3>
                      <div className={styles.activityList}>
                          {recentActivities.map(activity => (
                              <div key={activity.id} className={styles.activityItem}>
                                  <div className={styles.activityIcon}>
                                      {activity.action === 'Played' ? '🎵' : '🏆'}
                                  </div>
                                  <div className={styles.activityDetails}>
                                      <p>
                                          {activity.action === 'Played' ? (
                                              <>Played <strong>{activity.song}</strong> by {activity.artist}</>
                                          ) : activity.action === 'Earned' ? (
                                              <>Earned <strong>{activity.achievement}</strong> on {activity.song}</>
                                          ) : (
                                              <>{activity.action} <strong>{activity.milestone}</strong></>
                                          )}
                                      </p>
                                      <span className={styles.activityTime}>{activity.time}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* Stats tab - Detailed user statistics */}
              {activeTab === 'stats' && (
                  <div className={styles.statsTab}>
                      <h3>Detailed Statistics</h3>
                      
                      <div className={styles.statsGrid}>
                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>🎵</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Total Songs</span>
                                  <span className={styles.statNumber}>{user.completedSongs}</span>
                              </div>
                          </div>

                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>⏱️</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Practice Time</span>
                                  <span className={styles.statNumber}>{user.totalPracticeTime}</span>
                              </div>
                          </div>

                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>🏆</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Achievements</span>
                                  <span className={styles.statNumber}>{user.achievements.lenght}</span>
                              </div>
                          </div>

                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>🔥</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Current Streak</span>
                                  <span className={styles.statNumber}>{user.currentStreak} days</span>
                              </div>
                          </div>

                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>📈</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Longest Streak</span>
                                  <span className={styles.statNumber}>{user.longestStreak} days</span>
                              </div>
                          </div>

                          <div className={styles.statCard}>
                              <div className={styles.statIcon}>🎸</div>
                              <div className={styles.statDetails}>
                                  <span className={styles.statLabel}>Favorite Genre</span>
                                  <span className={styles.statNumber}>{user.favoriteGenre}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </Dialog>
  );
};

export default UserProfileDialog;