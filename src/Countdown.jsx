import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

// New Year Countdown Component
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [newYearReached, setNewYearReached] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Calculate time left for New Year
  const calculateTimeLeft = () => {
    const newYear = new Date("January 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = newYear - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 3600 * 24));
      const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setNewYearReached(true);
    }
  };

  // Update real-time clock with desired format
  const updateRealTime = () => {
    const now = new Date();
    const options = {
      weekday: "long", // "Monday"
      year: "numeric",
      month: "short", // "Jan"
      day: "numeric", // "1"
      hour: "2-digit",
      minute: "2-digit",
      second: '2-digit',
      hour12: true, // 12-hour format with AM/PM
    };

    const formattedTime = now.toLocaleString("en-US", options);
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
      updateRealTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container text-center p-4">
      {newYearReached ? (
        <NewYearMessage currentTime={currentTime} />
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4 sm:text-3xl md:text-4xl">New Year Countdown</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-2xl">
            <div className="p-2 md:p-4 bg-gray-200 rounded-lg">
              <p>Days</p>
              <p className="text-3xl">{timeLeft.days}</p>
            </div>
            <div className="p-2 md:p-4 bg-gray-200 rounded-lg">
              <p>Hours</p>
              <p className="text-3xl">{timeLeft.hours}</p>
            </div>
            <div className="p-2 md:p-4 bg-gray-200 rounded-lg">
              <p>Minutes</p>
              <p className="text-3xl">{timeLeft.minutes}</p>
            </div>
            <div className="p-2 md:p-4 bg-gray-200 rounded-lg">
              <p>Seconds</p>
              <p className="text-3xl">{timeLeft.seconds}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// New Year Message Component
const NewYearMessage = ({ currentTime }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-6xl font-bold text-green-600 mb-4 fade-in">Happy New Year!</h1>
      <p className="text-2xl sm:text-3xl">Current Time: {currentTime}</p>
    </div>
  );
};

NewYearMessage.propTypes = {
  currentTime: PropTypes.string.isRequired,
};

export default Countdown;
