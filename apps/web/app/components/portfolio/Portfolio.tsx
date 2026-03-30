import { Text } from "@mantine/core";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useMediaQuery } from "@mantine/hooks";
import { StyleSheet } from "@/styles/Stylesheet";
import phoneHorizontal from "@/app/portfolio/images/phoneHorizontal.png";
import classes from "@/app/portfolio/styles/Portfolio.module.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["600", "700"],
});

type PortfolioTechIcon = {
    name: string;
    lightSrc: string;
    darkSrc: string;
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
            { name: "Android", lightSrc: "/tech-icons/light/android.svg", darkSrc: "/tech-icons/dark/android.svg" },
            { name: "iOS", lightSrc: "/tech-icons/light/ios.svg", darkSrc: "/tech-icons/dark/ios.svg" },
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

export default function Portfolio({
    title = "How I Deliver Scalable Solutions",
    showDisclaimer = true,
}: PortfolioProps) {
    const styles = createStyles();
    const isMobileView = useMediaQuery("(max-width: 48em)");

    return (
        <>
            <div style={styles.titleContainer}>
                <Text style={isMobileView ? { ...styles.titleText, ...styles.titleTextMobile } : styles.titleText} className={inter.className}>
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
                                        {highlight.techIcons.map((icon) => (
                                            <div key={icon.name} style={styles.iconItem}>
                                                <Image
                                                    src={icon.lightSrc}
                                                    alt={`${icon.name} icon`}
                                                    width={20}
                                                    height={20}
                                                    style={styles.techIconImage}
                                                    className={classes.lightModeIcon}
                                                />
                                                <Image
                                                    src={icon.darkSrc}
                                                    alt={`${icon.name} icon`}
                                                    width={20}
                                                    height={20}
                                                    style={styles.techIconImage}
                                                    className={classes.darkModeIcon}
                                                />
                                                <Text style={styles.iconLabel}>{icon.name}</Text>
                                            </div>
                                        ))}
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
                    <Image
                        src={phoneHorizontal}
                        alt="Portfolio showcase image"
                        aria-label="Portfolio showcase image"
                        style={styles.image}
                        priority
                    />
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
            fontSize: 48,
            textAlign: "center",
            fontWeight: "light-dark(700, 600)",
            color: "light-dark(var(--mantine-color-black), var(--mantine-color-gray-3))",
        },
        titleTextMobile: {
            fontSize: 34,
            lineHeight: 1.15,
        },
        sectionContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 28,
            flexWrap: "wrap",
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
            justifyContent: "center",
            alignItems: "flex-start",
        },
        image: {
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center",
            borderRadius: 20,
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