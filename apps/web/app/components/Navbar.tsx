"use client";
import { ActionIcon, Burger, Group, useMantineColorScheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
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
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const pathName = usePathname();

    const [opened, { toggle }] = useDisclosure(false);
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

    return (
        <>
            <div style={styles.navContainer} className="header mantine-hidden-from-xs">
                <div style={styles.navSection} className="mantine-hidden-from-xs" >
                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" style={{ alignSelf: 'center' }} onBlur={toggle} />
                </div>
            </div>

            <div style={styles.navContainer} className="header mantine-visible-from-xs">
                <div style={styles.navSection} className="mantine-visible-from-xs" >
                    <Group visibleFrom="xs">
                        {headerLinks}
                    </Group>
                </div>
                <div style={{ ...styles.navSection, ...styles.toggleThemeSection, }}>
                    <div style={styles.themeButtonContainer}>
                        <ActionIcon color="dark" variant='transparent' aria-label={colorScheme === 'dark' ? 'Set Light Theme' : 'Set Dark Theme'} size="lg"
                            onClick={() => toggleColorScheme()}
                        >
                            {colorScheme === 'dark' ? <IconSunHigh aria-label="Light Theme Icon" /> : <IconMoon aria-label="Dark Theme Icon" />}
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
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    navSection: {
        flex: 1,
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center'
    },
    themeButtonContainer: {
        padding: 8,
    },
    toggleThemeSection: {
        flex: .2,
        justifyContent: 'flex-end'
    }
});