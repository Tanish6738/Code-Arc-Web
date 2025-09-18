import React from "react";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "CodeARC: All-in-One Developer Platform for Teams & Individuals",
  description:
    "Revolutionize your workflow with CodeARC. An all-in-one developer platform for smart snippet management, AI-powered tools, seamless collaboration, and project management.",
  openGraph: {
    title: "CodeARC: All-in-One Developer Platform for Teams & Individuals",
    description:
      "Revolutionize your workflow with CodeARC. An all-in-one developer platform for smart snippet management, AI-powered tools, seamless collaboration, and project management.",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "CodeARC developer platform preview",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

const Page = () => {
  return <HomeClient />;
};

export default Page;
