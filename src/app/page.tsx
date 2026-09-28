"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resumeData } from "@/data/resume";

export default function Home() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const data = resumeData[lang];

  // Scroll tracker & walking hiker state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Force scroll to top on initial load & disable automatic restoration
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }

    let scrollTimeout: NodeJS.Timeout;
    let ticking = false;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 180);

      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(
              100,
              Math.max(0, (window.scrollY / totalHeight) * 100)
            );
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const i18n = {
    en: {
      navAbout: "About",
      navExperience: "Experience",
      navEducation: "Education",
      navSkills: "Skills",
      navProjects: "Projects",
      downloadCv: "Resume PDF",
      viewProjects: "View Projects",
      trailProfile: "WAYPOINT 01 // 1,420m • BASE CAMP",
      aboutTitle: "About Me",
      contactCardTitle: "Contact & Location",
      hobbiesTitle: "Sports & Hobbies",
      trailExp: "WAYPOINT 02 // 1,750m • RIDGEWAY TRAIL",
      experienceTitle: "Experience",
      currentBadge: "Current",
      trailEdu: "WAYPOINT 03 // 2,050m • HIGH PASS",
      educationTitle: "Education",
      trailSkills: "WAYPOINT 04 // 2,320m • RIDGE TRAVERSE",
      skillsTitle: "Skills & Extracurriculars",
      techSkillsTitle: "Technical Stack",
      langClubsTitle: "Languages & Clubs",
      trailProjects: "WAYPOINT 05 // 2,515m • GROSSER PRIEL SUMMIT",
      projectsTitle: "Featured Projects",
      github: "GitHub Repository",
      liveDemo: "Live Demo",
      metricInstitution: "Institution",
      metricLocation: "Location",
      metricRole: "Current Role",
      subLanguages: "Languages",
      subClubs: "Clubs & Activities",
      statsSchool: "HTL Leonding",
      statsSchoolSub: "Informatik SSE",
      statsBase: "Linz",
      statsBaseSub: "Upper Austria",
      statsWork: "bergwerk Mountainstore",
      statsWorkSub: "Mountain Sports Retail",
    },
    de: {
      navAbout: "Über mich",
      navExperience: "Berufserfahrung",
      navEducation: "Ausbildung",
      navSkills: "Kenntnisse",
      navProjects: "Projekte",
      downloadCv: "Lebenslauf (PDF)",
      viewProjects: "Projekte ansehen",
      trailProfile: "WEGWEISER 01 // 1.420m • TALSTATION",
      aboutTitle: "Über mich",
      contactCardTitle: "Kontakt & Standort",
      hobbiesTitle: "Sport & Hobbies",
      trailExp: "WEGWEISER 02 // 1.750m • GRATWEG",
      experienceTitle: "Berufserfahrung",
      currentBadge: "Aktuell",
      trailEdu: "WEGWEISER 03 // 2.050m • HOCHPASS",
      educationTitle: "Ausbildung",
      trailSkills: "WEGWEISER 04 // 2.320m • GRAT-TRAVERSE",
      skillsTitle: "Kenntnisse & Engagement",
      techSkillsTitle: "IT-Stack & Tools",
      langClubsTitle: "Sprachen & Schulclubs",
      trailProjects: "WEGWEISER 05 // 2.515m • GROSSER PRIEL GIPFEL",
      projectsTitle: "Ausgewählte Projekte",
      github: "GitHub Repository",
      liveDemo: "Live Demo",
      metricInstitution: "Institution",
      metricLocation: "Standort",
      metricRole: "Aktuelle Rolle",
      subLanguages: "Sprachen",
      subClubs: "Schulclubs & Engagement",
      statsSchool: "HTL Leonding",
      statsSchoolSub: "Informatik SSE",
      statsBase: "Linz",
      statsBaseSub: "Oberösterreich",
      statsWork: "bergwerk Mountainstore",
      statsWorkSub: "Bergsport-Beratung",
    },
  };

  const t = i18n[lang];

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      {/* Professional Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-900/95 border-b border-stone-800 text-stone-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded bg-stone-800 border border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-amber-500 group-hover:border-amber-500/50 transition">
              AD
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-amber-400 transition">
                {data.personal.name}
              </span>
              <span className="text-[10px] text-stone-400 font-mono tracking-wider uppercase">
                HTL Leonding &bull; SSE
              </span>
            </div>
          </a>


          {/* Navigation & Language Switch */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-stone-300">
              <a href="#about" className="hover:text-amber-400 transition">
                {t.navAbout}
              </a>
              <a href="#experience" className="hover:text-amber-400 transition">
                {t.navExperience}
              </a>
              <a href="#education" className="hover:text-amber-400 transition">
                {t.navEducation}
              </a>
              <a href="#skills" className="hover:text-amber-400 transition">
                {t.navSkills}
              </a>
              <a href="#projects" className="hover:text-amber-400 transition">
                {t.navProjects}
              </a>
            </nav>

            <div className="flex bg-stone-800 rounded p-1 border border-stone-700 text-xs font-mono font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded transition-all ${
                  lang === "en"
                    ? "bg-amber-600 text-white"
                    : "text-stone-400 hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("de")}
                className={`px-3 py-1 rounded transition-all ${
                  lang === "de"
                    ? "bg-amber-600 text-white"
                    : "text-stone-400 hover:text-white"
                }`}
                aria-label="Auf Deutsch umschalten"
              >
                DE
              </button>
            </div>
          </div>
        </div>

        {/* Trail Progress Strip (Dedicated row beneath navbar - ZERO CLIPPING) */}
        <div className="w-full bg-stone-950/85 border-t border-stone-800/80 relative h-7 select-none">
          <div className="max-w-5xl mx-auto px-6 h-full relative flex items-center">
            {/* Trail Bed Line */}
            <div className="w-full h-1 bg-stone-800/90 rounded-full relative">
              {/* Progress Line */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 rounded-full will-change-[width] transition-[width] duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />

              {/* Waypoint notches */}
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                <span className="w-1.5 h-1.5 -top-[1px] rounded-full bg-stone-600 border border-stone-900" title="Base Camp 1,420m" />
                <span className="w-1.5 h-1.5 -top-[1px] rounded-full bg-stone-600 border border-stone-900" title="Ridgeway 1,750m" />
                <span className="w-1.5 h-1.5 -top-[1px] rounded-full bg-stone-600 border border-stone-900" title="High Pass 2,050m" />
                <span className="w-1.5 h-1.5 -top-[1px] rounded-full bg-stone-600 border border-stone-900" title="Ridge Traverse 2,320m" />
                <span className="w-1.5 h-1.5 -top-[1px] rounded-full bg-stone-600 border border-stone-900" title="Großer Priel 2,515m" />
              </div>

              {/* Summit Cross (Gipfelkreuz) at 100% End */}
              <div
                className={`absolute -top-2.5 right-0 z-10 transition-all duration-300 flex items-center pointer-events-none ${
                  scrollProgress >= 96 ? "summit-pulse text-amber-400" : "text-stone-500 opacity-60"
                }`}
                title="Großer Priel Summit 2,515m"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M9 2h2v5h4v2h-4v9H9v-9H5V7h4V2z" />
                </svg>
              </div>

              {/* Walking Hiker & Elevation Tag */}
              <div
                className={`absolute -top-3 pointer-events-none will-change-[left] transition-[left] duration-150 ease-out z-20 flex items-center gap-1.5 -translate-x-1/2 ${
                  scrollProgress >= 85 ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ left: `${Math.min(93, Math.max(2, scrollProgress))}%` }}
              >
                <div className={isScrolling ? "hiker-step" : ""}>
                  <svg
                    viewBox="0 0 32 32"
                    className="w-4 h-4 text-stone-200 drop-shadow"
                    fill="currentColor"
                  >
                    {/* Backpack with roll-top and sleeping pad */}
                    <rect x="6" y="10" width="7" height="11" rx="2" fill="#065f46" stroke="#042f2e" strokeWidth="0.8" />
                    <rect x="5.5" y="8" width="8" height="3" rx="1" fill="#047857" />
                    <line x1="7" y1="14" x2="13" y2="14" stroke="#fbbf24" strokeWidth="0.8" />
                    <line x1="7" y1="17" x2="13" y2="17" stroke="#fbbf24" strokeWidth="0.8" />
                    <rect x="6" y="21" width="7" height="2.5" rx="1.2" fill="#d97706" />

                    {/* Hiker Head & Outdoor Cap */}
                    <circle cx="16.5" cy="6.5" r="3" fill="#fcd34d" />
                    <path d="M14 5.5 Q16.5 4 19.5 5.5 L21 6.5 L15 6.5 Z" fill="#d97706" />
                    <rect x="17.5" y="6.2" width="2" height="1.2" rx="0.5" fill="#1c1917" />

                    {/* Torso / Shell Jacket */}
                    <path d="M13 9.5 L19.5 9.5 L18.5 19 L13 19 Z" fill="#f59e0b" />
                    <line x1="16" y1="9.5" x2="16" y2="19" stroke="#b45309" strokeWidth="0.8" />

                    {/* Arm gripping pole */}
                    <path d="M15 11 L20 15 L23 16" fill="none" stroke="#fcd34d" strokeWidth="1.6" strokeLinecap="round" />

                    {/* Trekking Pole */}
                    <line x1="22" y1="11" x2="25.5" y2="30" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="21.5" y="11" width="1.5" height="4" rx="0.5" fill="#1c1917" />
                    <line x1="23.5" y1="27.5" x2="26.5" y2="28" stroke="#1c1917" strokeWidth="1.6" />

                    {/* Legs in hiking stride */}
                    <path d="M14.5 19 L12 25 L10.5 28.5" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M17 19 L18.5 24 L20.5 28.5" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />

                    {/* Mountaineering Boots */}
                    <rect x="8.5" y="27.5" width="4.5" height="2.5" rx="1" fill="#78350f" />
                    <rect x="19" y="27.5" width="4.5" height="2.5" rx="1" fill="#78350f" />
                  </svg>
                </div>

                {/* Live Elevation Tag */}
                <div className="px-1.5 py-0.5 rounded bg-stone-900/95 border border-amber-500/70 text-[9px] font-mono font-semibold text-amber-400 shadow-xs flex items-center gap-0.5 whitespace-nowrap">
                  <span className="text-[7px] text-emerald-400">▲</span>
                  <span>{Math.round(1420 + (scrollProgress / 100) * 1095).toLocaleString()}&thinsp;m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white pt-16 pb-20 px-6 border-b border-stone-800 overflow-hidden">
        {/* Topographic Contour Map Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.09] overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none" stroke="#f59e0b" strokeWidth="1.2">
            <path d="M-50,40 Q250,10 500,80 T1050,60" />
            <path d="M-50,90 Q270,60 520,130 T1050,110" />
            <path d="M-50,140 Q290,100 540,190 T1050,160" strokeWidth="1.8" />
            <path d="M-50,200 Q310,150 560,250 T1050,220" />
            <path d="M-50,260 Q330,200 580,310 T1050,280" />
            <path d="M-50,320 Q350,250 600,370 T1050,340" strokeWidth="1.8" />
            <text x="530" y="180" fill="#f59e0b" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">1,800m</text>
            <text x="570" y="300" fill="#f59e0b" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">2,100m</text>
            <text x="960" y="150" fill="#f59e0b" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">2,400m</text>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              {data.personal.name}
            </h1>

            <p className="text-lg sm:text-xl text-stone-300 font-medium mb-3">
              {data.personal.tagline}
            </p>

            <p className="text-sm font-mono text-stone-400 flex items-center justify-center md:justify-start gap-2 mb-8">
              <span>{data.personal.location}</span>
              <span className="text-stone-600">/</span>
              <span className="text-emerald-400">HTL Leonding</span>
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a
                href="/Arthur_Dirnberger_Lebenslauf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-medium px-5 py-2.5 rounded transition-all flex items-center gap-2 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{t.downloadCv}</span>
              </a>

              <a
                href="#projects"
                className="bg-transparent hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 font-medium px-5 py-2.5 rounded transition-all text-sm flex items-center justify-center"
              >
                <span>{t.viewProjects}</span>
              </a>
            </div>
          </div>

          {/* Profile Photo with Trail Route Marker */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded overflow-hidden border border-stone-700 bg-stone-800 shadow-xl relative group">
              <Image
                src="/profile.png"
                alt={data.personal.name}
                fill
                sizes="(max-width: 640px) 208px, 240px"
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="bg-stone-900 border-b border-stone-800 text-stone-300 py-6 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="p-3 rounded bg-stone-800/40 border border-stone-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-500">
              {t.metricInstitution}
            </div>
            <div className="font-semibold text-white text-sm mt-0.5">
              {t.statsSchool}
            </div>
            <div className="text-xs text-stone-400 font-mono">
              {t.statsSchoolSub}
            </div>
          </div>

          <div className="p-3 rounded bg-stone-800/40 border border-stone-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-500">
              {t.metricLocation}
            </div>
            <div className="font-semibold text-white text-sm mt-0.5">
              {t.statsBase}
            </div>
            <div className="text-xs text-stone-400 font-mono">
              {t.statsBaseSub}
            </div>
          </div>

          <div className="p-3 rounded bg-stone-800/40 border border-stone-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-500">
              {t.metricRole}
            </div>
            <div className="font-semibold text-white text-sm mt-0.5 truncate">
              {t.statsWork}
            </div>
            <div className="text-xs text-stone-400 font-mono">
              {t.statsWorkSub}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Section 1: About Me */}
        <section id="about" className="scroll-mt-28">
          <div className="mb-6">
            <span className="text-xs font-mono font-semibold tracking-widest text-stone-500 uppercase block mb-1">
              {t.trailProfile}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-3">
              {t.aboutTitle}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 max-w-3xl">
            {data.about}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded border border-stone-200">
              <h3 className="font-mono text-xs tracking-wider uppercase font-semibold text-stone-800 mb-4 pb-2 border-b border-stone-100">
                {t.contactCardTitle}
              </h3>
              <ul className="space-y-3 text-sm text-stone-600 font-mono">
                <li className="flex items-center gap-3">
                  <span className="text-stone-400">MAIL:</span>
                  <a
                    href={`mailto:${data.personal.email}`}
                    className="hover:text-amber-600 text-stone-900 transition"
                  >
                    {data.personal.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-stone-400">TEL:</span>
                  <span className="text-stone-900">{data.personal.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-stone-400">LOC:</span>
                  <span className="text-stone-900">
                    {data.personal.location}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-stone-400">GIT:</span>
                  <a
                    href={data.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 hover:text-amber-600 underline transition"
                  >
                    github.com/adirnberger-htl
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded border border-stone-200">
              <h3 className="font-mono text-xs tracking-wider uppercase font-semibold text-stone-800 mb-4 pb-2 border-b border-stone-100">
                {t.hobbiesTitle}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {data.hobbies.map((hobby, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2.5 rounded bg-stone-50 border border-stone-200 text-stone-800 text-xs font-mono hover:border-stone-400 transition"
                  >
                    {hobby}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Experience */}
        <section id="experience" className="scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-widest text-stone-500 uppercase block mb-1">
              {t.trailExp}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-3">
              {t.experienceTitle}
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 space-y-10">
            {data.experience.map((exp) => {
              const isCurrent =
                exp.date.includes("Present") ||
                exp.date.includes("now") ||
                exp.date.includes("Heute");

              return (
                <div key={exp.id} className="relative group">
                  <div
                    className={`absolute -left-6 sm:-left-8 -translate-x-1/2 top-7 w-3.5 h-3.5 rounded-full border-2 bg-white transition-all ${
                      isCurrent
                        ? "border-amber-600 ring-4 ring-amber-100"
                        : "border-stone-600 ring-4 ring-stone-100"
                    }`}
                  />

                  <div className="bg-white p-6 rounded border border-stone-200 hover:border-stone-400 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                          {exp.role}
                        </h3>
                        {isCurrent && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                            {t.currentBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2.5 py-1 rounded">
                        {exp.date}
                      </span>
                    </div>

                    <div className="text-stone-800 font-semibold text-sm mb-3 font-mono">
                      {exp.company}
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Education */}
        <section id="education" className="scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-widest text-stone-500 uppercase block mb-1">
              {t.trailEdu}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-3">
              {t.educationTitle}
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 space-y-8">
            {data.education.map((edu) => {
              const isCurrent =
                edu.date.includes("Present") ||
                edu.date.includes("Aktuell") ||
                edu.date.includes("now") ||
                edu.date.includes("Heute");

              return (
                <div key={edu.id} className="relative group">
                  <div
                    className={`absolute -left-6 sm:-left-8 -translate-x-1/2 top-7 w-3.5 h-3.5 rounded-full border-2 bg-white transition-all ${
                      isCurrent
                        ? "border-amber-600 ring-4 ring-amber-100"
                        : "border-stone-600 ring-4 ring-stone-100"
                    }`}
                  />

                  <div className="bg-white p-6 rounded border border-stone-200 hover:border-stone-400 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                          {edu.school}
                        </h3>
                        {isCurrent && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                            {t.currentBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2.5 py-1 rounded">
                        {edu.date}
                      </span>
                    </div>

                  <div className="text-stone-800 font-semibold text-sm mb-2 font-mono">
                    {edu.degree}
                  </div>

                  {edu.description && (
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </section>

        {/* Section 4: Skills & Activities */}
        <section id="skills" className="scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-widest text-stone-500 uppercase block mb-1">
              {t.trailSkills}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-3">
              {t.skillsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded border border-stone-200">
              <h3 className="text-xs font-mono tracking-wider uppercase text-stone-800 font-semibold mb-4 pb-2 border-b border-stone-100">
                {t.techSkillsTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-50 border border-stone-200 text-stone-800 px-3 py-1.5 rounded text-xs font-mono font-medium hover:border-stone-400 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded border border-stone-200">
              <h3 className="text-xs font-mono tracking-wider uppercase text-stone-800 font-semibold mb-4 pb-2 border-b border-stone-100">
                {t.langClubsTitle}
              </h3>
              <div className="space-y-4 text-sm text-stone-700">
                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
                    {t.subLanguages}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.languages.map((langItem, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-100 border border-stone-200 text-stone-800 px-2.5 py-1 rounded text-xs font-mono"
                      >
                        {langItem}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
                    {t.subClubs}
                  </div>
                  <ul className="space-y-2">
                    {data.skills.clubs.map((club, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-stone-600 text-xs font-mono"
                      >
                        <span className="text-stone-400 mt-0.5">&bull;</span>
                        <span>{club}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Projects */}
        <section id="projects" className="scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-widest text-stone-500 uppercase block mb-1">
              {t.trailProjects}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 border-b border-stone-200 pb-3">
              {t.projectsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-stone-200 p-6 rounded shadow-xs hover:border-stone-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 mb-2 font-semibold">
                    {project.category}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-mono px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 hover:text-amber-600 transition"
                  >
                    {t.github}
                  </a>
                  {project.link && project.link !== project.repo && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-500 transition"
                    >
                      {t.liveDemo}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Professional Minimal Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6 border-t border-stone-800 text-center font-mono">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-xs font-bold text-amber-500">
            AD
          </div>
          <p className="text-[11px] text-stone-500">
            &copy; {new Date().getFullYear()} Arthur Dirnberger &bull; Next.js &bull; TypeScript &bull; Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
