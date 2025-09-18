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
    const ctx = gsap.context(() => {
      const boxes = [
        "#box-tl",
        "#box-tr",
        "#box-bl",
        "#box-br",
      ];

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
        defaults: { ease: "Power1.easeInOut" },
        scrollTrigger: {
          trigger: "#section4",
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
            x: () => x - document.querySelector(selector).getBoundingClientRect().left,
            y: () => y - document.querySelector(selector).getBoundingClientRect().top,
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

      // Section 5 continuation: move row into a right-side vertical column
      const tl5 = gsap.timeline({
        defaults: { ease: "Power1.easeInOut" },
        scrollTrigger: {
          trigger: "#section5",
          // Continue from mid-entry of Section 5 for a smooth handoff
          start: "top 50%",
          // Finish exactly when Section 5 bottom reaches viewport bottom
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      const rightMargin = 16; // 1rem from right
      const calcColumnPositions = () => {
        const leftX = vw() - rightMargin - boxWidth; // left coordinate for the column
        const totalHeight = 4 * boxWidth + 3 * gap;
        const startY = (vh() - totalHeight) / 2; // vertically center the column
        return [
          { x: leftX, y: startY + 0 * (boxWidth + gap) },
          { x: leftX, y: startY + 1 * (boxWidth + gap) },
          { x: leftX, y: startY + 2 * (boxWidth + gap) },
          { x: leftX, y: startY + 3 * (boxWidth + gap) },
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
        const positions = calcColumnPositions();
        tl5.clear();
        applyToBox5("#box-tl", positions[0].x, positions[0].y);
        applyToBox5("#box-tr", positions[1].x, positions[1].y);
        applyToBox5("#box-bl", positions[2].x, positions[2].y);
        applyToBox5("#box-br", positions[3].x, positions[3].y);
      };

      refreshPositions5();
      ScrollTrigger.addEventListener("refreshInit", refreshPositions5);

      // Ensure the animation doesn't continue past Section 4 by scoping to the ScrollTrigger range only
      // The scrubbed tween only progresses between start and end; outside range it's clamped by ScrollTrigger.
    });

    return () => ctx.revert();
  }, []);
  return (
    <div>
      {/* <Section1 />
      <Section2 /> */}

      <div id="boxes" className="fixed inset-0 z-50 select-none pointer-events-none">
        <div
          id="box-tl"
          className="pointer-events-auto absolute top-4 left-4 w-72 h-72 rounded-3xl bg-red-500 shadow-lg flex justify-center items-center"
        ></div>
        <div
          id="box-tr"
          className="pointer-events-auto absolute top-4 right-4 w-72 h-72 rounded-3xl bg-blue-500 shadow-lg flex justify-center items-center"
        ></div>
        <div
          id="box-bl"
          className="pointer-events-auto absolute bottom-4 left-4 w-72 h-72 rounded-3xl bg-green-500 shadow-lg flex justify-center items-center"
        ></div>
        <div
          id="box-br"
          className="pointer-events-auto absolute bottom-4 right-4 w-72 h-72 rounded-3xl bg-rose-500 shadow-lg flex justify-center items-center"
        ></div>
      </div>

      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Page;
