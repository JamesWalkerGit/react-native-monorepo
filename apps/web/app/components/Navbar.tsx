"use client";
import { Burger, Drawer, Group, Transition, useMantineTheme } from "@mantine/core";
import { StyleSheet } from "@/styles/Stylesheet";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu/UserMenu";
import { showInDesktopView, showInMobileView } from "@/styles/consts";
import styleConsts from '@/styles/styleConsts.module.css'
import ThemeButton from "./theming/ThemeButton";

const links = [
    { link: '/', label: 'Home' },
    { link: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const theme = useMantineTheme();
    const pathName = usePathname();
    const showDesktopNavbar = useMediaQuery('(min-width: ' + theme.breakpoints.xs);
    const styles = createStyles();
    const [sideMenuOpen, { toggle: toggleSideMenu }] = useDisclosure(false);
    const [activeLink, setActiveLink] = useState(pathName);
    const [loadButtons, setLoadButtons] = useState(false);

    const navigationLinks = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={classes.link + ' ' + styleConsts.transitionThemeColors}
            data-active={activeLink === link.link || undefined}
            onClick={() => {
                setActiveLink(link.link);
                sideMenuOpen ? toggleSideMenu() : null
            }}
        >
            {link.label}
        </Link>
    ));

    useEffect(() => {
        sideMenuOpen ? toggleSideMenu() : null
        return () => {
        };
    },
        [showDesktopNavbar]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        setInterval(() => {
            loadButtons === false ? setLoadButtons(true) : null
        }, 200)
    }, [loadButtons]);

    return (
        <>
            <Drawer opened={sideMenuOpen} onClose={toggleSideMenu} size={'70vw'} radius={'md'} withCloseButton={false} lockScroll={false} zIndex={10}>
                <div style={styles.sidebarHeader}>
                    {navigationLinks}
                </div>
            </Drawer>

            <div style={styles.navContainer} className={classes.navContainer + ' ' + styleConsts.transitionThemeColors}>
                <div style={{ ...styles.navSection, ...styles.startSection }}>
                    <div className={showInDesktopView}>
                    </div>

                    <div className={showInMobileView}>
                        <Burger color={theme.colors.dark[3]} className={classes.burger} opened={sideMenuOpen} onClick={toggleSideMenu} hiddenFrom="xs" size="sm" aria-label="Toggle sidebar" />
                    </div>
                </div>

                <div style={{ ...styles.navSection, ...styles.centerSection }}>
                    <div className={showInDesktopView}>
                        <Group visibleFrom="xs">
                            {navigationLinks}
                        </Group>
                    </div>
                    <div className={showInMobileView}>
                    </div>
                </div>

                <div style={{ ...styles.navSection, ...styles.endSection }}>
                    <Transition
                        mounted={loadButtons}
                        transition="fade"
                        duration={300}
                        timingFunction="ease"
                    >
                        {(fadeStyle) => {
                            return <div style={{ ...styles.userMenuContainer, ...fadeStyle }}>
                                <ThemeButton />
                                <UserMenu />
                            </div>
                        }
                        }
                    </Transition>
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
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            position: 'fixed',
            top: 0,
            zIndex: 11,
        },
        navSection: {
            flex: 1,
            display: 'flex',
            justifySelf: 'flex-end',
            alignItems: 'center',
        },
        startSection: {
            flex: .05,
            justifyContent: 'flex-start',
            padding: 8
        },
        centerSection: {
            flex: .55,
            padding: 8
        },
        endSection: {
            flex: .4,
            justifyContent: 'flex-end',
            padding: 8
        },
        sidebarHeader: {
            flex: 1,
            flexDirection: 'column',
            display: 'flex',
            marginTop: '8vh'
        },
        userMenuContainer: {
            gap: 8,
            display: 'flex',
            flexDirection: 'row'
        }
    });
}
