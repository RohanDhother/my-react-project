import { useState, useEffect, useRef } from 'react';
import './App.css';
import reactLogo from './assets/react.svg'

function App() {
  const [rotationDirection, setRotationDirection] = useState('forward');
  const imageRef = useRef(null)
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [stillnessTime, setStillnessTime] = useState(0);
  const [isOnPage, setIsOnPage] = useState(true);

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

  useEffect(() => {
    let timerId;

    const handleMouseMove = () => {
      setIsOnPage(true);
      setIsMouseMoving(true);
      clearTimeout(timerId);
      setStillnessTime(0);
      timerId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };

    const handleMouseLeave = () => {
      clearTimeout(timerId);
      setStillnessTime(0);
      setIsOnPage(false);
    }

    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!isMouseMoving && isOnPage) {
      const intervalId = setInterval(() => {
        setStillnessTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMouseMoving]);

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
          <p>Mouse Stillness Time: {stillnessTime} seconds</p>
      </div>
    </div>
  );
}

export default App;