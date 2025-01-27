import { useState, useEffect, useRef } from 'react';
import './App.css';
import reactLogo from './assets/react.svg'

function App() {
  const [rotationDirection, setRotationDirection] = useState('forward');
  const imageRef = useRef(null)

  const handleClick = () => {
    setRotationDirection(rotationDirection === 'forward' ? 'backward' : 'forward');
  };

  useEffect(() => {
      const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xRatio = clientX / innerWidth;
          const yRatio = clientY / innerHeight;
          const scale = 1 + (xRatio + yRatio) * 0.5;
          imageRef.current.style.transform = `scale(${scale})`;
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
  });
  return (
    <div>
      <div class='image-div'>
          <div ref={imageRef}>
            <img
            src={reactLogo}
            alt="React Logo"
            className={`react-icon rotating-${rotationDirection}`}
            onClick={handleClick}
          />
          </div>
      </div>
    </div>
  );
}

export default App;