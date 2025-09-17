gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Detect device width early for smoother configuration
const isMobileWidth = window.matchMedia('(max-width: 990px)').matches;

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: isMobileWidth ? 1.2 : 4,  // Lighter smoothing on mobile to feel more responsive
  effects: true,                    // Enable data-speed & data-lag
});


let isShortHeight = window.screen.height < 1050;  // this is only tp make animation acccording to screen height but not requrired.. 
                                                  // you can remove or change this value according to your requrement
// console.log(window.screen.height);

ScrollTrigger.matchMedia({
  // Desktop animations (large screens)
  "(min-width: 991px)": function () {

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section2',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '85vh',
      x: '18vw',
      width: '32vw',
      rotate: 90,
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
      y: '218vh',
      x: '0',
      width: '35vw',
      rotate: 35,
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '308vh',
      width: '42vw',
      rotate: 0,
      ease: 'power1.inOut',
      immediateRender: false
    });

     gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section5',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      y: isShortHeight ? '360vh' : '344vh',
      width: '28vw',
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section5',
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: true,
      },
      y: isShortHeight ? '432vh' : '419vh',
      width: '300px',
      ease: 'power1.inOut',
      immediateRender: false
    });

    // content animation

    gsap.from('#section2 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section2',
        start: '-50% bottom',
        end: 'center center',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section3 .heading', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section4 img', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      width: 0,
      opacity: 0,
      ease: 'power1.inOut',
    });

    gsap.from('#section6 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section6',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '40%',
      duration: 2,
      ease: 'power1.inOut',
    });

    // hero section text animation
    let split = SplitText.create('#section1 .heading', {
      type: 'chars, words, lines',
      mask: 'lines'
    });

    gsap.from(split.chars, {
      yPercent: ()=> gsap.utils.random(-100, 100),
      rotation: ()=> gsap.utils.random(-30, 30),
      autoAlpha: 0,
      ease: 'back.out(1.5)',
      stagger: {
        amount: 0.5,
        from: 'random'
      },
      duration: 1.5
    });

    gsap.from('#headphone', {
      opacity: 0,
      scale: 0,
      duration: 1,
      delay: 1,
      ease: 'power1.inOut'
    })

  },

  // Mobile / tablet animations (simple & performant)
  "(max-width: 990px)": function () {
    // Intro headphone fade & slight pop
    gsap.from('#headphone', {
      opacity: 0,
      scale: 0.7,
      duration: 0.9,
      ease: 'power2.out',
      delay: 0.2
    });

    // Section reveal helpers
    const fadeUps = ['#section2 .content-wrapper', '#section3 .heading', '#section3 video', '#section3 .content', '#section4', '#section5 .heading', '#section6 .content-wrapper'];
    fadeUps.forEach(sel => {
      gsap.from(sel, {
        scrollTrigger: {
          trigger: sel,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    });

    // Product items
    gsap.utils.toArray('#section5 .product').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%'
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out'
      });
    });
  }
});

