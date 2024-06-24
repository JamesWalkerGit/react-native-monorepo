"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { ActionIcon, Box, Menu, MenuProps, Text, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconLogout2, IconMoon, IconSunHigh, IconUserCode } from "@tabler/icons-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import styleConsts from '@/styles/styleConsts.module.css';


export default function UserMenu(props: MenuProps) {
    const styles = createStyles();
    const theme = useMantineTheme();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme(undefined, { getInitialValueInEffect: true });
    const session = useSession();

    return (
        <>
            <Menu shadow="md" width={200} opened={userMenuOpen} onChange={setUserMenuOpen} {...props}>
                <Menu.Target>
                    <Box>
                        <ActionIcon variant={'filled'} aria-label="User Settings" size="lg" radius={20} color={theme.colors.dark[4]} className={styleConsts.darkMode}>
                            <IconUserCode />
                        </ActionIcon>
                        <ActionIcon variant={'gradient'} aria-label="User Settings" size="lg" radius={20} className={styleConsts.lightMode}>
                            <IconUserCode />
                        </ActionIcon>
                    </Box>
                </Menu.Target>

                <Menu.Dropdown>
                    {session?.data?.user?.email ?
                        <>
                            <div style={styles.signedInContainer} aria-label="Signed in as"
                            >
                                <Text size='xs' style={styles.userText}>
                                    {session?.data?.user?.email}
                                </Text>
                                <Text size='xs' style={styles.userText}>
                                    Points: 0
                                </Text>
                            </div>
                            <Menu.Divider />
                        </>
                        : null
                    }
                    <Menu.Item onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} closeMenuOnClick={false} aria-label="Toggle Theme"
                        leftSection={<>
                            <IconSunHigh className={styleConsts.darkMode} aria-label="Light Theme Icon" />
                            <IconMoon className={styleConsts.lightMode} aria-label="Dark Theme Icon" />
                        </>}
                    >
                        <div className={styleConsts.darkMode}>
                            <Text>
                                Set Light Theme
                            </Text>
                        </div>
                        <div className={styleConsts.lightMode}>
                            <Text>
                                Set Dark Theme
                            </Text>
                        </div>
                    </Menu.Item>

                    {session.status === 'authenticated' ?
                        <>
                            <Menu.Divider />
                            <Menu.Item closeMenuOnClick={true} onClick={() => signOut()} aria-label="Sign Out"
                                leftSection={<IconLogout2 />}
                            >
                                <Text>
                                    Sign Out
                                </Text>
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
        signedInContainer: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: 2,
            paddingBottom: 2
        },
        userText:
        {
            justifyContent: 'center',
            display: 'flex',
            padding: 1
        }
    });
}
