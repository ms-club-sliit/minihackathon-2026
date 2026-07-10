'use client';
import { useState, useEffect } from 'react';

const GRADIENTS = {
  Days: { id: 'daysGradient', from: '#1E2A78', to: '#3B5CFF' },
  Hours: { id: 'hoursGradient', from: '#2D1B4E', to: '#8B5CF6' },
  Mins: { id: 'minsGradient', from: '#A61B79', to: '#E91E96' },
  Secs: { id: 'secsGradient', from: '#EC1FA0', to: '#FF6EC7' },
};

const MAX_VALUES = {
  Days: 99,
  Hours: 24,
  Mins: 60,
  Secs: 60,
};

const RADIUS = 45;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function calculateTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimerRing({ value, label }) {
  const max = MAX_VALUES[label];
  const gradient = GRADIENTS[label];
  const offset = (1 - value / max) * CIRCUMFERENCE;

  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40'>
        <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
          <defs>
            <linearGradient id={gradient.id} x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor={gradient.from} />
              <stop offset='100%' stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <circle
            cx='50'
            cy='50'
            r={RADIUS}
            stroke='#e5e7eb'
            strokeWidth={STROKE_WIDTH}
            fill='none'
          />
          <circle
            cx='50'
            cy='50'
            r={RADIUS}
            stroke={`url(#${gradient.id})`}
            strokeWidth={STROKE_WIDTH}
            fill='none'
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap='round'
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-xs sm:text-base md:text-lg font-bold text-gray-900 mb-1'>
            {label}
          </span>
          <span className='text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900'>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Timer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8'>
      {units.map((unit) => (
        <TimerRing key={unit.label} value={unit.value} label={unit.label} />
      ))}
    </div>
  );
}