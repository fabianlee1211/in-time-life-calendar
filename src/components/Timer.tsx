import classNames from 'classnames';
import React, { useState } from 'react';

export default function Timer() {
  const [counts, setCounts] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % counts.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-6xl text-center text-gray-600 relative">
        {counts.map((count, index) => (
          <span
            key={count}
            className={classNames(
              'absolute top-0 left-0 transition opacity-0 duration-700',
              {
                'opacity-100': index === currentIndex,
                'opacity-0': index !== currentIndex
              }
            )}
          >
            {count.toString().padStart(2, '0')}
          </span>
        ))}
      </div>
    </div>
  );
}
