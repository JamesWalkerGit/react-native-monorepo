"use client";
import { ActionIcon, MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";


export default function Navbar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <div style={styles.navContainer}>
            <div style={styles.navSection}>
                <div style={styles.themeButtonContainer}>
                    <ActionIcon aria-label={colorScheme === 'dark' ? 'Light Theme' : 'Dark Theme'} size="lg" onClick={() => toggleColorScheme()}>
                        {colorScheme === 'dark' ? <IconSunHigh /> : <IconMoonStars />}
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
        display: 'grid',
        width: '100%'
    },
    navSection: {
        flex: 1,
        display: 'flex',
        justifySelf: 'flex-end'
    },
    themeButtonContainer: {
        padding: 4
    }
});