import { useState, useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './Sidebar'; // Import Sidebar component
import reactLogo from './assets/react.svg'

function App() {
  const [rotationDirection, setRotationDirection] = useState('forward');
  const imageRef = useRef(null)
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [stillnessTime, setStillnessTime] = useState(0);
  const [isOnPage, setIsOnPage] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRotationEnabled, setIsRotationEnabled] = useState(true);
  const [isSizeAdjustmentEnabled, setIsSizeAdjustmentEnabled] = useState(true);
  const [isStillnessTimeEnabled, setIsStillnessTimeEnabled] = useState(true);

  const handleClick = () => {
    setRotationDirection(rotationDirection === 'forward' ? 'backward' : 'forward');
  };

  useEffect(() => {
    if (isRotationEnabled) {
      const handleMouseMove = (e) => {
        if (isSizeAdjustmentEnabled) {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xRatio = clientX / innerWidth;
          const yRatio = clientY / innerHeight;
          const scale = 1 + (xRatio + yRatio) * 0.5;
          imageRef.current.style.transform = `scale(${scale})`;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isRotationEnabled, isSizeAdjustmentEnabled]);

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
    if (!isMouseMoving && isStillnessTimeEnabled && isOnPage) {
      const intervalId = setInterval(() => {
        setStillnessTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMouseMoving, isStillnessTimeEnabled]);

  return (
    <div>
      <div>
        <button className='sidebar-button' onClick={() => setShowSidebar(!showSidebar)}>Toggle Sidebar</button>
        {showSidebar && (
          <Sidebar
            isRotationEnabled={isRotationEnabled}
            setIsRotationEnabled={setIsRotationEnabled}
            isSizeAdjustmentEnabled={isSizeAdjustmentEnabled}
            setIsSizeAdjustmentEnabled={setIsSizeAdjustmentEnabled}
            isStillnessTimeEnabled={isStillnessTimeEnabled}
            setIsStillnessTimeEnabled={setIsStillnessTimeEnabled}
            setStillnessTime={setStillnessTime}
          />
        )}
      </div>
      <div className='image-div'>
        <div ref={imageRef}>
          <img
            src={reactLogo}
            alt="React Logo"
            className={`react-icon ${isRotationEnabled ? `rotating-${rotationDirection}` : ''}`}
            onClick={handleClick}
          />
        </div>
      </div>
      <div>
      <p>Mouse Stillness Time: {stillnessTime} seconds</p>
      </div>
    </div>
  );
}

export default App;