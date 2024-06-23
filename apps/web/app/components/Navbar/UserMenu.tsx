"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { ActionIcon, Menu, MenuProps, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSunHigh, IconUserCode } from "@tabler/icons-react";
import { useState } from "react";
import classes from '../Navbar.module.css';
import { signOut, useSession } from "next-auth/react";

export default function UserMenu(props: MenuProps) {
    const styles = createStyles();
    const theme = useMantineTheme();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const session = useSession();

    return (
        <>
            <Menu shadow="md" width={200} opened={userMenuOpen} onChange={setUserMenuOpen} {...props}>
                <Menu.Target>
                    <ActionIcon color={theme.colors.dark[5]} variant="filled" aria-label="User Settings" size="lg" radius={20}>
                        <IconUserCode />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} closeMenuOnClick={false} aria-label="Toggle Theme"
                        leftSection={<>
                            <IconSunHigh className={classes.light} aria-label="Light Theme Icon" />
                            <IconMoon className={classes.dark} aria-label="Dark Theme Icon" />
                        </>}
                    >
                        <div className={classes.light}>
                            Set Light Theme
                        </div>
                        <div className={classes.dark}>
                            Set Dark Theme
                        </div>
                    </Menu.Item>

                    {session.status === 'authenticated' ?
                        <>
                            <Menu.Divider />
                            <Menu.Item closeMenuOnClick={true} style={styles.logoutButtonContainer} color={theme.colors.gray[6]} variant='subtle' onClick={() => signOut()} aria-label="Sign Out">
                                Sign Out
                            </Menu.Item>
                        </>
                        : null}
                </Menu.Dropdown >
            </Menu >
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        logoutButtonContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
    });
}
