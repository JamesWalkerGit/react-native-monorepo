"use client";
import { ActionIcon, MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { StyleSheet } from "../../styles/Stylesheet";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";


export default function Navbar() {

    const { setColorScheme } = useMantineColorScheme();



    return (
        <div style={styles.navContainer}>
            <div style={styles.navSection}>
                <div style={styles.themeButtonContainer}>
                    <ActionIcon aria-label="Light Theme" size="lg" onClick={() => setColorScheme('light')}>
                        <IconSunHigh />
                    </ActionIcon>
                </div>
                <div style={styles.themeButtonContainer}>
                    <ActionIcon aria-label="Dark Theme" size="lg" onClick={() => setColorScheme('dark')}>
                        <IconMoonStars />
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