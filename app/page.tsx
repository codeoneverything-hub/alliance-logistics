"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "WHY US", href: "#why-us" },
  { label: "GET IN TOUCH", href: "#contact" },
];

function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -50 }
      : direction === "right"
        ? { opacity: 0, x: 50 }
        : { opacity: 0, y: 50 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="overflow-x-hidden bg-[#f7f7f5] text-[#111]">
      {/* ================= HEADER ================= */}

      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-[82px] max-w-[1400px] items-center justify-between px-6 md:px-10">
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-50 flex items-center"
          >
            <Image
              src="/images/logo.jpg"
              alt="Alliance Express Logistics"
              width={160}
              height={55}
              priority
              className="h-auto max-h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium tracking-wide"
              >
                {item.label}

                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#d71920] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <a
              href="#contact"
              className="rounded-full bg-[#d71920] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#b9141a]"
            >
              GET IN TOUCH
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 6, width: 28 }
                  : { rotate: 0, y: 0, width: 28 }
              }
              className="block h-0.5 bg-black"
            />

            <motion.span
              animate={
                menuOpen
                  ? { opacity: 0, x: 10 }
                  : { opacity: 1, x: 0 }
              }
              className="block h-0.5 w-7 bg-black"
            />

            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -6, width: 28 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="block h-0.5 bg-black"
            />
          </button>
        </div>

        {/* MOBILE MENU */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="border-t border-black/5 bg-white md:hidden"
            >
              <nav className="flex flex-col px-6 py-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="border-b border-black/10 py-5 text-sm font-semibold tracking-[0.15em]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative mt-[82px] h-[calc(100vh-82px)] min-h-[650px] overflow-hidden bg-black">
        <motion.video
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </motion.video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
              >
                Transportation & Logistics
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-8xl"
              >
                Moving people.
                <br />
                <span className="text-[#e31b23]">
                  Moving business.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.7,
                }}
                className="mt-7 max-w-xl text-base leading-7 text-white/80 md:text-lg"
              >
                Tailored transportation solutions designed to keep
                people, businesses and events moving forward.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1,
                  duration: 0.7,
                }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <a
                  href="#services"
                  className="rounded-full bg-[#d71920] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#b9141a]"
                >
                  EXPLORE SERVICES
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/50 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-black"
                >
                  CONTACT US
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70 md:flex"
        >
          Scroll

          <motion.span
            animate={{ width: ["30px", "48px", "30px"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-px bg-white/50"
          />
        </motion.a>
      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal direction="left">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#d71920]">
                Who we are
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                Transportation
                <br />
                <span className="text-black/40">
                  that moves with you.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-black/60 md:text-lg">
                We provide professional transportation and logistics
                solutions tailored to the needs of businesses,
                employees and events. From everyday journeys to
                carefully planned movements, our focus is simple —
                reliable service, smooth operations and a better
                travel experience.
              </p>

              <div className="mt-10">
                <a
                  href="#services"
                  className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.15em]"
                >
                  <span className="border-b-2 border-black pb-2 transition group-hover:border-[#d71920] group-hover:text-[#d71920]">
                    Discover more
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black transition duration-300 group-hover:border-[#d71920] group-hover:bg-[#d71920] group-hover:text-white">
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="group mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl bg-[#e9e7e3]"
            >
              <Image
                src="/images/a1.jpg"
                alt="Transportation truck"
                width={1000}
                height={700}
                className="h-[360px] w-full object-contain transition duration-700 group-hover:scale-105 md:h-[440px]"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="scroll-mt-20 bg-[#111] px-6 py-24 text-white md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#e31b23]">
                What we do
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
                Built around
                <br />
                <span className="text-white/40">
                  your journey.
                </span>
              </h2>
            </div>
          </Reveal>

          {/* SERVICE 01 */}

          <Reveal direction="left">
            <div className="grid items-center gap-12 border-t border-white/10 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
              <motion.div
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl bg-[#1c1c1c]"
              >
                <Image
                  src="/images/a2.jpg"
                  alt="Employee transportation"
                  width={1000}
                  height={700}
                  className="h-[320px] w-full object-contain transition duration-700 group-hover:scale-105 md:h-[400px]"
                />
              </motion.div>

              <div className="md:pl-8">
                <span className="text-sm text-white/30">
                  01
                </span>

                <h3 className="mt-4 text-3xl font-semibold md:text-5xl">
                  Employee
                  <br />
                  Transportation
                </h3>

                <p className="mt-6 max-w-lg leading-8 text-white/50">
                  Dependable transportation solutions designed to
                  support employees and organizations with
                  comfortable, professional and well-coordinated
                  journeys.
                </p>

                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider text-white transition hover:text-[#e31b23]"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </Reveal>

          {/* SERVICE 02 */}

          <Reveal direction="right">
            <div className="grid items-center gap-12 border-t border-white/10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
              <div className="order-2 md:order-1 md:pr-8">
                <span className="text-sm text-white/30">
                  02
                </span>

                <h3 className="mt-4 text-3xl font-semibold md:text-5xl">
                  Event
                  <br />
                  Transportation
                </h3>

                <p className="mt-6 max-w-lg leading-8 text-white/50">
                  Smooth and coordinated transportation for events,
                  ensuring people get where they need to be with
                  confidence and ease.
                </p>

                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider text-white transition hover:text-[#e31b23]"
                >
                  Learn more →
                </a>
              </div>

              <motion.div
                whileHover={{ y: -8 }}
                className="group order-1 overflow-hidden rounded-2xl bg-[#1c1c1c] md:order-2"
              >
                <Image
                  src="/images/a3.jpg"
                  alt="Event transportation"
                  width={1000}
                  height={700}
                  className="h-[320px] w-full object-contain transition duration-700 group-hover:scale-105 md:h-[400px]"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* SERVICE 03 */}

          <Reveal direction="left">
            <div className="grid items-center gap-12 border-t border-white/10 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
              <motion.div
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl bg-[#1c1c1c]"
              >
                <Image
                  src="/images/a4.jpg"
                  alt="Tailored transportation solutions"
                  width={1000}
                  height={700}
                  className="h-[320px] w-full object-contain transition duration-700 group-hover:scale-105 md:h-[400px]"
                />
              </motion.div>

              <div className="md:pl-8">
                <span className="text-sm text-white/30">
                  03
                </span>

                <h3 className="mt-4 text-3xl font-semibold md:text-5xl">
                  Tailored
                  <br />
                  Solutions
                </h3>

                <p className="mt-6 max-w-lg leading-8 text-white/50">
                  Flexible transportation solutions built around
                  your requirements, schedules and operational
                  needs.
                </p>

                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider text-white transition hover:text-[#e31b23]"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURE IMAGE ================= */}

      <section className="relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/images/a5.jpg"
            alt="Alliance transportation"
            width={1800}
            height={1000}
            className="h-auto w-full object-contain md:h-[600px]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <Reveal>
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                The journey matters
              </p>

              <h2 className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
                Built to move.
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY US ================= */}

      <section
        id="why-us"
        className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-16 md:grid-cols-2">
            <Reveal direction="left">
              <div>
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#d71920]">
                  Why choose us
                </p>

                <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                  More than
                  <br />
                  <span className="text-black/40">
                    getting there.
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Reliable",
                  text: "Consistent service designed around your schedule.",
                },
                {
                  number: "02",
                  title: "Professional",
                  text: "A professional approach to every journey.",
                },
                {
                  number: "03",
                  title: "Flexible",
                  text: "Solutions that adapt to your requirements.",
                },
                {
                  number: "04",
                  title: "Focused",
                  text: "Focused on creating smooth transportation experiences.",
                },
              ].map((item, index) => (
                <Reveal
                  key={item.number}
                  delay={index * 0.08}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`border-t border-black/10 py-8 ${
                      index % 2 === 0
                        ? "sm:pr-8"
                        : "sm:pl-8"
                    }`}
                  >
                    <span className="text-3xl font-semibold">
                      {item.number}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-black/50">
                      {item.text}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-[#d71920] px-6 py-28 text-white md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Start a conversation
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
              Let's move
              <br />
              forward.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/80">
              Looking for a transportation partner for your employees,
              events or business? Let's talk about your requirements.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="mailto:admin@alliance.com"
                className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-black"
              >
                EMAIL US →
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+911234567890"
                className="inline-flex rounded-full border border-white/50 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                +91 12345 67890
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#111] px-6 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <Image
            src="/images/logo.jpg"
            alt="Alliance Express Logistics"
            width={140}
            height={50}
            className="h-auto max-h-10 w-auto object-contain"
          />

          <div className="flex flex-col gap-2 text-sm text-white/50 md:items-end">
            <a
              href="mailto:admin@alliance.com"
              className="transition hover:text-white"
            >
              admin@alliance.com
            </a>

            <a
              href="tel:+911234567890"
              className="transition hover:text-white"
            >
              +91 12345 67890
            </a>

            <p className="mt-2 text-xs text-white/30">
              © {new Date().getFullYear()} Alliance Express Logistics
              Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}