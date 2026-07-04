"use client";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

const socialMedia = [
  {
    src: "/images/logos/Facebook.png",
    alt: "Facebook",
    link: "https://www.facebook.com/msclubsliit/",
  },
  {
    src: "/images/logos/Instagram.png",
    alt: "Instagram",
    link: "https://www.instagram.com/msclub.sliit/",
  },
  {
    src: "/images/logos/youtube.png",
    alt: "YT",
    link: "https://www.youtube.com/@msclubofsliit/",
  },
  {
    src: "/images/logos/linkedin.png",
    alt: "Linkedin",
    link: "https://www.linkedin.com/company/msclubsliit/",
  },
  {
    src: "/images/logos/GitHub.png",
    alt: "GitHub",
    link: "https://github.com/ms-club-sliit/",
  },
];

const navItems = [
  { name: "Home", link: "/" },
  { name: "Eligibility", link: "/#eligibility" },
  { name: "Timeline", link: "/#timeline" },
  { name: "Gallery", link: "/#gallery" },
  { name: "Rules", link: "/rules" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Helper function to clean up blur effects
  const cleanupBlurEffects = () => {
    document.body.style.overflow = 'unset';
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach((child) => {
      child.style.filter = 'none';
      child.style.pointerEvents = 'auto';
    });
  };

  // Apply blur effect to page content when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      // Add blur to all direct children of body except our mobile menu
      const bodyChildren = Array.from(document.body.children);
      bodyChildren.forEach((child) => {
        if (!child.querySelector('[data-mobile-menu]')) {
          child.style.filter = 'blur(20px)';
          child.style.pointerEvents = 'none';
        }
      });
    } else {
      cleanupBlurEffects();
    }

    return () => {
      cleanupBlurEffects();
    };
  }, [menuOpen]);

  // Handle window resize to clean up blur effects when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      // Check if we're in desktop view (lg breakpoint is 1024px in Tailwind)
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false); // This will trigger the cleanup via the previous useEffect
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <main className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/images/2025-images/logo-main-2025.png"
                alt="MS Club SLIIT"
                width={200}
                height={60}
                className="h-12 w-auto sm:h-14 lg:h-16 transition-transform duration-200 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Navigation Section - Center */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="relative text-base font-medium text-gray-700 hover:text-[#EF4A23] transition-colors duration-200 group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EF4A23] transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media & Mobile Menu - Right */}
          <div className="flex items-center space-x-4">
            
            {/* Social Media Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {socialMedia.map((social, index) => (
                <Link 
                  href={social.link} 
                  key={index}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={handleNav}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#EF4A23]/20 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <Image
                  src="/images/icons/menu.png"
                  alt="Menu"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white lg:hidden transition-all duration-300 z-[100] ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        data-mobile-menu
      >
        <div className="flex flex-col h-full">
          
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/images/2025-images/logo-main-2025.png"
                alt="MS Club SLIIT"
                width={150}
                height={45}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <button
              onClick={handleNav}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#EF4A23]/20 transition-colors duration-200"
              aria-label="Close menu"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 px-6 py-8">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="block text-xl font-medium text-gray-700 hover:text-[#EF4A23] transition-colors duration-200 py-2"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Mobile Social Media */}
          <div className="px-6 py-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-4">Follow Us</p>
            <div className="flex items-center space-x-4">
              {socialMedia.map((social, index) => (
                <Link 
                  href={social.link} 
                  key={index} 
                  onClick={closeMenu}
                  className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}