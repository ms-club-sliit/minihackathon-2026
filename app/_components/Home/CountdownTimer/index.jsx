import dynamic from 'next/dynamic';

const Timer = dynamic(() => import('./timer'), { ssr: false });

const AWARENESS_TITLE = process.env.EVENT_TITLE || 'Awareness Session';
const TARGET_DATE = process.env.EVENT_TARGET_DATE || '2026-08-15T17:00:00';

export default function CountdownTimer() {
  return (
    <section className='py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
        <div
          className='rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-100 border-2 border-blue-100/70 px-4 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12'
          style={{
            background: 'linear-gradient(to right, #FFFFFF 0%, #EAFBFF 40%, #CFF5FF 70%, #B8F0FF 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div className='text-center mb-6 sm:mb-8 md:mb-10 space-y-0'>
            <h3 className='text-2xl sm:text-sm md:text-base text-gray-700 font-medium tracking-wide'>
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