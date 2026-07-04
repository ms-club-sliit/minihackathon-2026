// import Timer from './timer'

import dynamic from 'next/dynamic';
const Timer = dynamic(() => import('./timer'), {
  ssr: false,
});

const AWARENESS_TITLE =
  process.env.EVENT_TITLE || 'Awareness Session';
const TARGET_DATE =
  process.env.EVENT_TARGET_DATE || '2025-10-01T17:00:00';

export default function CountdownTimer() {
  return (
    <section className='py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 relative'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
        {/* Header Section - Mobile Optimized */}
        <div className='text-center mb-8 sm:mb-10 md:mb-12 lg:mb-8'>
          {/* Typography Section - Mobile First */}
          <div className='space-y-2 sm:space-y-3 md:space-y-4'>
            <h3 className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium tracking-wide'>
              {AWARENESS_TITLE}
            </h3>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-gray-900 leading-tight px-2 sm:px-0'>
              Coming Soon!
            </h2>
          </div>
        </div>

        {/* Timer Container - Mobile Optimized */}
        <div className='relative'>
          {/* Background Decorative Elements - Scaled for Mobile */}
          <div className='absolute inset-0 -z-10'>
            <div className='absolute top-0 left-1/4 w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#EF4A23]/5 to-transparent rounded-full blur-2xl sm:blur-3xl'></div>
            <div className='absolute bottom-0 right-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 bg-gradient-to-tl from-red-400/5 to-transparent rounded-full blur-2xl sm:blur-3xl'></div>
          </div>

          {/* Timer Wrapper - Mobile First Design */}
          <div className='relative bg-transparent p-4 sm:p-6 md:p-8 lg:p-12 mx-2 sm:mx-0'>
            {/* Inner Container */}
            <div className='relative z-10'>
              <Timer targetDate={TARGET_DATE} />
            </div>

            {/* Decorative Corner Elements - Mobile Scaled */}
            <div className='absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-[#EF4A23]/20 to-transparent rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl lg:rounded-tl-[2rem]'></div>

            {/* Subtle Inner Glow */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#EF4A23]/3 via-transparent to-red-500/3 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2rem] pointer-events-none'></div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements - Mobile Safe Positioning */}
      <div className='absolute top-12 sm:top-16 left-4 sm:left-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#EF4A23]/30 rounded-full animate-bounce'></div>
      <div className='absolute top-16 sm:top-24 right-6 sm:right-12 w-1 h-1 bg-red-400/40 rounded-full animate-pulse delay-300'></div>
      <div className='absolute bottom-16 sm:bottom-20 left-8 sm:left-16 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400/30 rounded-full animate-ping delay-700'></div>
      <div className='absolute bottom-20 sm:bottom-32 right-10 sm:right-20 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#EF4A23]/50 rounded-full animate-pulse delay-1000'></div>
    </section>
  );
}
