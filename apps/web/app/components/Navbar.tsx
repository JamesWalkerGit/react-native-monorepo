"use client";
import { Burger, Button, Drawer, Group, Text, Transition, useMantineTheme } from "@mantine/core";
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
import HappySquare from "./animations/HappySquare";
import GithubButton from "./auth/GithubButton";
import GoogleButton from "./auth/GoogleButton";
import AppleButton from "./auth/AppleButton";
import { signIn, useSession } from "next-auth/react"
import BurgerFlip from "./animations/BurgerFlip";


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
    const [bottomDrawerOpen, { toggle: toggleBottomDrawer }] = useDisclosure(false);
    const [activeLink, setActiveLink] = useState(pathName);
    const [loadButtons, setLoadButtons] = useState(false);

    const [loggingIn, setLoggingIn] = useState(false);

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

    console.log('logging in: ', loggingIn);

    return (
        <>
            <Drawer opened={sideMenuOpen} onClose={toggleSideMenu} size={'70vw'} radius={'md'} withCloseButton={false} lockScroll={false} zIndex={10}>
                <div style={styles.sidebarHeader}>
                    {navigationLinks}
                </div>
            </Drawer>

            <Drawer.Root
                opened={bottomDrawerOpen}
                onClose={toggleBottomDrawer}
                position='bottom'
                size={'md'}
            >
                <Drawer.Overlay
                    backgroundOpacity={0.5} blur={1}
                />
                <Drawer.Content style={styles.bottomDrawerContent}>
                    <Drawer.Body>
                        {session.status === 'unauthenticated' ?
                            <div style={styles.bottomDrawerSignInContainer}>
                                <div style={styles.happySquareContainer}>
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
                                            <AppleButton
                                                onClick={() => {
                                                    setLoggingIn(true);
                                                    signIn('apple');
                                                }}
                                            />
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
                                                toggleBottomDrawer();
                                            }}
                                            variant='filled'
                                            color={theme.colors.blue[9]}
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                    : null
                                }
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
        },
        happySquareContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 24
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
        signInButtonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }
    });
}
