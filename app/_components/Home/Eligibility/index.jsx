'use client';

export default function Eligibility () {
  return (
    <section
      id="eligibility"
      className="w-full flex justify-center items-center py-8 sm:py-10 md:py-12 px-5 sm:px-10 md:px-20 bg-gradient-to-r from-red-50 to-[#bbf5fd]"
    >
      <div
        className="w-full max-w-7xl bg-[#EFEFEF] backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-[16px] sm:rounded-[24px] md:rounded-[36px] lg:rounded-[48px] 
      px-2 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 flex flex-col items-center"
        style={{boxShadow: '0px 0px 18px 8px #0000001A'}}
      >
        <h2
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-black text-center mb-4 sm:mb-6 tracking-tight"
          style={{fontFamily: 'inherit'}}
        >
          Who Can Participate ?
        </h2>
        <p
          style={{fontFamily: 'inherit'}}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-black font-semibold text-center max-w-2xl sm:max-w-4xl mb-6 sm:mb-10 md:mb-12"
        >
          Open to Students of Sri Lanka Institute of Information Technology (SLIIT) from the following batches.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 w-full justify-center items-center">
          <div
            className="bg-[#2E47FF] text-white text-base xs:text-sm sm:text-md md:text-lg font-extrabold px-6 sm:px-2 py-3 sm:py-3 rounded-2xl min-w-[180px] xs:min-w-[220px] sm:min-w-[240px] md:min-w-[260px] text-center hover:cursor-pointer"
            style={{fontFamily: 'inherit'}}
          >
            All First Year Students
          </div>
          <div
            className="bg-[#2E47FF] text-white text-base xs:text-sm sm:text-md md:text-lg font-extrabold px-6 sm:px-2 py-3 sm:py-3 rounded-2xl min-w-[180px] xs:min-w-[220px] sm:min-w-[260px] md:min-w-[280px] text-center hover:cursor-pointer"
            style={{fontFamily: 'inherit'}}
          >
            All Second Year Students
          </div>
          <div
            className="bg-[#2E47FF] text-white text-base xs:text-sm sm:text-md md:text-lg font-extrabold px-6 sm:px-2 py-3 sm:py-3 rounded-2xl min-w-[240px] xs:min-w-[300px] sm:min-w-[320px] md:min-w-[360px] text-center hover:cursor-pointer"
            style={{fontFamily: 'inherit'}}
          >
            All 3rd Year 1st Semester Students
          </div>
        </div>
      </div>
    </section>
  );
}
