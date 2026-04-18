import React, { useState, useRef, useEffect } from 'react';
// import './Login_page.css';  // If there is a CSS file

function Login_page({ onLogin, onClose }) {
  const [pin, setPin] = useState(['', '', '', '']); // 4-digit PIN code
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Auto-focus on the first input box
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numeric input
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Automatically move to the next input box
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace: if current is empty, move to previous input
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle number keypad clicks
  const handleNumberClick = (number) => {
    // Find the first empty input box
    const emptyIndex = pin.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      const newPin = [...pin];
      newPin[emptyIndex] = number.toString();
      setPin(newPin);
      
      // Automatically move to the next input box
      if (emptyIndex < 3) {
        inputRefs[emptyIndex + 1].current.focus();
      }
    }
  };

  // Handle backspace button
  const handleBackspace = () => {
    // Find the last non-empty input box
    for (let i = 3; i >= 0; i--) {
      if (pin[i] !== '') {
        const newPin = [...pin];
        newPin[i] = '';
        setPin(newPin);
        
        // Focus on the current input box
        if (i > 0) {
          inputRefs[i].current.focus();
        } else {
          inputRefs[0].current.focus();
        }
        break;
      }
    }
  };

  // Handle clearing all input
  const handleClear = () => {
    setPin(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const pinCode = pin.join('');
    if (pinCode.length !== 4) {
      setError('Please enter 4-digit PIN');
      return;
    }

    onLogin({
      username: 'User',
      pin: pinCode
    });
  };

  // Handle paste event
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

  // Number keypad button style
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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#999',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          ✕
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img 
            src="/assets/TapToPlay_team_logo_design.png" 
            alt="TapToPlay Logo" 
            style={{ 
              maxWidth: '150px', 
              marginBottom: '15px',
              width: '100%',
              height: 'auto'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
          <h2 style={{ color: '#2063d7', marginBottom: '5px', fontSize: '1.5rem' }}>Welcome Back!</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Enter your 4-digit PIN</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          
          {/* PIN input boxes */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '25px'
          }}>
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                maxLength="1"
                style={{
                  width: '60px',
                  height: '70px',
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  border: `2px solid ${error ? '#ff4444' : '#e0e0e0'}`,
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  background: '#f8f9fa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2063d7';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32,99,215,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? '#ff4444' : '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                readOnly // Make input read-only, only allow keypad input
              />
            ))}
          </div>

          {/* Number keypad */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '15px',
            justifyItems: 'center'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
              <button
                key={number}
                type="button"
                onClick={() => handleNumberClick(number)}
                style={keypadButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2063d7';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#333';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {number}
              </button>
            ))}
            
            {/* Empty spacer */}
            <div></div>
            
            {/* 0 button */}
            <button
              type="button"
              onClick={() => handleNumberClick(0)}
              style={keypadButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.background = '#2063d7';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f0f0f0';
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
              }}
            >
              0
            </button>
            
            {/* Backspace button */}
            <button
              type="button"
              onClick={handleBackspace}
              style={{
                ...keypadButtonStyle,
                background: '#ff4444',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ff6666';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ff4444';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ⌫
            </button>
          </div>

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px'
          }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                flex: 1,
                padding: '12px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e0e0e0';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f0f0f0';
              }}
            >
              Clear
            </button>
            
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '12px',
                background: 'linear-gradient(135deg, #2063d7 0%, #1DBFAF 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(32,99,215,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Login
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>
            Don't have an account? <a href="/signup" style={{ color: '#2063d7', textDecoration: 'none' }}>Sign up</a>
          </p>
          <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '5px' }}>
            Forgot PIN? <a href="/reset-pin" style={{ color: '#1DBFAF', textDecoration: 'none' }}>Reset</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login_page;