"use client";
import { ActionIcon, Burger, Group, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { StyleSheet } from "@/styles/Stylesheet";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import GithubButton from "./auth/GithubButton";

const links = [
    { link: '/', label: 'Home' },
    { link: '/contact', label: 'Contact' },
];

const showInMobileView = 'mantine-hidden-from-xs'
const showInDesktopView = 'mantine-visible-from-xs'

export default function Navbar() {
    const theme = useMantineTheme();
    const pathName = usePathname();
    const styles = createStyles();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const showDesktopNavbar = useMediaQuery('(min-width: ' + theme.breakpoints.xs);
    const [navMenuOpen, { toggle: toggleNavMenu }] = useDisclosure(false);
    const [activeLink, setActiveLink] = useState(pathName);

    const headerLinks = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={activeLink === link.link || undefined}
            onClick={() => {
                setActiveLink(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    useEffect(() => {
        navMenuOpen ? toggleNavMenu() : null
        return () => {
        };
    },
        [showDesktopNavbar]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div style={styles.navContainer} className={classes.header + ' ' + showInMobileView}>
                <div style={{ ...styles.navSection, ...styles.startSection }} className={showInMobileView}>
                    <Burger color={theme.colors.dark[3]} opened={navMenuOpen} onClick={toggleNavMenu} hiddenFrom="xs" size="sm" aria-label="Toggle navbar" />
                </div>

                <div style={{ ...styles.navSection, ...styles.centerSection }} className={showInMobileView} >
                </div>

                <div style={{ ...styles.navSection, ...styles.endSection }} className={showInMobileView} >
                    <GithubButton />
                </div>
            </div>

            <div style={styles.navContainer} className={classes.header + ' ' + showInDesktopView}>
                <div style={{ ...styles.navSection, ...styles.startSection }} className={showInDesktopView} >
                    <ActionIcon color={theme.colors.dark[3]} variant="subtle" aria-label="Toggle color scheme" size="lg"
                        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                    >
                        <IconSunHigh className={classes.light} aria-label="Light Theme Icon" />
                        <IconMoon className={classes.dark} aria-label="Dark Theme Icon" />
                    </ActionIcon>
                </div>

                <div style={{ ...styles.navSection, ...styles.centerSection }} className={showInDesktopView} >
                    <Group visibleFrom="xs">
                        {headerLinks}
                    </Group>
                </div>

                <div style={{ ...styles.navSection, ...styles.endSection }} >
                    <GithubButton />
                </div>
            </div>
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        navContainer: {
            flex: 1,
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            minHeight: 56,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        navSection: {
            flex: 1,
            display: 'flex',
            justifySelf: 'flex-end',
            alignItems: 'center',
        },
        startSection: {
            flex: .1,
            justifyContent: 'flex-start',
            padding: 8
        },
        centerSection: {
            flex: .7,
            padding: 8
        },
        endSection: {
            flex: .2,
            justifyContent: 'flex-end',
            padding: 8
        }
    });
}