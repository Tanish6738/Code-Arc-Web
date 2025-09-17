"use client";
import Section1 from '@/Sections/Section1';
import Section2 from '@/Sections/Section2';
import Section3 from '@/Sections/Section3';
import React, { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/utils/gsap';
import Image from 'next/image';
import Section4 from '@/Sections/Section4';
import Section5 from '@/Sections/Section5';

// Ensure plugin registered (safety in case utils changes later)
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    // Guard for environments without window (shouldn't run on server because of "use client")
    if (typeof window === 'undefined') return;

    const isShortHeight = window.screen.height < 1050;
    const mm = gsap.matchMedia();

    // Desktop / large screens
    mm.add('(min-width: 991px)', () => {
      // Intro animation
      gsap.from('#box', {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power1.inOut'
      });

      // Sequential scroll-driven transformations inspired by main.js (#headphone)
      gsap.to('#box', {
        scrollTrigger: {
          trigger: '#section2',
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
        y: '85vh',
        x: '18vw',
        rotate: 90,
        ease: 'power1.inOut',
        immediateRender: false
      });

      gsap.to('#box', {
        scrollTrigger: {
          trigger: '#section3',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
        y: '218vh',
        x: '0vw',
        rotate: 35,
        scale: 0.85,
        ease: 'power1.inOut',
        immediateRender: false
      });


    });

    // Mobile / tablet simplified animations
    mm.add('(max-width: 990px)', () => {
      gsap.from('#box', {
        opacity: 0,
        scale: 0.7,
        duration: 0.9,
        ease: 'power2.out',
        delay: 0.2
      });
    });

    return () => {
      mm.revert(); // kill all matchMedia animations & ScrollTriggers scoped to it
    };
  }, []);

  return (
    <div>
      {/* <div
        id='box'
        className='absolute w-96 h-96 rounded-3xl bg-red-500 shadow flex justify-center items-center z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
      >
        <Image 
          src={"/headphone.avif"}
          alt="Decorative"
          className='w-full h-full object-cover rounded-3xl'
          fill
          
        />

      </div> */}

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Page;