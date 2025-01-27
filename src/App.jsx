import { useState, useEffect } from 'react';
import './App.css';
import reactLogo from './assets/react.svg'

function App() {
  const [rotationDirection, setRotationDirection] = useState('forward');

  const handleClick = () => {
    setRotationDirection(rotationDirection === 'forward' ? 'backward' : 'forward');
  };
  return (
    <div>
      <div>
          <img
            src={reactLogo}
            alt="React Logo"
            className={`react-icon rotating-${rotationDirection}`}
            onClick={handleClick}
          />
      </div>
    </div>
  );
}

export default App;