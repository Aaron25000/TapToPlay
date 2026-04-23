import React, { useState, useRef, useEffect } from 'react';

function Login_page({ onLogin, onClose }) {
  const [pin, setPin] = useState(['', '', '', '']); 
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleNumberClick = (number) => {
    const emptyIndex = pin.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      const newPin = [...pin];
      newPin[emptyIndex] = number.toString();
      setPin(newPin);
      if (emptyIndex < 3) {
        inputRefs[emptyIndex + 1].current.focus();
      }
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

  const handleClear = () => {
    setPin(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const pinCode = pin.join('');
    
    const VALID_USERNAME = 'TapToPlay';
    const VALID_PIN = '1234'; 

    if (pinCode.length !== 4) {
      setError('Please enter 4-digit PIN');
      return;
    }

    if (pinCode === VALID_PIN) {
      onLogin({
        username: VALID_USERNAME,
        pin: pinCode
      });
    } else {
      setError('Incorrect PIN. Access Denied.');
      setPin(['', '', '', '']);
      inputRefs[0].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 4);
    if (digits) {
      const newPin = [...pin];
      for (let i = 0; i < digits.length; i++) {
        newPin[i] = digits[i];
      }
      setPin(newPin);
      const nextIndex = Math.min(digits.length, 3);
      inputRefs[nextIndex].current.focus();
    }
  };

  const keypadButtonStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: 'none',
    background: '#f0f0f0',
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '30px', borderRadius: '20px',
        width: '90%', maxWidth: '400px', position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <button onClick={onClose} style={{
            position: 'absolute', top: '15px', right: '15px', border: 'none',
            background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999'
          }}>✕</button>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#2063d7', marginBottom: '5px' }}>Welcome, TapToPlay</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Enter security PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#ffebee', color: '#c62828', padding: '10px',
              borderRadius: '8px', marginBottom: '15px', textAlign: 'center'
            }}>{error}</div>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="password"
                value={digit}
                readOnly
                style={{
                  width: '60px', height: '70px', textAlign: 'center',
                  fontSize: '28px', fontWeight: 'bold',
                  border: `2px solid ${error ? '#ff4444' : '#e0e0e0'}`,
                  borderRadius: '10px', background: '#f8f9fa'
                }}
              />
            ))}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px', marginBottom: '15px', justifyItems: 'center'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
              <button key={number} type="button" onClick={() => handleNumberClick(number)} style={keypadButtonStyle}>{number}</button>
            ))}
            <div></div>
            <button type="button" onClick={() => handleNumberClick(0)} style={keypadButtonStyle}>0</button>
            <button type="button" onClick={handleBackspace} style={{ ...keypadButtonStyle, background: '#ff4444', color: 'white' }}>⌫</button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleClear} style={{ flex: 1, padding: '12px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Clear</button>
            <button type="submit" style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg, #2063d7 0%, #1DBFAF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login_page;