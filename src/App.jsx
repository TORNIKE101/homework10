import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const imageRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseEnter = () => {
    setIsZoomed(true);
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(2)';
      imageRef.current.style.transition = 'transform 0.3s ease, transform-origin 0.3s ease';
    }
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
    }
  };

  const videoRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div>
      <h1>React Timer Example</h1>
      <div>
        <h2>Timer: {time}s</h2>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <hr />
      <h1>Hover to Zoom</h1>
      <div
        style={{
          width: '300px',
          height: '300px',
          overflow: 'hidden',
        }}
      >
        <img
          ref={imageRef}
          src="https://www.sportico.com/wp-content/uploads/2020/09/0911_IMG.jpg"
          alt="Zoomable"
          style={{
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s ease, transform-origin 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <hr />

      <h1>Custom Video Player</h1>
      <video
        ref={videoRef}
        width="600"
        controls={false}
        style={{
          border: '2px solid black',
          borderRadius: '8px',
        }}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <br />
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
    </div>
  );
}

export default App;
