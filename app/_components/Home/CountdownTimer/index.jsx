import dynamic from 'next/dynamic';

const Timer = dynamic(() => import('./timer'), { ssr: false });

const AWARENESS_TITLE = process.env.EVENT_TITLE || 'Awareness Session';
const TARGET_DATE = process.env.EVENT_TARGET_DATE || '2026-07-21T20:00:00';

export default function CountdownTimer() {
  return (
    <section className='py-8 sm:py-12 md:py-16 lg:py-24 px-5 sm:px-10 md:px-20 bg-transparent'>
      <div className='max-w-7xl mx-auto'>
        <div
          className='rounded-2xl sm:rounded-3xl bg-white/20 backdrop-blur-xl border border-white/40 px-4 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12'
          style={{ boxShadow: '0px 0px 18px 8px #0000001A' }}
        >
          <div className='text-center mb-6 sm:mb-8 md:mb-10 space-y-1 sm:space-y-2'>
            <h3 className='text-xs sm:text-sm md:text-base text-gray-700 font-medium tracking-wide'>
              {AWARENESS_TITLE}
            </h3>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
              Coming Soon!
            </h2>
          </div>

          <Timer targetDate={TARGET_DATE} />
        </div>
      </div>
    </section>
  );
}
