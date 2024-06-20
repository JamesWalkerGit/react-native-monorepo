"use client";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";


export default function Navbar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <div style={styles.navContainer}>
            <div style={styles.navSection}>
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
        display: 'grid',
        width: '100%'
    },
    navSection: {
        flex: 1,
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center'
    },
    themeButtonContainer: {
        padding: 8
    }
});