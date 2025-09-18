"use client";
import Section1 from "@/Sections/Section1";
import Section2 from "@/Sections/Section2";
import Section3 from "@/Sections/Section3";
import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import Image from "next/image";
import Section4 from "@/Sections/Section4";
import Section5 from "@/Sections/Section5";

// Ensure plugin registered (safety in case utils changes later)
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    // Animate the 4 corner boxes into a centered inline row while scrolling
    // Hold references to refresh handlers so we can remove listeners on cleanup
    let refreshPositionsRef;
    let refreshPositions5Ref;
    let refreshPositions4Ref;

    const ctx = gsap.context(() => {
      const boxes = ["#box-tl", "#box-tr", "#box-bl", "#box-br"];

      // Ensure elements exist before creating ScrollTrigger
      if (!boxes.every((sel) => document.querySelector(sel))) return;

      // Compute base center position
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;

      // Box size should match Tailwind w-72 h-72 (18rem). We'll compute offsets via transform.
      const boxWidth = 18 * 16; // 18rem * 16px
      const gap = 16; // 1rem gap between boxes

      // Total width of 4 boxes + 3 gaps
      const totalWidth = 4 * boxWidth + 3 * gap;

      // x positions so the group is centered horizontally
      const calcXPositions = () => {
        const startX = (vw() - totalWidth) / 2;
        return [
          startX + 0 * (boxWidth + gap),
          startX + 1 * (boxWidth + gap),
          startX + 2 * (boxWidth + gap),
          startX + 3 * (boxWidth + gap),
        ];
      };

      const centerY = () => (vh() - boxWidth) / 2; // Place row vertically centered

      const tl = gsap.timeline({
        defaults: { ease: "Power1.ease" },
        scrollTrigger: {
          trigger: "#section2",
          // Start when Section 3 bottom crosses 50% of viewport
          start: "#section3 bottom+=0 50%",
          // End when Section 4 top reaches 50% of viewport
          end: "top 50%",
          scrub: true,
          // markers: true, // uncomment for debug
          invalidateOnRefresh: true,
          // pin: false, // we don't pin; we just tween progress within the range
        },
      });

      const applyToBox = (selector, x, y) => {
        tl.to(
          selector,
          {
            x: () =>
              x - document.querySelector(selector).getBoundingClientRect().left,
            y: () =>
              y - document.querySelector(selector).getBoundingClientRect().top,
          },
          0
        );
      };

      const refreshPositions = () => {
        const [x1, x2, x3, x4] = calcXPositions();
        const y = centerY();
        tl.clear();
        // Rebuild timeline with current measurements
        applyToBox("#box-tl", x1, y);
        applyToBox("#box-tr", x2, y);
        applyToBox("#box-bl", x3, y);
        applyToBox("#box-br", x4, y);
      };

      refreshPositions();
      // Recompute on resize/refresh
      ScrollTrigger.addEventListener("refreshInit", refreshPositions);
      window.addEventListener("resize", ScrollTrigger.refresh);
      refreshPositionsRef = refreshPositions;

      // Section 3: arrange boxes into a centered 2x2 grid
      const tl5 = gsap.timeline({
        defaults: { ease: "Power1.ease" },
        scrollTrigger: {
          trigger: "#section3",
          // Continue from mid-entry of Section 5 for a smooth handoff
          start: "top 50%",
          // Finish exactly when Section 5 bottom reaches viewport bottom
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      // Compute 2x2 grid positions right-aligned in the viewport (no scale change)
      const calc2x2Positions = () => {
        // Use current rendered size to respect any prior transforms
        const ref = document.querySelector("#box-tl");
        const sw = ref ? ref.getBoundingClientRect().width : boxWidth;
        const sh = ref ? ref.getBoundingClientRect().height : boxWidth;

        const totalWidth = 2 * sw + gap;
        const totalHeight = 2 * sh + gap;
        const rightMargin = 64; // 1rem from right edge
        const startX = vw() - rightMargin - totalWidth; // right-aligned
        const startY = (vh() - totalHeight) / 2;

        return [
          // top-left, top-right, bottom-left, bottom-right
          { x: startX, y: startY },
          { x: startX + sw + gap, y: startY },
          { x: startX, y: startY + sh + gap },
          { x: startX + sw + gap, y: startY + sh + gap },
        ];
      };

      const applyToBox5 = (selector, x, y) => {
        tl5.to(
          selector,
          {
            // Use relative deltas so we transition cleanly from prior transforms
            x: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dx = x - rect.left;
              return `+=${dx}`;
            },
            y: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dy = y - rect.top;
              return `+=${dy}`;
            },
          },
          0
        );
      };

      const refreshPositions5 = () => {
        const positions = calc2x2Positions();
        tl5.clear();
        applyToBox5("#box-tl", positions[0].x, positions[0].y);
        applyToBox5("#box-tr", positions[1].x, positions[1].y);
        applyToBox5("#box-bl", positions[2].x, positions[2].y);
        applyToBox5("#box-br", positions[3].x, positions[3].y);
      };

      refreshPositions5();
      ScrollTrigger.addEventListener("refreshInit", refreshPositions5);
      refreshPositions5Ref = refreshPositions5;

      // Ensure the animation doesn't continue past Section 4 by scoping to the ScrollTrigger range only
      // The scrubbed tween only progresses between start and end; outside range it's clamped by ScrollTrigger.

      // Section 4: scale to 50% and arrange in a 1-2-1 grid (top center, middle left/right, bottom center)
      const tl4 = gsap.timeline({
        defaults: { ease: "Power1.ease" },
        scrollTrigger: {
          trigger: "#section4",
          start: "top 50%",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      const scaleTarget = 0.5; // 50% of original size

      const calcGridPositions = () => {
        const sw = boxWidth * scaleTarget; // scaled width/height since boxes are squares
        const columnGap = gap;
        const totalHeight = 3 * sw + 2 * gap; // three rows with two gaps
        const startY = (vh() - totalHeight) / 2;

        const topY = startY;
        const middleY = startY + sw + gap;
        const bottomY = startY + 2 * (sw + gap);

        // Single centered box x for top/bottom rows
        const centerX = (vw() - sw) / 2;

        // Two-box centered row
        const totalMiddleWidth = 2 * sw + columnGap;
        const middleStartX = (vw() - totalMiddleWidth) / 2;

        return {
          topCenter: { x: centerX, y: topY },
          middleLeft: { x: middleStartX, y: middleY },
          middleRight: { x: middleStartX + sw + columnGap, y: middleY },
          bottomCenter: { x: centerX, y: bottomY },
        };
      };

      const applyToBox4 = (selector, x, y) => {
        tl4.to(
          selector,
          {
            x: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dx = x - rect.left;
              return `+=${dx}`;
            },
            y: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dy = y - rect.top;
              return `+=${dy}`;
            },
            scale: scaleTarget,
            transformOrigin: "top left",
          },
          0
        );
      };

      const refreshPositions4 = () => {
        const grid = calcGridPositions();
        tl4.clear();
        // Map boxes to 1-2-1: topCenter, middleLeft/middleRight, bottomCenter
        applyToBox4("#box-tl", grid.topCenter.x, grid.topCenter.y);
        applyToBox4("#box-tr", grid.middleLeft.x, grid.middleLeft.y);
        applyToBox4("#box-bl", grid.middleRight.x, grid.middleRight.y);
        applyToBox4("#box-br", grid.bottomCenter.x, grid.bottomCenter.y);
      };

      refreshPositions4();
      ScrollTrigger.addEventListener("refreshInit", refreshPositions4);
      refreshPositions4Ref = refreshPositions4;

      // Section 5: move into a left-side vertical column (mirrors Section 3's right column)
      const tl5Left = gsap.timeline({
        defaults: { ease: "Power1.ease" },

        scrollTrigger: {
          trigger: "#section5",
          start: "top 50%",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      const leftMargin = 16; // 1rem from left
      const calcLeftColumnPositions = () => {
        const ref = document.querySelector("#box-tl");
        // Use current rendered width to respect any active scale from previous sections
        const sw = ref ? ref.getBoundingClientRect().width : boxWidth * 0.5;
        const leftX = leftMargin;
        const totalHeight = 4 * sw + 3 * gap;
        const startY = (vh() - totalHeight) / 2;
        return [
          { x: leftX, y: startY + 0 * (sw + gap) },
          { x: leftX, y: startY + 1 * (sw + gap) },
          { x: leftX, y: startY + 2 * (sw + gap) },
          { x: leftX, y: startY + 3 * (sw + gap) },
        ];
      };

      const applyToBox5Left = (selector, x, y) => {
        tl5Left.to(
          selector,
          {
            x: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dx = x - rect.left;
              return `+=${dx}`;
            },
            y: () => {
              const el = document.querySelector(selector);
              const rect = el.getBoundingClientRect();
              const dy = y - rect.top;
              return `+=${dy}`;
            },
            scale: 1,
          },
          0
        );
      };

      const refreshPositions5Left = () => {
        const positions = calcLeftColumnPositions();
        tl5Left.clear();
        applyToBox5Left("#box-tl", positions[0].x, positions[0].y);
        applyToBox5Left("#box-tr", positions[1].x, positions[1].y);
        applyToBox5Left("#box-bl", positions[2].x, positions[2].y);
        applyToBox5Left("#box-br", positions[3].x, positions[3].y);
      };

      refreshPositions5Left();
      ScrollTrigger.addEventListener("refreshInit", refreshPositions5Left);
      refreshPositions5Ref = refreshPositions5Left;
    });

    return () => {
      if (refreshPositionsRef) {
        ScrollTrigger.removeEventListener("refreshInit", refreshPositionsRef);
      }
      if (refreshPositions5Ref) {
        ScrollTrigger.removeEventListener("refreshInit", refreshPositions5Ref);
      }
      if (refreshPositions4Ref) {
        ScrollTrigger.removeEventListener("refreshInit", refreshPositions4Ref);
      }
      window.removeEventListener("resize", ScrollTrigger.refresh);
      ctx.revert();
    };
  }, []);
  return (
    <div>
      <div
        id="boxes"
        className="fixed inset-0 z-50 select-none pointer-events-none"
      >
        <div
          id="box-tl"
          className="pointer-events-auto absolute top-4 left-4 w-72 h-72 rounded-3xl bg-red-500 shadow-lg flex justify-center items-center"
        >
          <Image 
          className=" object-cover rounded-3xl"
          src="/1.png" fill alt="1.png" />
        </div>
        <div
          id="box-tr"
          className="pointer-events-auto absolute top-4 right-4 w-72 h-72 rounded-3xl bg-blue-500 shadow-lg flex justify-center items-center"
        >
          <Image 
          className=" object-cover rounded-3xl"
          src="/2.png" fill alt="2.png" />
        </div>
        <div
          id="box-bl"
          className="pointer-events-auto absolute bottom-4 left-4 w-72 h-72 rounded-3xl bg-green-500 shadow-lg flex justify-center items-center"
        >
          <Image 
          className=" object-cover rounded-3xl"
          src="/3.png" fill alt="3.png" />
        </div>
        <div
          id="box-br"
          className="pointer-events-auto absolute bottom-4 right-4 w-72 h-72 rounded-3xl bg-rose-500 shadow-lg flex justify-center items-center"
        >
          <Image 
          className=" object-cover rounded-3xl"
          src="/4.png" fill alt="4.png" />
        </div>
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Page;
