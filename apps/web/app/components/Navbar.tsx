"use client";
import { ActionIcon, Burger, Group, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { link: '/', label: 'Home' },
    { link: '/testpage', label: 'testpage' },
    { link: '/examples', label: 'Examples' },
    { link: '/community', label: 'Contact' },
];

export default function Navbar() {
    const theme = useMantineTheme();
    const pathName = usePathname();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const showHideMobile = useMediaQuery('(min-width: ' + theme.breakpoints.xs);
    const [navMenuOpened, { toggle }] = useDisclosure(false);
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
        navMenuOpened ? toggle() : null
        return () => {
        };
    }, [showHideMobile, navMenuOpened, toggle]);

    return (
        <>
            <div style={styles.navContainer} className={classes.header + ' mantine-hidden-from-xs'}>
                <div style={{ ...styles.navSection, ...styles.burgerSection }} className="mantine-hidden-from-xs" >
                    <Burger color={theme.colors.dark[3]} opened={navMenuOpened} onClick={toggle} hiddenFrom="xs" size="sm" aria-label="Toggle navbar" />
                </div>
            </div>

            <div style={styles.navContainer} className={classes.header + ' mantine-visible-from-xs'}>
                <div style={styles.navSection} className="mantine-visible-from-xs" >
                    <Group visibleFrom="xs">
                        {headerLinks}
                    </Group>
                </div>
                <div style={{ ...styles.navSection, ...styles.toggleThemeSection, }}>
                    <div style={styles.themeButtonContainer}>
                        <ActionIcon color={theme.colors.dark[3]} variant="subtle" aria-label="Toggle color scheme" size="lg"
                            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        >
                            <IconSunHigh className={classes.light} aria-label="Light Theme Icon" />
                            <IconMoon className={classes.dark} aria-label="Dark Theme Icon" />
                        </ActionIcon>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        minHeight: 56
    },
    navSection: {
        flex: 1,
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center',
        padding: 4
    },
    themeButtonContainer: {
    },
    toggleThemeSection: {
        flex: .2,
        justifyContent: 'flex-end'
    },
    burgerSection: {
        justifyContent: 'flex-end'
    }
});