'use client';
import { useState, useEffect } from 'react';

export default function Timer({ targetDate }) {
  const parsedTargetDate = new Date(targetDate);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = parsedTargetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;

  const circleColors = {
    Days: '#22c55e',
    Hours: '#ef4444',
    Mins: '#fbbf24',
    Sec: '#3b82f6',
  };

  const createCircle = (value, max, label) => {
    const radius = 38;
    const mdRadius = 50;
    const lgRadius = 70;

    const color = circleColors[label];
    return (
      <div className='flex flex-col items-center overflow-visible'>
        {/* Mobile */}
        <div className='relative w-24 h-24 sm:hidden overflow-visible'>
          <svg className='w-full h-full' viewBox='-7 -7 94 94'>
            <circle
              cx='40'
              cy='40'
              r={radius}
              stroke='#e5e7eb'
              strokeWidth='7'
              fill='none'
            />
            <circle
              cx='40'
              cy='40'
              r={radius}
              stroke={color}
              strokeWidth='7'
              fill='none'
              strokeDasharray={2 * Math.PI * radius}
              strokeDashoffset={(1 - value / max) * 2 * Math.PI * radius}
              strokeLinecap='round'
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-xs font-semibold text-gray-500 mb-1'>
              {label}
            </span>
            <span className='text-2xl font-extrabold text-gray-700'>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Tablet */}
        <div className='relative w-32 h-32 hidden sm:block md:hidden overflow-visible'>
          <svg className='w-full h-full' viewBox='-8 -8 116 116'>
            <circle
              cx='50'
              cy='50'
              r={mdRadius}
              stroke='#e5e7eb'
              strokeWidth='8'
              fill='none'
            />
            <circle
              cx='50'
              cy='50'
              r={mdRadius}
              stroke={color}
              strokeWidth='8'
              fill='none'
              strokeDasharray={2 * Math.PI * mdRadius}
              strokeDashoffset={(1 - value / max) * 2 * Math.PI * mdRadius}
              strokeLinecap='round'
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-base font-semibold text-gray-500 mb-1'>
              {label}
            </span>
            <span className='text-3xl font-extrabold text-gray-700'>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Desktop */}
        <div className='relative w-40 h-40 hidden md:block overflow-visible'>
          <svg className='w-full h-full' viewBox='-10 -10 160 160'>
            <circle
              cx='70'
              cy='70'
              r={lgRadius}
              stroke='#e5e7eb'
              strokeWidth='10'
              fill='none'
            />
            <circle
              cx='70'
              cy='70'
              r={lgRadius}
              stroke={color}
              strokeWidth='10'
              fill='none'
              strokeDasharray={2 * Math.PI * lgRadius}
              strokeDashoffset={(1 - value / max) * 2 * Math.PI * lgRadius}
              strokeLinecap='round'
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-xl font-semibold text-gray-500 mb-2'>
              {label}
            </span>
            <span className='text-5xl font-extrabold text-gray-700'>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-2 w-full'>
        {createCircle(days, 60, 'Days')}
        {createCircle(hours, 60, 'Hours')}
        {createCircle(minutes, 60, 'Mins')}
        {createCircle(seconds, 60, 'Sec')}
      </div>
    </div>
  );
}
