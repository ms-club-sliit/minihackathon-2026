'use client';

export default function Eligibility() {
  return (
    <section id="eligibility" className='w-full flex justify-center items-center py-8 sm:py-10 md:py-12 px-2'>
      <div className='w-full max-w-7xl bg-[#EFEFEF] rounded-[36px] sm:rounded-[48px] md:rounded-[64px] lg:rounded-[72px] px-2 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 flex flex-col items-center'>
        <h2
          className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#232B36] text-center mb-4 sm:mb-6 tracking-tight'
          style={{ fontFamily: 'inherit' }}
        >
          Who Can Participate ?
        </h2>
        <p className='text-base xs:text-lg sm:text-xl md:text-2xl text-[#495366] text-center max-w-2xl sm:max-w-3xl mb-6 sm:mb-10 md:mb-12 font-medium'>
          Open to Students of Sri Lanka Institute of Information Technology
          (SLIIT)
          <br />
          from the following batches.
        </p>
        <div className='flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 w-full justify-center items-center'>
          <div
            className='bg-[#162B36] text-white text-base xs:text-lg sm:text-xl font-extrabold px-4 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-2xl min-w-[220px] xs:min-w-[260px] sm:min-w-[280px] md:min-w-[320px] text-center'
            style={{ fontFamily: 'inherit' }}
          >
            All 1st Year Students
          </div>
          <div
            className='bg-[#162B36] text-white text-base xs:text-lg sm:text-xl font-extrabold px-4 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-2xl min-w-[220px] xs:min-w-[260px] sm:min-w-[280px] md:min-w-[320px] text-center'
            style={{ fontFamily: 'inherit' }}
          >
            All 2nd Year Students
          </div>
          <div
            className='bg-[#162B36] text-white text-base xs:text-lg sm:text-xl font-extrabold px-4 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-2xl min-w-[240px] xs:min-w-[300px] sm:min-w-[320px] md:min-w-[370px] text-center'
            style={{ fontFamily: 'inherit' }}
          >
            All 3rd Year 1st Semester Students
          </div>
        </div>
      </div>
    </section>
  );
}
