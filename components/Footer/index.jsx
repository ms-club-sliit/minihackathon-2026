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
    src: '/images/2026-images/logo-main-2026.png',
    alt: 'MS Club Of SLIIT',
    link: '/',
    width: 90,
    height: 135,
  }
];

const FCSCLogo = [{
  src: '/images/logos/FCSCLogo.png',
  alt: 'FCSC LOGO',
  link: 'https://www.facebook.com/sliit.fcsc',
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
]



export default function Footer() {
  return (
    <footer className='py-8 bg-white shadow-md'>
      <hr className='my-6 border-gray-300' />
      <div className='container flex flex-col items-center justify-between px-4 mx-auto lg:px-24 lg:flex-row sm:gap-50'>
        {/* MS Logos */}
        <div className='flex items-center mb-4 space-x-4 sm:space-x-6 sm:mb-0 lg:ml-16'>
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
        <div className='mx-10 mb-4 text-sm text-center text-gray-700 sm:mb-0 lg:mx-0'>
          Copyright &copy; 2026&nbsp;
          <a href='https://msclubsliit.org' className='hover:underline'>
            MS Club of SLIIT
          </a>
          . All Rights Reserved.
        </div>

        {/* FCSC Logo */}
        <div className='flex items-center gap-8 lg:mr-16'>
          {FCSCLogo.map((logo, index) => (
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
      </div>
    </footer>
  );
}
