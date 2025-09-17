# ScrollTrigger & GSAP Animation Guide

A practical, repeatable system for building cinematic scroll journeys like the headphone demo in this project.

---
## 1. Overview
This guide shows you how to structure, plan, and implement GSAP + ScrollTrigger (+ ScrollSmoother + SplitText) animations that connect narrative sections with a persistent hero element.

You will learn:
- How to *plan* a scroll narrative (story beats → keyframes → triggers)
- Core GSAP + ScrollTrigger building blocks
- Desktop (cinematic) vs Mobile (performant) strategy
- Keyframe journey pattern for a persistent element
- Debugging, performance, accessibility, and enhancement patterns
- A reusable “prompt template” for ideation or AI-assisted generation

---
## 2. Prerequisites
Include the following (CDN or bundled):
```html
<script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/ScrollSmoother.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/SplitText.min.js"></script>
```
Register plugins once:
```js
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
```

---
## 3. Minimum DOM / Layout Skeleton
```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <section id="section1" class="panel hero">
      <h1 class="heading">Immersive Audio</h1>
      <img id="headphone" src="images/black.png" alt="Headphone" />
    </section>
    <section id="section2" class="panel">...</section>
    <section id="section3" class="panel">...</section>
    <section id="section4" class="panel">...</section>
    <section id="section5" class="panel">...</section>
    <section id="section6" class="panel">...</section>
  </div>
</div>
```
CSS essentials:
```css
html, body { margin:0; padding:0; }
.panel { min-height:100vh; position:relative; }
#headphone { position:absolute; top:10vh; left:50%; transform:translateX(-50%); will-change:transform; }
```

---
## 4. Core Concepts (Quick Mental Models)
**GSAP Tween:** `gsap.to(target, { duration, props })` or `gsap.from()` for entrance.

**ScrollTrigger Anatomy:**
```js
scrollTrigger: {
  trigger: '#section2',     // Element controlling scroll region
  start: 'top bottom',      // When trigger's top hits viewport bottom
  end: 'center center',     // When trigger's center hits viewport center
  scrub: true,              // Tie progress to scroll position
  markers: false            // Set to true while debugging
}
```
`start` / `end` pair defines a *progress window*. The tween interpolates across that window.

**ScrollSmoother:** Adds inertial smoothness + optional parallax with `data-speed` and `data-lag` attributes.
```js
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 4,          // Larger = more glide
  effects: true       // Enables data-speed / data-lag
});
```

**SplitText:** Splits a heading into characters/words/lines for granular animation.
```js
const split = SplitText.create('.hero .heading', { type: 'chars, words, lines', mask: 'lines' });
gsap.from(split.chars, { autoAlpha:0, yPercent: gsap.utils.distribute({ base: -80, amount: 160 }), stagger: 0.02 });
```

---
## 5. Planning Workflow (Story → Motion)
1. Define Story Beats: What should user learn/feel each section?
2. Persistent Element? (e.g., `#headphone`) – list transformations per section.
3. Keyframe Table (example):
   | Section | y | x | width | rotate | Note |
   |---------|---|---|-------|--------|------|
   | 2 | 85vh | 18vw | 32vw | 90 | Turn profile |
   | 3 | 218vh | 0 | 35vw | 35 | Transition |
   | 4 | 308vh | 0 | 42vw | 0 | Frontal reveal |
   | 5a | 344vh | 0 | 28vw | 0 | Shrink for products |
   | 5b | 419vh | 0 | 300px | 0 | Final compact |
4. Decide Desktop vs Mobile patterns.
5. List secondary reveals (headings, paragraphs, media, product cards).
6. Decide if you’ll use individual tweens or a timeline (timeline easier to reorder later).
7. Add enhancements: parallax, random char entrances, subtle fades.

---
## 6. Responsive Strategy (`matchMedia`)
```js
ScrollTrigger.matchMedia({
  '(min-width: 991px)': setupDesktop,
  '(max-width: 990px)': setupMobile
});
```
Each function encapsulates its own animation registrations. ScrollTrigger automatically cleans up when media query changes (hot-resize scenario).

---
## 7. Keyframe Journey Pattern (Independent Tweens)
Each section becomes a scroll-progress interval for *the same element*.
```js
function setupDesktop() {
  const headphone = '#headphone';

  gsap.to(headphone, { scrollTrigger: { trigger:'#section2', start:'top bottom', end:'center center', scrub:true }, y:'85vh', x:'18vw', width:'32vw', rotate:90, ease:'none', immediateRender:false });
  gsap.to(headphone, { scrollTrigger: { trigger:'#section3', start:'top bottom', end:'bottom bottom', scrub:true }, y:'218vh', x:0, width:'35vw', rotate:35, ease:'none', immediateRender:false });
  // ... more keyframes
}
```
Key Tips:
- Use `immediateRender:false` on subsequent `.to()` calls to prevent premature value application.
- Ensure continuity: The end state of one tween should match the natural start of the next.
- Use `ease:'none'` for linear scroll mapping (unless you want non-linear feel).

---
## 8. Alternative: Timeline + `containerAnimation`
For complex journeys, build a master timeline and let ScrollTrigger scrub it.
```js
function setupDesktopTimeline() {
  const tl = gsap.timeline();
  tl.to('#headphone', { y:'85vh', x:'18vw', width:'32vw', rotate:90 })
    .to('#headphone', { y:'218vh', x:0, width:'35vw', rotate:35 })
    .to('#headphone', { y:'308vh', width:'42vw', rotate:0 })
    .to('#headphone', { y:'344vh', width:'28vw' })
    .to('#headphone', { y:'419vh', width:'300px' });

  ScrollTrigger.create({
    animation: tl,
    trigger: '#smooth-content',
    start: 'top top',
    end: '+=5000',          // Adjust length of scroll needed
    scrub: true,
    pin: '#section1'        // Optionally keep hero pinned initially
  });
}
```
Pros: Centralized control, easy reordering. Cons: Harder to align with exact section boundaries unless you add labels & additional triggers.

---
## 9. Content Entrance Patterns
Typical reveal helper:
```js
function fadeUp(selector, opts={}) {
  gsap.utils.toArray(selector).forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions:'play none none reverse' },
      y: 60,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      ...opts
    });
  });
}
```
Usage:
```js
fadeUp('#section2 .content-wrapper');
fadeUp('#section3 .heading, #section3 .content, #section3 video');
```

---
## 10. Text Split Animation Example
```js
function heroTextIntro() {
  const split = SplitText.create('#section1 .heading', { type:'chars, words, lines', mask:'lines' });
  gsap.from(split.chars, {
    yPercent: () => gsap.utils.random(-100, 100),
    rotation: () => gsap.utils.random(-30, 30),
    autoAlpha: 0,
    ease: 'back.out(1.5)',
    stagger: { amount:0.5, from:'random' },
    duration: 1.5
  });
}
```

---
## 11. ScrollSmoother Parallax Enhancement
```html
<div class="bg-mountain" data-speed="0.6"></div>
<div class="fg-particles" data-speed="1.4" data-lag="0.2"></div>
```
- `data-speed < 1` moves slower than scroll (farther back).
- `data-speed > 1` moves faster (closer / foreground energy).
- `data-lag` adds easing delay for floaty feel.

---
## 12. Performance & Optimization
| Concern | Action |
|---------|--------|
| Jank on mobile | Lower `smooth`, reduce simultaneous tweens |
| Layout thrash | Only animate `transform` & `opacity` |
| Large images | Use compressed/webp & `loading="lazy"` |
| Too many DOM reads | Batch creation of triggers inside functions |
| Excess triggers | Combine selectors where possible |

Checklist:
- Test with Chrome Performance panel.
- Simulate low-end device throttling.
- Use `ScrollTrigger.getAll().length` to audit trigger count.

---
## 13. Accessibility & Reduced Motion
Respect prefers-reduced-motion:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  // Skip complex animations
  gsap.set('#headphone', { clearProps:'all' });
  // Provide immediate visibility to content
}
```
Also:
- Keep content readable without animation.
- Avoid critical info being only visible mid-animation.

---
## 14. Debugging & Troubleshooting
| Symptom | Fix |
|---------|-----|
| Animation starts too early | Adjust `start` to later (e.g., `top 80%`) |
| Jump between keyframes | Ensure end of previous matches natural start state of next |
| Wrong scroll positions with smooth scroll | Initialize ScrollSmoother before creating triggers |
| Hero flickers on load | Give stable initial CSS (position, size) before JS runs |
| Overlapping triggers conflicting | Use `id` option in ScrollTrigger and inspect via `ScrollTrigger.getById(id)` |

Add markers while tuning:
```js
ScrollTrigger.config({ ignoreMobileResize: true });
// then inside individual triggers: markers: true
```

---
## 15. Production Checklist
- [ ] All triggers tested with `markers:true` once
- [ ] Remove debug markers
- [ ] Responsive breakpoints verified (resize after load)
- [ ] Reduced motion respected
- [ ] Core path (scroll quickly / slowly) stays coherent
- [ ] No console errors / plugin missing warnings

---
## 16. Advanced Enhancements
| Feature | Idea |
|---------|------|
| Auto timeline length | Dynamically compute end distance based on number of stages |
| Scroll-driven audio | Map `currentTime` of an Audio element to scroll progress |
| Lottie integration | Use `onUpdate` to drive Lottie frame via ScrollTrigger progress |
| Section pinning | Pin hero or text while other content scrolls past (`pin:true`) |
| Dynamic keyframes | Compute positions based on viewport height for better scaling |

Dynamic keyframe example:
```js
const vh = (v) => window.innerHeight * (v/100);
const stages = [
  { y: () => vh(85), rotate:90 },
  { y: () => vh(218), rotate:35 },
];
stages.forEach((stg, i) => {
  gsap.to('#headphone', {
    scrollTrigger: { trigger:`#section${i+2}`, start:'top bottom', end:'center center', scrub:true },
    ...stg,
    immediateRender:false
  });
});
```

---
## 17. Reusable Initialization Template
```js
// 1. Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// 2. Smooth scroll (desktop intensity vs mobile)
const isMobile = window.matchMedia('(max-width: 990px)').matches;
ScrollSmoother.create({ wrapper:'#smooth-wrapper', content:'#smooth-content', smooth: isMobile ? 1.2 : 4, effects:true });

// 3. Media-based setups
ScrollTrigger.matchMedia({
  '(min-width: 991px)': () => { setupDesktop(); heroTextIntro(); },
  '(max-width: 990px)': () => { setupMobile(); }
});
```

---
## 18. Prompt Template (For Ideation / AI)
Use this prompt to generate a new set of similar animations:
```
I have a multi-section scrolling webpage with IDs: #section1 ... #sectionN and a persistent hero element #hero.
I want a GSAP + ScrollTrigger animation system with:
- ScrollSmoother initialization
- A keyframe journey for #hero across sections (provide y/x/scale/rotate per section)
- Desktop cinematic (scrubbed) and simpler mobile fade/slide reveals
- SplitText hero heading entrance (organic stagger)
- Helper function for repeated fade-up reveals
- Accessible prefers-reduced-motion fallback
Return: Organized code with functions: setupDesktop(), setupMobile(), heroTextIntro(), plus comments.
```

---
## 19. Putting It All Together (Concise Example)
```js
// init
const isMobile = matchMedia('(max-width: 990px)').matches;
ScrollSmoother.create({ wrapper:'#smooth-wrapper', content:'#smooth-content', smooth:isMobile?1.2:4, effects:true });

ScrollTrigger.matchMedia({
  '(min-width: 991px)': () => {
    const headphone = '#headphone';
    const frames = [
      { trigger:'#section2', props:{ y:'85vh', x:'18vw', width:'32vw', rotate:90 } },
      { trigger:'#section3', props:{ y:'218vh', x:0, width:'35vw', rotate:35 } },
      { trigger:'#section4', props:{ y:'308vh', width:'42vw', rotate:0 } },
      { trigger:'#section5', props:{ y:'344vh', width:'28vw' } },
      { trigger:'#section5', start:'center bottom', end:'bottom bottom', props:{ y:'419vh', width:'300px' } }
    ];
    frames.forEach(f => {
      gsap.to(headphone, {
        scrollTrigger: { trigger:f.trigger, start:f.start||'top bottom', end:f.end||'center center', scrub:true },
        ease:'power1.inOut',
        immediateRender:false,
        ...f.props
      });
    });
    heroTextIntro();
    fadeUp('#section2 .content-wrapper');
  },
  '(max-width: 990px)': () => {
    fadeUp('#section2 .content-wrapper, #section3 .heading, #section3 video, #section3 .content, #section4, #section5 .heading, #section6 .content-wrapper');
    gsap.from('#headphone', { opacity:0, scale:0.7, duration:0.9, ease:'power2.out', delay:0.2 });
  }
});

function fadeUp(sel) {
  gsap.utils.toArray(sel).forEach(el => {
    gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 85%', toggleActions:'play none none reverse' }, y:60, autoAlpha:0, duration:0.7, ease:'power2.out' });
  });
}

function heroTextIntro() {
  const split = SplitText.create('#section1 .heading', { type:'chars, words, lines', mask:'lines' });
  gsap.from(split.chars, { yPercent:() => gsap.utils.random(-100,100), rotation:() => gsap.utils.random(-30,30), autoAlpha:0, ease:'back.out(1.5)', stagger:{ amount:0.5, from:'random' }, duration:1.5 });
}
```

---
## 20. Next Steps (Optional Ideas)
- Convert keyframes into data attributes (declarative config).
- Add GSAP ScrollTrigger batch for lists.
- Integrate IntersectionObserver fallback if JS disabled.
- Use TypeScript definitions for stronger editor hints.

---
**End of Guide**

Feel free to adapt and expand. This markdown is meant to be a living reference—add project-specific conventions as they emerge.
