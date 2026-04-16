import React, { useState, useRef, useEffect } from 'react';
import styles from './Login.module.css'; // 确保路径正确

function Login_page({ onLogin, onClose }) {
  const [pin, setPin] = useState(['', '', '', '']); 
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleNumberClick = (number) => {
    const emptyIndex = pin.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      const newPin = [...pin];
      newPin[emptyIndex] = number.toString();
      setPin(newPin);
      if (emptyIndex < 3) inputRefs[emptyIndex + 1].current.focus();
    }
  };

  const handleBackspace = () => {
    for (let i = 3; i >= 0; i--) {
      if (pin[i] !== '') {
        const newPin = [...pin];
        newPin[i] = '';
        setPin(newPin);
        inputRefs[i].current.focus();
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const pinCode = pin.join('');
    const VALID_PIN = '1234'; 

    if (pinCode === VALID_PIN) {
      onLogin({ username: 'TapToPlay', pin: pinCode });
    } else {
      setError('Incorrect PIN. Access Denied.');
      setPin(['', '', '', '']);
      inputRefs[0].current.focus();
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginCard}>
        {/* 关闭按钮 */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', border: 'none',
          background: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)'
        }}>✕</button>
        
        <div style={{ textAlign: 'center' }}>
          {/* Logo 容器，可以复用 achievementIconImg 的样式 */}
          <img 
            src="/assets/TapToPlay_team_logo_design.png" 
            style={{ width: '80px', marginBottom: '10px', filter: 'drop-shadow(0 0 8px var(--color-primary-glow))' }} 
            alt="Logo" 
          />
          <h2 className={styles.loginTitle}>System Access</h2>
          <p className={styles.loginSubtitle}>Please enter your 4-digit security PIN</p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {error && (
            <div style={{ color: '#ff4444', marginBottom: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {error}
            </div>
          )}
          
          {/* PIN 输入框组 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="password"
                value={digit}
                readOnly
                className={`${styles.pinInput} ${error ? styles.error : ''}`}
              />
            ))}
          </div>

          {/* 数字键盘 */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px', marginBottom: '25px', justifyItems: 'center'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} type="button" onClick={() => handleNumberClick(num)} className={styles.keypadButton}>
                {num}
              </button>
            ))}
            <div />
            <button type="button" onClick={() => handleNumberClick(0)} className={styles.keypadButton}>0</button>
            <button 
              type="button" 
              onClick={handleBackspace} 
              className={styles.keypadButton}
              style={{ color: '#ff4444' }}
            >
              ⌫
            </button>
          </div>

        <div style={{ display: 'flex', gap: '12px' }}>
            
        {/* Clear 按钮：使用专用或普通的按钮类名 */}
        <button 
            type="button" 
            onClick={() => setPin(['','','',''])} 
            className={styles.clearButton} // 改用 clearButton
            style={{ flex: 1, height: '45px', fontSize: '16px' }}
        >
            Clear
        </button>
        {/* Login 按钮：使用 submitButton 类名 */}
        <button 
            type="submit" 
            className={styles.submitButton}
            style={{ flex: 1, height: '45px', fontSize: '16px' }}
        >
            Login
        </button>

        </div>
        </form>
      </div>
    </div>
  );
}

export default Login_page;