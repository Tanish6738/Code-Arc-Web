"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import Image from "next/image";
import Section1 from "@/Sections/Section1";
import Section2 from "@/Sections/Section2";
import Section3 from "@/Sections/Section3";
import Section4 from "@/Sections/Section4";
import Section5 from "@/Sections/Section5";
import Footer from "@/components/Footer";

// Ensure plugin registered (safety in case utils changes later)
gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const loaderTlRef = useRef(null);
  const loaderRef = useRef(null);

  // Initial 2s loading animation (independent of scroll) using the real corner boxes
  useEffect(() => {
    if (!loading) return;
    // Use a broad context (document) so we can target fixed-position boxes
    const ctx = gsap.context(() => {
      const selectors = ["#box-tl", "#box-tr", "#box-bl", "#box-br"];
      const els = selectors
        .map((s) => document.querySelector(s))
        .filter(Boolean);
      if (els.length !== 4) {
        // Fallback: nothing to animate => remove overlay quickly
        setLoading(false);
        return;
      }

      // Measure viewport to compute centered 2x2 grid positions
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;
      const gap = 32; // space between boxes in loader grid

      // Use their natural size (tailwind w-72 h-72); measure first element for safety
      const rect = els[0].getBoundingClientRect();
      const bw = rect.width;
      const bh = rect.height;
      const totalW = 2 * bw + gap;
      const totalH = 2 * bh + gap;
      const startX = (vw() - totalW) / 2;
      const startY = (vh() - totalH) / 2;
      const targetPositions = [
        { x: startX, y: startY }, // tl
        { x: startX + bw + gap, y: startY }, // tr
        { x: startX, y: startY + bh + gap }, // bl
        { x: startX + bw + gap, y: startY + bh + gap }, // br
      ];

      // Current corner positions (absolute top/left already placed via classes)
      const initialRects = els.map((el) => el.getBoundingClientRect());

      loaderTlRef.current = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Fade out overlay then clear inline transforms so scroll animations start fresh
          if (loaderRef.current) {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.4,
              pointerEvents: "none",
            });
          }
          // Return boxes to their corner baseline (translate 0) instantly but after slight delay for visual polish
          gsap.to(els, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            boxShadow: "none",
            delay: 0.25,
            clearProps: "transform,boxShadow",
            onComplete: () => setLoading(false),
          });
        },
      });

      // Set starting invisible state at corners
      // Start hidden then fade/scale in as they travel to center
      loaderTlRef.current.set(els, { opacity: 0, scale: 0.6, rotate: -6 });

      // Move them to centered grid while fading/scaling in
      selectors.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const dx = targetPositions[i].x - initialRects[i].left;
        const dy = targetPositions[i].y - initialRects[i].top;
        loaderTlRef.current.to(
          el,
          {
            x: dx,
            y: dy,
            opacity: 1,
            scale: 0.5,
            rotate: 0,
            duration: 0.65,
          },
          i * 0.08
        );
      });

      // Add a subtle pulse + glow wave
      loaderTlRef.current.to(
        els,
        {
          // boxShadow: '0 0 32px -4px rgba(255,255,255,0.25)',
          duration: 1.5,
          stagger: { each: 0.07, from: "center" },
        },
        0.4
      );
      loaderTlRef.current
        .to(
          els,
          {
            y: (i) => (i % 2 === 0 ? "-12" : "12"),
            scale: 0.95,
            duration: 0.7,
            ease: "sine.inOut",
          },
          0.75
        )
        .to(els, { y: 0, scale: 1, duration: 0.5, ease: "sine.out" }, 1.35);

      // Return them back to corners (reverse path) before overlay fades
      // Slightly longer pause (0.2s) after pulse before returning
      selectors.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        loaderTlRef.current.to(
          el,
          {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          1.55 + i * 0.04
        );
      });
    });

    return () => {
      ctx.revert();
      if (loaderTlRef.current) loaderTlRef.current.kill();
    };
  }, [loading]);
  useEffect(() => {
    if (loading) return; // wait for loader to finish
    // Skip initializing box animations on small screens
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 768px)").matches
    ) {
      return;
    }
    // Animate the 4 corner boxes into a centered inline row while scrolling
    // Hold references to refresh handlers so we can remove listeners on cleanup
    // Separate refresh refs per section to avoid overwriting & leaked listeners
    let refreshPositionsSection2Ref;
    let refreshPositionsSection3Ref;
    let refreshPositionsSection4Ref;
    let refreshPositionsSection5Ref;

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
      refreshPositionsSection2Ref = refreshPositions;

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
      refreshPositionsSection3Ref = refreshPositions5;

      // Section 4: scale to 50% and arrange in a 1-2-1 grid
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
      refreshPositionsSection4Ref = refreshPositions4;

      // Section 5: Zig-zag 4-row layout
      // Desired final arrangement (rows top->bottom):
      // Row 1: right side  (#box-tr)
      // Row 2: left side   (#box-tl)
      // Row 3: left side   (#box-bl)
      // Row 4: right side  (#box-br)
      const tl5ZigZag = gsap.timeline({
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

      const scaleZig = 0.7; // final scale for Section 5

      const calcZigZagPositions = () => {
        const maxW = 1280; // tailwind max-w-7xl equivalent
        const pad = window.innerWidth >= 768 ? 40 : 24; // md:px-10 vs px-6
        const containerInset = (vw() - Math.min(vw(), maxW)) / 2;
        const leftX = Math.max(0, containerInset + pad);
        const rightX =
          vw() - Math.max(0, containerInset + pad) - boxWidth * scaleZig;

        // Use base boxWidth * scale for consistent spacing (independent of prior scale 0.5 in Section 4)
        const sw = boxWidth * scaleZig;
        const totalHeight = 4 * sw + 3 * gap;
        const startY = (vh() - totalHeight) / 2;
        return {
          row1Right: { x: rightX, y: startY + 1 * (sw + gap) },
          row2Left: { x: leftX, y: startY + 1 * (sw + gap) },
          row3Left: { x: leftX, y: startY + 2 * (sw + gap) },
          row4Right: { x: rightX, y: startY + 2 * (sw + gap) },
          metrics: { sw },
        };
      };

      const applyToBox5Zig = (selector, x, y) => {
        tl5ZigZag.to(
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
            scale: scaleZig,
            transformOrigin: "top left",
          },
          0
        );
      };

      const refreshPositions5Zig = () => {
        // Narrow screen fallback: stack vertically on left
        if (window.innerWidth < 768) {
          const maxW = 1280;
          const pad = 24;
          const containerInset = (vw() - Math.min(vw(), maxW)) / 2;
          const leftX = Math.max(0, containerInset + pad);
          const sw = boxWidth * scaleZig;
          const totalH = 4 * sw + 3 * gap;
          const startY = (vh() - totalH) / 2;
          tl5ZigZag.clear();
          ["#box-tr", "#box-tl", "#box-bl", "#box-br"].forEach((sel, i) => {
            applyToBox5Zig(sel, leftX, startY + i * (sw + gap));
          });
          return;
        }
        const pos = calcZigZagPositions();
        tl5ZigZag.clear();
        // Mapping defined above
        applyToBox5Zig("#box-tr", pos.row1Right.x, pos.row1Right.y); // row 1 right
        applyToBox5Zig("#box-tl", pos.row2Left.x, pos.row2Left.y); // row 2 left
        applyToBox5Zig("#box-bl", pos.row3Left.x, pos.row3Left.y); // row 3 left
        applyToBox5Zig("#box-br", pos.row4Right.x, pos.row4Right.y); // row 4 right
      };

      refreshPositions5Zig();
      ScrollTrigger.addEventListener("refreshInit", refreshPositions5Zig);
      refreshPositionsSection5Ref = refreshPositions5Zig;
    });

    return () => {
      if (refreshPositionsSection2Ref) {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          refreshPositionsSection2Ref
        );
      }
      if (refreshPositionsSection3Ref) {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          refreshPositionsSection3Ref
        );
      }
      if (refreshPositionsSection4Ref) {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          refreshPositionsSection4Ref
        );
      }
      if (refreshPositionsSection5Ref) {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          refreshPositionsSection5Ref
        );
      }
      window.removeEventListener("resize", ScrollTrigger.refresh);
      ctx.revert();
    };
  }, [loading]);

  return (
    <div>
      {loading && (
        <div
          id="initial-loader-bg"
          ref={loaderRef}
          className="fixed inset-0 z-40 bg-black pointer-events-none"
        />
      )}
      <div
        id="boxes"
        className="hidden md:block fixed inset-0 z-50 select-none pointer-events-none"
      >
        <div
          id="box-tl"
          className="pointer-events-auto absolute top-4 left-4 w-72 h-72 rounded-3xl shadow-lg flex justify-center items-center overflow-hidden "
        >
          <Image
            className="shiny-border border-4 object-cover rounded-3xl"
            src="/1.png"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 18rem"
            alt="CodeARC platform preview – feature card 1"
          />
        </div>
        <div
          id="box-tr"
          className="pointer-events-auto absolute top-4 right-4 w-72 h-72 rounded-3xl shadow-lg flex justify-center items-center overflow-hidden "
        >
          <Image
            className="shiny-border border-4 object-cover rounded-3xl"
            src="/2.png"
            fill
            sizes="(max-width: 768px) 50vw, 18rem"
            alt="CodeARC UI showcase – feature card 2"
          />
        </div>
        <div
          id="box-bl"
          className="pointer-events-auto absolute bottom-4 left-4 w-72 h-72 rounded-3xl shadow-lg flex justify-center items-center overflow-hidden "
        >
          <Image
            className="shiny-border border-4 object-cover rounded-3xl"
            src="/3.png"
            fill
            sizes="(max-width: 768px) 50vw, 18rem"
            alt="Developer workflow illustration – feature card 3"
          />
        </div>
        <div
          id="box-br"
          className="pointer-events-auto absolute bottom-4 right-4 w-72 h-72 rounded-3xl shadow-lg flex justify-center items-center overflow-hidden "
        >
          <Image
            className="shiny-border border-4 object-cover rounded-3xl"
            src="/4.png"
            fill
            sizes="(max-width: 768px) 50vw, 18rem"
            alt="Team collaboration concept art – feature card 4"
          />
        </div>
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </div>
  );
}
