"use client";
import { Burger, Button, Drawer, Group, Text, Transition, useMantineTheme } from "@mantine/core";
import { StyleSheet } from "@/styles/Stylesheet";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { showInDesktopView, showInMobileView } from "@/styles/consts";
import styleConsts from '@/styles/styleConsts.module.css'
import ThemeButton from "./theming/ThemeButton";
import HappySquare from "./animations/HappySquare";
import GithubButton from "./auth/GithubButton";
import GoogleButton from "./auth/GoogleButton";
import { signIn, signOut, useSession } from "next-auth/react"
import BurgerFlip from "./animations/BurgerFlip";
import UserMenuButton from "./UserMenu/components/UserMenuButton";
import { useBottomSheet } from "../contexts/BottomSheetContext";


const links = [
    { link: '/', label: 'Home' },
    { link: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const theme = useMantineTheme();
    const pathName = usePathname();
    const showDesktopNavbar = useMediaQuery('(min-width: ' + theme.breakpoints.xs);
    const styles = createStyles();
    const session = useSession();
    const [sideMenuOpen, { toggle: toggleSideMenu }] = useDisclosure(false);
    const [activeLink, setActiveLink] = useState(pathName);
    const [loadButtons, setLoadButtons] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const bottomSheet = useBottomSheet();

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

            <Drawer.Root
                opened={bottomSheet.isBottomSheetShowing}
                onClose={bottomSheet.toggleBottomSheet}
                position='bottom'
                size={'md'}
            >
                <Drawer.Overlay
                    backgroundOpacity={0.5} blur={1}
                />
                <Drawer.Content style={styles.bottomDrawerContent}>
                    <Drawer.Body style={styles.drawerBody}>
                        {session.status === 'unauthenticated' ?
                            <div style={styles.bottomDrawerSignInContainer}>
                                <div style={styles.signInhappySquareContainer}>
                                    <HappySquare height={160} width={160} />
                                    <Text style={styles.bottomDrawerSignInLabel} >
                                        Sign In
                                    </Text>
                                </div>
                                <div style={styles.signInButtonContainer}>
                                    {loggingIn ?
                                        <>
                                            <BurgerFlip height={160} width={160} speed={2.25} aria-label="Login Loading Spinner" />
                                        </> :
                                        <>
                                            <GithubButton
                                                onClick={() => {
                                                    setLoggingIn(true);
                                                    signIn('github');
                                                }}
                                            />
                                            <GoogleButton
                                                onClick={() => {
                                                    setLoggingIn(true);
                                                    signIn('google');
                                                }}
                                            />
                                        </>
                                    }
                                </div>
                            </div> : null
                        }

                        {session.status === 'authenticated' ?
                            <>
                                <div style={styles.bottomDrawerUserContainer}>

                                    <div style={styles.userMenuHappySquareContainer}>
                                        <HappySquare height={160} width={160} />
                                        <Text style={styles.userMenuLabel} >
                                            User Menu
                                        </Text>
                                    </div>
                                    <div style={{ alignContent: 'center' }} >
                                        <Text size="sm" style={styles.bottomDrawerUserLabel} >
                                            {session?.data?.user?.email}
                                        </Text>

                                        <Text size='xs' style={styles.pointsText}>
                                            Points: 0
                                        </Text>
                                    </div>
                                    <div style={styles.signOutButtonContainer}>
                                        <Button variant='filled' color={theme.colors.red[9]} onClick={() => { bottomSheet.toggleBottomSheet(); signOut(); }} >
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </> : null
                        }
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root >


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
                                {session?.status === 'unauthenticated' ?
                                    <>
                                        <Button
                                            onClick={() => {
                                                bottomSheet.toggleBottomSheet();
                                            }}
                                            variant='filled'
                                            color={theme.colors.blue[9]}
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                    : null
                                }

                                {session.status === 'authenticated' ?
                                    <UserMenuButton onClick={bottomSheet.toggleBottomSheet} /> : null
                                }
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
        },
        signInhappySquareContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 24
        },
        userMenuHappySquareContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 12

        },
        bottomDrawerContent: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        bottomDrawerSignInLabel: {
            fontSize: 30,
            marginTop: -30
        },
        bottomDrawerSignInContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomDrawerUserContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            maxWidth: 800
        },
        bottomDrawerUserLabel: {
            textAlign: 'center'
        },
        signInButtonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        signOutButtonContainer: {
            display: 'flex',
            flex: 1,
            alignItems: 'flex-end',
        },
        pointsText: {
            justifyContent: 'center',
            display: 'flex',
            padding: 1
        },
        userMenuLabel: {
            fontSize: 30,
            marginTop: -30
        },
        drawerBody: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
}
