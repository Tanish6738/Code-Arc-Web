"use client";
import React, { useState } from "react";

const Section5 = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in your name, email, and message." });
      return;
    }
    setStatus({ type: "success", message: "Thanks! We'll get back to you shortly." });
  };

  return (
    <section id="section5" className="relative min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 ">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight">
            Get in touch
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 font-tech">
            We’d love to hear about your project or feedback.
          </p>
        </div>

        {/* Layout with left spacer for the animated boxes column */}
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          {/* Left spacer: matches scaled box width (w-72 at 0.5 scale => ~9rem) plus margin. */}
          <div aria-hidden className="w-48 md:w-56 shrink-0" />

          {/* Contact form on the right */}
          <div className="flex-1">
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1 text-white/80">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1 text-white/80">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm mb-1 text-white/80">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-1 text-white/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30 resize-y"
                  placeholder="Tell us a bit about your idea or request..."
                />
              </div>

              {status && (
                <div
                  role="status"
                  className={`${status.type === "error" ? "text-red-400" : "text-green-400"} text-sm`}
                >
                  {status.message}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex hover:cursor-pointer items-center justify-center rounded-xl bg-white text-black px-5 py-2.5 font-medium hover:bg-white/90 transition-colors"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;