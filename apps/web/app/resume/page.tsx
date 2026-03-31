"use client";

import { useEffect, useRef, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import classes from "./ResumePage.module.css";
import linkedinMark from "../images/LI-In-Bug.png";
import jprojectsIcon from "../images/Jprojects-Icon.png";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
});

type ResumeExperience = {
    id: string;
    period: string;
    title: string;
    companyLocation: string;
    bullets: string[];
};

const experienceSections: ResumeExperience[] = [
    {
        id: "exp-canopy",
        period: "2022-Present",
        title: "UX/UI Frontend Engineer",
        companyLocation: "Canopy Security - Dearborn, MI",
        bullets: [
            "Launched React Native apps to iOS App Store and Android Google Play Store to enable IoT vehicle security.",
            "Implemented modular component library of 40+ components for seamless integration in React Native and React apps.",
            "Engineered CI/CD pipeline to automate building, testing, and releasing in under 30 minutes on every MR push.",
            "Participated in professional development events: (React Summit 2023, Chain React 2024, Remix w/Brad Westfall).",
        ],
    },
    {
        id: "exp-ford-ux-ui",
        period: "2020-2022",
        title: "UX/UI Design & Development Engineer",
        companyLocation: "Ford Motor Company - Dearborn, MI",
        bullets: [
            "Streamlined FRF design system update process reducing the turnaround time to within 1 day or less.",
            "Paired with 20+ development teams refactoring to add testing, implement best practices, and improve app quality.",
            "Led UI development for SDE Explorer application showcasing 30+ technologies and 5+ stacks for DevOps alignment.",
            "Optimized responsiveness and usability of COVID-19 web survey apps within 2 days to enable Ford plant operations.",
        ],
    },
    {
        id: "exp-ford-craft",
        period: "2019-2020",
        title: "Software Craftsmanship Engineer",
        companyLocation: "Ford Motor Company - Dearborn, MI",
        bullets: [
            "Developed full-stack applications to support 100+ engineers for Software Engineer Training and PDO transformation.",
            "Mentored 50+ developers in TDD and software craftsmanship best practices via the Software Craftsman Revolution.",
            "Advocated for Software Craftsmanship, TDD, and Clean Code principles across PDO teams to increase adoption.",
            "Facilitated volunteering and learning events including: (Hour of Code, Operation Good Cheer, Agile & Beyond).",
        ],
    },
    {
        id: "exp-ford-pm",
        period: "2017-2019",
        title: "Product Manager: Scrum Master",
        companyLocation: "Ford Motor Company - Dearborn, MI",
        bullets: [
            "Introduced systems and integrated applications to enable enterprise backlog administration of 3000+ projects.",
            "Established team norms and facilitated Agile ceremonies reducing standup and planning times by over 50%.",
            "Instructed 4 sets of comprehensive Agile training courses covering Process, Tooling, and Mindset.",
            "Coached 100+ colleagues on Agile process and ran community events: (Take Your Child to Work Day: Agile Game Design).",
        ],
    },
];

const skills = [
    {
        id: "skill-frontend",
        label: "Frontend Expertise",
        value: "React • React Native • Design Systems • CSS • Typescript • Tailwind • Storybook • Figma",
    },
    {
        id: "skill-server",
        label: "Server-side Utilities",
        value: "Next.js • Expo • Vercel • GCP • AWS • Apollo • GraphQL • OAuth • PostgreSQL • Firebase",
    },
    {
        id: "skill-devops",
        label: "DevOps and Tooling",
        value: "CI/CD w/ E2E Testing • Jest • Detox • TDD • Gitlab CI • Github Actions • Git • i18next",
    },
    {
        id: "skill-team",
        label: "Excellent in a team environment",
        value: "Pair Programming • Mobbing • Product-Design-Engineering Collaboration",
    },
    {
        id: "skill-experience",
        label: "Summary",
        value: "5+ years of experience crafting responsive, consistent, and accessible software experiences.",
    },
];

const sectionIds = [
    "experience-header",
    ...experienceSections.map((section) => section.id),
    "skills",
    "education",
];

export default function ResumePage() {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [showSneakButtons, setShowSneakButtons] = useState(false);
    const sectionElementsRef = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowSneakButtons(true);
        }, 200);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            setVisibleSections(new Set(sectionIds));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId = entry.target.getAttribute("data-section-id");

                    if (!sectionId) {
                        return;
                    }

                    setVisibleSections((current) => {
                        if (current.has(sectionId)) {
                            return current;
                        }

                        const next = new Set(current);
                        next.add(sectionId);
                        return next;
                    });

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        sectionIds.forEach((sectionId) => {
            const element = sectionElementsRef.current[sectionId];

            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const setSectionRef = (sectionId: string) => (element: HTMLElement | null) => {
        sectionElementsRef.current[sectionId] = element;
    };

    const isVisible = (sectionId: string) => visibleSections.has(sectionId);

    return (
        <main className={classes.pageShell}>
            <div className={classes.backgroundGlow} aria-hidden="true" />
            <section className={`${classes.hero} ${spaceGrotesk.className}`}>
                <div className={classes.quickLinksAnchor}>
                    <div
                        className={`${classes.quickLinksRow} ${showSneakButtons ? classes.quickLinksRowVisible : classes.quickLinksRowHidden}`}
                    >
                        <a
                            href="https://www.linkedin.com/in/jameswalkerlinkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.quickLinkButton}
                            aria-label="Open LinkedIn profile"
                        >
                            <div className={classes.quickLinkIconWrap}>
                                <Image src={linkedinMark} alt="LinkedIn" className={classes.quickLinkIconImage} />
                            </div>
                            <span>LinkedIn</span>
                        </a>

                        <a
                            href="https://jprojects.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${classes.quickLinkButton} ${classes.quickLinkButtonParrotOnly}`}
                            aria-label="Open jprojects.dev"
                            title="jprojects.dev"
                        >
                            <div className={classes.quickLinkParrotWrap}>
                                <Image src={jprojectsIcon} alt="Jprojects" className={classes.quickLinkJprojectsImage} />
                            </div>
                            <span>Jprojects.dev</span>
                        </a>
                    </div>
                </div>

                <p className={`${classes.kicker} ${ibmPlexMono.className}`}>Resume</p>
                <h1 className={classes.nameTitle}>James Walker</h1>
            </section>

            <section
                ref={setSectionRef("experience-header")}
                data-section-id="experience-header"
                className={`${classes.sectionCard} ${classes.slideFromLeft} ${isVisible("experience-header") ? classes.sectionVisible : ""}`}
            >
                <h2 className={`${classes.sectionTitle} ${spaceGrotesk.className}`}>Experience</h2>
                <p className={classes.sectionSubtitle}>Impact across UX/UI engineering, platform delivery, and agile leadership.</p>
            </section>

            {experienceSections.map((experience, index) => {
                const directionClass = index % 2 === 0 ? classes.slideFromRight : classes.slideFromLeft;

                return (
                    <article
                        key={experience.id}
                        ref={setSectionRef(experience.id)}
                        data-section-id={experience.id}
                        className={`${classes.sectionCard} ${directionClass} ${isVisible(experience.id) ? classes.sectionVisible : ""}`}
                    >
                        <div className={classes.roleHeader}>
                            <p className={`${classes.periodText} ${ibmPlexMono.className}`}>{experience.period}</p>
                            <h3 className={`${classes.roleTitle} ${spaceGrotesk.className}`}>{experience.title}</h3>
                            <p className={classes.companyText}>{experience.companyLocation}</p>
                        </div>
                        <ul className={classes.bulletList}>
                            {experience.bullets.map((bullet) => (
                                <li key={bullet} className={classes.bulletItem}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </article>
                );
            })}

            <section
                ref={setSectionRef("skills")}
                data-section-id="skills"
                className={`${classes.sectionCard} ${classes.slideFromRight} ${isVisible("skills") ? classes.sectionVisible : ""}`}
            >
                <h2 className={`${classes.sectionTitle} ${spaceGrotesk.className}`}>Skills</h2>
                <div className={classes.skillsGrid}>
                    {skills.map((skill) => (
                        <div key={skill.id} className={classes.skillRow}>
                            <h3 className={classes.skillLabel}>{skill.label}</h3>
                            <p className={classes.skillValue}>{skill.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                ref={setSectionRef("education")}
                data-section-id="education"
                className={`${classes.sectionCard} ${classes.slideFromLeft} ${isVisible("education") ? classes.sectionVisible : ""}`}
            >
                <h2 className={`${classes.sectionTitle} ${spaceGrotesk.className}`}>Education</h2>
                <p className={classes.educationText}>Oakland University - B.S. Information Technology</p>
            </section>
        </main>
    );
}
