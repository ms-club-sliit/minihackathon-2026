'use client';
import Image from 'next/image';
import Link from 'next/link';

const MSLogs = [
  {
    src: '/images/logos/MSLogo.png',
    alt: 'MS Club Of SLIIT',
    link: 'https://msclubsliit.org',
    width: 80,
    height: 120,
  },
  {
    src: '/images/logos/MLSALogo.png',
    alt: 'MLSA Logo',
    link: 'https://studentambassadors.microsoft.com',
    width: 50,
    height: 50,
  },
];

const FCSCLogo = {
  src: '/images/logos/FCSCLogo.png',
  alt: 'FCSC LOGO',
  link: 'https://www.facebook.com/sliit.fcsc',
  width: 80,
  height: 120,
};

export default function Footer() {
  return (
    <footer className='bg-white py-8 shadow-md'>
      <hr className='my-6 border-gray-300' />
      <div className='container mx-auto px-4 lg:px-24 flex flex-col lg:flex-row sm:gap-5 justify-between items-center'>
        {/* MS Logos */}
        <div className='flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-0 lg:ml-16'>
          {MSLogs.map((logo, index) => (
            <Link href={logo.link} key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className='cursor-pointer'
              />
            </Link>
          ))}
        </div>
        {/* Copyright text */}
        <div className='text-center text-sm text-gray-700 mb-4 sm:mb-0 mx-10 lg:mx-0'>
          Copyright &copy; 2025&nbsp;
          <a href='https://msclubsliit.org' className='hover:underline'>
            MS Club of SLIIT
          </a>
          . All Rights Reserved.
        </div>
        {/* FCSC Logo */}
        <div className='flex items-center lg:mr-16'>
          <Link href={FCSCLogo.link}>
            <Image
              src={FCSCLogo.src}
              alt={FCSCLogo.alt}
              width={FCSCLogo.width}
              height={FCSCLogo.height}
              className='cursor-pointer'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
