import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginView.module.css";

const LoginView = () => {
  const [pin, setPin] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleKeyPress = (num) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleAction = (type) => {
    if (type === 'clear') setPin("");
    if (type === 'delete') setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      login({ username: 'Player1' });
      navigate('/app');
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginCard}>
        <div className={styles.loginTitle}>Enter PIN</div>
        
        {/* Styled PIN Input */}
        <input 
          type="password"
          value={pin}
          readOnly /* Keeps mobile keyboard from popping up since we have our own */
          className={styles.pinInput}
          placeholder="••••"
          maxLength={4}
        />

        <div className={styles.keypadGrid}>
          {keys.map(num => (
            <button 
              key={num} 
              className={styles.keypadBtn}
              onClick={() => handleKeyPress(num)}
            >
              {num}
            </button>
          ))}
          <button className={styles.keypadBtn} onClick={() => handleAction('clear')}>CLR</button>
          <button className={styles.keypadBtn} onClick={() => handleKeyPress(0)}>0</button>
          <button className={styles.keypadBtn} onClick={() => handleAction('delete')}>DEL</button>
        </div>

        <button 
          className={styles.loginSubmit}
          disabled={pin.length < 4}
          onClick={handleSubmit}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default LoginView;