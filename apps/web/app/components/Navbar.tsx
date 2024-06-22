"use client";
import { ActionIcon, Burger, Group, useMantineColorScheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from './Navbar.module.css';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
    const [active, setActive] = useState(pathName);

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={() => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <div style={styles.navContainer} className="header" >
            <div style={styles.navSection} className="mantine-visible-from-xs" >
                <Group visibleFrom="xs">
                    {items}
                </Group>
            </div>
            <div style={styles.navSection} className="mantine-hidden-from-xs">
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" style={{ alignSelf: 'center' }} onBlur={toggle} />
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
        justifyContent: 'flex-end'
    }
});