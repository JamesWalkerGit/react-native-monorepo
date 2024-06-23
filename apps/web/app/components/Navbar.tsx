"use client";
import { ActionIcon, Burger, Drawer, Group, useMantineTheme } from "@mantine/core";
import { StyleSheet } from "@/styles/Stylesheet";
import { IconX } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import GithubButton from "./auth/GithubButton";
import { useSession } from "next-auth/react";
import UserMenu from "./Navbar/UserMenu";

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
    const session = useSession();
    const showDesktopNavbar = useMediaQuery('(min-width: ' + theme.breakpoints.xs);
    const [sideMenuOpen, { toggle: toggleSideMenu }] = useDisclosure(false);
    const [activeLink, setActiveLink] = useState(pathName);

    const navigationLinks = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={classes.link}
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

    return (
        <>
            <Drawer opened={sideMenuOpen} onClose={toggleSideMenu} size={'70vw'} radius={'md'} withCloseButton={false}>
                <div style={styles.sidebarHeader}>
                    <ActionIcon onClick={toggleSideMenu} variant="subtle" color={theme.colors.dark[3]} size={'lg'}>
                        <IconX />
                    </ActionIcon>
                </div>
                <div>
                    {navigationLinks}
                </div>
            </Drawer >

            <div style={styles.navContainer} className={classes.header}>
                <div style={{ ...styles.navSection, ...styles.startSection }}>
                    <div className={showInDesktopView}>
                    </div>

                    <div className={showInMobileView}>
                        <Burger color={theme.colors.dark[3]} opened={sideMenuOpen} onClick={toggleSideMenu} hiddenFrom="xs" size="sm" aria-label="Toggle navbar" />
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
                    <div style={{ gap: 8, display: 'flex', flexDirection: 'row' }}>
                        {session.status === 'unauthenticated' ? <GithubButton /> : null}
                        <UserMenu />
                    </div>
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
        },
        sidebarHeader: {
            justifyContent: 'space-between',
            flex: 1,
            flexDirection: 'row',
            display: 'flex',
            marginBottom: 12
        }
    });
}