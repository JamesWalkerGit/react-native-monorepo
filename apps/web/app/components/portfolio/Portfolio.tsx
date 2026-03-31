import { Text } from "@mantine/core";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { StaticImageData } from "next/image";
import { StyleSheet } from "@/styles/Stylesheet";
import phoneHorizontal from "@/app/portfolio/images/phoneHorizontal.png";
import fordApp from "@/app/portfolio/images/fordApp.webp";
import canopyApp from "@/app/portfolio/images/canopyApp.webp";
import { usePhoneShowcaseZoomPan } from "@/app/components/portfolio/usePhoneShowcaseZoomPan";
import classes from "@/app/portfolio/styles/Portfolio.module.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["600", "700"],
});

type PortfolioTechIcon = {
    name: string;
    lightSrc: string;
    darkSrc: string;
    iconStyle?: CSSProperties;
};

type PortfolioHighlight = {
    name: string;
    centerTitle?: boolean;
    techIcons?: PortfolioTechIcon[];
    details?: string[];
    description?: string;
};

const portfolioHighlights: PortfolioHighlight[] = [
    {
        name: "Cross-Platform Integration",
        centerTitle: true,
        techIcons: [
            { name: "React", lightSrc: "/tech-icons/light/react.svg", darkSrc: "/tech-icons/dark/react.svg" },
            { name: "React Native", lightSrc: "/tech-icons/light/react-native.svg", darkSrc: "/tech-icons/dark/react-native.svg" },
            { name: "Swift", lightSrc: "/tech-icons/light/swift.svg", darkSrc: "/tech-icons/light/swift.svg" },
            { name: "Kotlin", lightSrc: "/tech-icons/light/kotlin.svg", darkSrc: "/tech-icons/dark/kotlin.svg" },
            { name: "iOS", lightSrc: "/tech-icons/light/ios.svg", darkSrc: "/tech-icons/dark/ios.svg" },
            { name: "Android", lightSrc: "/tech-icons/light/android.svg", darkSrc: "/tech-icons/dark/android.svg" },
            { name: "Next.js", lightSrc: "/tech-icons/light/nextjs.svg", darkSrc: "/tech-icons/dark/nextjs.svg" },
            { name: "Angular", lightSrc: "/tech-icons/light/angular.svg", darkSrc: "/tech-icons/dark/angular.svg" },
            { name: "Appium", lightSrc: "/tech-icons/light/appium.png", darkSrc: "/tech-icons/dark/appium.png" },
            { name: "Figma", lightSrc: "/tech-icons/light/figma.svg", darkSrc: "/tech-icons/dark/figma.svg" },
            { name: "Storybook", lightSrc: "/tech-icons/light/storybook.svg", darkSrc: "/tech-icons/dark/storybook.svg" },
        ],
        details: [
            "Optimized Development: Scaled web and mobile apps by blending cross-platform frameworks with targeted native code, maintaining shared codebases without compromising high-quality native feel.",
            "Automated Pipeline Integration: Engineered comprehensive end-to-end (E2E) testing suites seamlessly integrated into CI/CD pipelines, guaranteeing deployment reliability and catching regressions before they reach production.",
            "Data-Driven Feature Scaling: Utilized application telemetry and performance metrics to guide architectural decisions, ensuring new features were prioritized and optimized based on concrete user data and system behavior.",
        ],
    },
];

const formatDetailLine = (detail: string) => {
    const firstColonIndex = detail.indexOf(":");
    if (firstColonIndex === -1) {
        return { label: "", body: detail };
    }

    return {
        label: detail.slice(0, firstColonIndex),
        body: detail.slice(firstColonIndex + 1).trimStart(),
    };
};

type PortfolioProps = {
    title?: string;
    showDisclaimer?: boolean;
};

type AppWorkedOn = {
    name: string;
    imageSrc: StaticImageData;
    alt: string;
    role: string;
    contributions: string;
    width: number;
    height: number;
    cropInsets?: {
        horizontal: number;
        vertical: number;
    };
};

const appsWorkedOn: AppWorkedOn[] = [
    {
        name: "The Ford App",
        imageSrc: fordApp,
        alt: "The Ford App showcase",
        role: "Frontend Engineer",
        contributions: "Vehicle Controls & Customer Experience, Swift, Kotlin, E2E Testing",
        width: 314,
        height: 538,
    },
    {
        name: "Canopy Security",
        imageSrc: canopyApp,
        alt: "Canopy Security showcase",
        role: "UX/UI Engineer",
        contributions: "Livestreaming & Intrusion Alerts, Maps API, CI/CD Pipeline",
        width: 314,
        height: 538,
        cropInsets: {
            horizontal: 60,
            vertical: 60,
        },
    },
];

export default function Portfolio({
    title = "How I Deliver Scalable Solutions",
    showDisclaimer = true,
}: PortfolioProps) {
    const styles = createStyles();
    const [activeAppNames, setActiveAppNames] = useState<Set<string>>(new Set());
    const [hoveredAppName, setHoveredAppName] = useState<string | null>(null);
    const [isCoarsePointerInput, setIsCoarsePointerInput] = useState(false);
    const {
        isPhoneZoomed,
        isPhoneDragging,
        phoneShowcaseRef,
        phoneShowcaseImageStyle,
        handlePhoneShowcaseClick,
        handlePhonePointerDown,
        handlePhonePointerMove,
        handlePhonePointerEnd,
    } = usePhoneShowcaseZoomPan(isCoarsePointerInput, styles.image);

    const toggleAppOverlay = (appName: string) => {
        setActiveAppNames((current) => {
            const next = new Set(current);

            if (next.has(appName)) {
                next.delete(appName);
            } else {
                next.add(appName);
            }

            return next;
        });
    };

    const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, appName: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleAppOverlay(appName);
        }
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

        const updatePointerType = () => {
            setIsCoarsePointerInput(mediaQuery.matches);
        };

        updatePointerType();
        mediaQuery.addEventListener("change", updatePointerType);

        return () => {
            mediaQuery.removeEventListener("change", updatePointerType);
        };
    }, []);

    useEffect(() => {
        const closeOverlayOnOutsidePress = (event: MouseEvent | TouchEvent) => {
            if (event.type === "touchstart" && isCoarsePointerInput) {
                return;
            }

            if (!(event.target instanceof Element)) {
                return;
            }

            if (event.target.closest(`.${classes.appImageWrapper}`)) {
                return;
            }

            setActiveAppNames(new Set());
        };

        document.addEventListener("mousedown", closeOverlayOnOutsidePress);
        document.addEventListener("touchstart", closeOverlayOnOutsidePress);

        return () => {
            document.removeEventListener("mousedown", closeOverlayOnOutsidePress);
            document.removeEventListener("touchstart", closeOverlayOnOutsidePress);
        };
    }, [isCoarsePointerInput]);

    return (
        <>
            <div style={styles.titleContainer}>
                <Text style={styles.titleText} className={`${inter.className} ${classes.titleText}`}>
                    {title}
                </Text>
            </div>

            <div style={styles.sectionContainer} className={classes.portfolioSection}>
                <div style={styles.textColumn} className={classes.textColumn}>
                    {portfolioHighlights.map((highlight) => (
                        <div key={highlight.name} style={styles.textBlock} className={classes.textBlock}>
                            <Text style={highlight.centerTitle ? { ...styles.cardTitle, ...styles.cardTitleCentered } : styles.cardTitle}>{highlight.name}</Text>
                            {highlight.techIcons ? (
                                <div style={styles.iconSection}>
                                    <div style={styles.iconRow}>
                                        {highlight.techIcons.map((icon) => {
                                            const iconWidth = Number(icon.iconStyle?.width ?? styles.techIconImage.width);
                                            const iconHeight = Number(icon.iconStyle?.height ?? styles.techIconImage.height);
                                            const mergedIconStyle = icon.iconStyle ? { ...styles.techIconImage, ...icon.iconStyle } : styles.techIconImage;

                                            return (
                                                <div key={icon.name} style={styles.iconItem}>
                                                    <Image
                                                        src={icon.lightSrc}
                                                        alt={`${icon.name} icon`}
                                                        width={iconWidth}
                                                        height={iconHeight}
                                                        style={mergedIconStyle}
                                                        className={classes.lightModeIcon}
                                                    />
                                                    <Image
                                                        src={icon.darkSrc}
                                                        alt={`${icon.name} icon`}
                                                        width={iconWidth}
                                                        height={iconHeight}
                                                        style={mergedIconStyle}
                                                        className={classes.darkModeIcon}
                                                    />
                                                    <Text style={styles.iconLabel}>{icon.name}</Text>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : null}
                            {highlight.details?.length ? (
                                highlight.details.map((detail) => {
                                    const parsedDetail = formatDetailLine(detail);

                                    if (!parsedDetail.label) {
                                        return (
                                            <Text key={detail} style={styles.cardDescription}>
                                                {parsedDetail.body}
                                            </Text>
                                        );
                                    }

                                    return (
                                        <div key={detail} style={styles.detailItem}>
                                            <Text style={styles.detailHeading}>{parsedDetail.label}</Text>
                                            <Text style={styles.cardDescription}>{parsedDetail.body}</Text>
                                        </div>
                                    );
                                })
                            ) : (
                                <Text style={styles.cardDescription}>{highlight.description ?? ""}</Text>
                            )}
                        </div>
                    ))}
                </div>

                <div style={styles.imageColumn} className={classes.imageColumn}>
                    <div className={classes.phoneShowcase}>
                        <button
                            type="button"
                            ref={phoneShowcaseRef}
                            className={`${classes.phoneShowcaseButton} ${isPhoneZoomed ? classes.phoneShowcaseButtonZoomed : ""} ${isPhoneDragging ? classes.phoneShowcaseButtonDragging : ""}`}
                            aria-label="Toggle zoom on portfolio showcase image"
                            aria-pressed={isPhoneZoomed}
                            onClick={handlePhoneShowcaseClick}
                            onPointerDown={handlePhonePointerDown}
                            onPointerMove={handlePhonePointerMove}
                            onPointerUp={handlePhonePointerEnd}
                            onPointerCancel={handlePhonePointerEnd}
                            onDragStart={(event) => event.preventDefault()}
                        >
                            <Image
                                src={phoneHorizontal}
                                alt="Portfolio showcase image"
                                aria-label="Portfolio showcase image"
                                style={phoneShowcaseImageStyle}
                                className={classes.phoneShowcaseImage}
                                priority
                                draggable={false}
                            />
                        </button>
                    </div>
                </div>

                <div style={styles.appsSection} className={classes.appsSectionBlock}>
                    <Text style={styles.appsTitle}>Featured Applications</Text>

                    <div style={styles.appsGrid}>
                        {appsWorkedOn.map((app) => {
                            const isActive = activeAppNames.has(app.name);
                            const isHovered = hoveredAppName === app.name;
                            const isOverlayVisible = isActive || (!isCoarsePointerInput && isHovered);
                            const cropScale = app.cropInsets
                                ? Math.min(
                                    app.width / (app.width - app.cropInsets.horizontal * 2),
                                    app.height / (app.height - app.cropInsets.vertical * 2)
                                )
                                : 1;
                            const appImageStyle = app.cropInsets
                                ? { ...styles.appImage, transform: `scale(${cropScale})`, transformOrigin: "center" as const }
                                : styles.appImage;

                            return (
                                <div key={app.name} style={styles.appCard} className={classes.appCardInteractive}>
                                    <div
                                        className={`${classes.appImageWrapper} ${isActive ? classes.appImageWrapperActive : ""}`}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${app.name} contribution details`}
                                        aria-pressed={isActive}
                                        data-testid={`${app.name}-overlay-trigger`}
                                        onDragStart={(event) => event.preventDefault()}
                                        onClick={() => toggleAppOverlay(app.name)}
                                        onMouseEnter={() => {
                                            if (!isCoarsePointerInput) {
                                                setHoveredAppName(app.name);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (!isCoarsePointerInput) {
                                                setHoveredAppName((current) => (current === app.name ? null : current));
                                            }
                                        }}
                                        onKeyDown={(event) => handleCardKeyDown(event, app.name)}
                                    >
                                        <Image
                                            src={app.imageSrc}
                                            alt={app.alt}
                                            width={app.width}
                                            height={app.height}
                                            style={appImageStyle}
                                            className={classes.appImageAsset}
                                            draggable={false}
                                        />
                                        <div className={classes.appInfoIcon} aria-hidden="true">i</div>
                                        <div className={classes.appOverlay} data-visible={isOverlayVisible} data-testid={`${app.name}-overlay`}>
                                            <Text className={classes.appOverlayTitle}>{app.name}</Text>
                                            <Text className={classes.appOverlayRole}>{app.role}</Text>
                                            <Text className={classes.appOverlayBody}>{app.contributions}</Text>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showDisclaimer ? (
                <div style={styles.disclaimerContainer}>
                    <Text style={styles.disclaimerText}>
                        All trademarks, logos, and brand names are the property of their respective owners and do not imply any official affiliation or endorsement.                    </Text>
                </div>
            ) : null}
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        titleContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 8,
            marginTop: 8,
        },
        titleText: {
            textAlign: "center",
            fontWeight: "light-dark(700, 600)",
            color: "light-dark(var(--mantine-color-black), var(--mantine-color-gray-3))",
        },
        sectionContainer: {
            padding: 16,
            maxWidth: 1240,
            marginLeft: "auto",
            marginRight: "auto",
        },
        textColumn: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            gap: 16,
        },
        textBlock: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 12,
            padding: 24,
            textAlign: "left",
            backgroundColor: "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))",
        },
        imageColumn: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: 18,
        },
        image: {
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center",
            borderRadius: 20,
            alignSelf: "center",
        },
        appsSection: {
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            padding: 18,
            borderRadius: 14,
            backgroundColor: "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))",
        },
        appsTitle: {
            fontSize: 26,
            lineHeight: 1.2,
            fontWeight: 700,
            textAlign: "center",
        },
        appsGrid: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
        },
        appCard: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "1 1 250px",
            maxWidth: 290,
            minWidth: 220,
        },
        appImage: {
            width: "100%",
            height: "auto",
            borderRadius: 18,
            objectFit: "cover",
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18)",
        },
        cardTitle: {
            fontSize: 28,
            marginBottom: 10,
            fontWeight: 700,
        },
        cardTitleCentered: {
            textAlign: "center",
        },
        cardDescription: {
            fontSize: 17,
            lineHeight: 1.4,
            marginBottom: 8,
        },
        detailItem: {
            marginBottom: 16,
        },
        detailHeading: {
            textAlign: "center",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.3,
            marginBottom: 6,
        },
        iconSection: {
            marginBottom: 40,
        },
        iconRow: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
        },
        iconItem: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
            borderRadius: 999,
            backgroundColor: "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))",
        },
        techIconImage: {
            width: 20,
            height: 20,
        },
        iconLabel: {
            fontSize: 13,
            lineHeight: 1,
            fontWeight: 600,
        },
        disclaimerContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            marginTop: 6,
            marginBottom: 8,
        },
        disclaimerText: {
            maxWidth: 960,
            textAlign: "center",
            fontSize: 13,
            opacity: 0.8,
        },
    });
};