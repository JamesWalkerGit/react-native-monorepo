"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { Menu, MenuProps, Text, ThemeIcon, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconLogout2, IconUserCode } from "@tabler/icons-react";
import { forwardRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import userMenuClasses from './UserMenu.module.css';
import GithubButton from "../auth/GithubButton";


export default function UserMenu(props: MenuProps) {
    const styles = createStyles();
    const theme = useMantineTheme();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const session = useSession();
    const UserMenuButton = forwardRef<HTMLButtonElement>(
        ({ ...props }, ref) => (
            <UnstyledButton
                aria-label="User Settings"
                ref={ref}
                {...props}
                hidden={session.data === undefined}
            >
                <ThemeIcon
                    variant="gradient"
                    size={38}
                    radius={20}
                    className={userMenuClasses.userMenuIcon}
                    darkHidden={true}
                >
                    <IconUserCode />
                </ThemeIcon>
                <ThemeIcon
                    variant="filled"
                    size={38}
                    radius={20}
                    color={theme.colors.dark[4]}
                    className={userMenuClasses.userMenuIcon}
                    lightHidden={true}
                >
                    <IconUserCode />
                </ThemeIcon>
            </UnstyledButton>
        )
    );
    UserMenuButton.displayName = 'UserMenuButton';

    return (
        <>
            {session?.status === 'unauthenticated' ?
                <>
                    <GithubButton />
                </> :
                <>
                    <Menu shadow="md" width={200} opened={userMenuOpen} onChange={setUserMenuOpen} {...props}>
                        <Menu.Target>
                            <UserMenuButton />
                        </Menu.Target>

                        <Menu.Dropdown>
                            {session?.data?.user?.email ?
                                <>
                                    <div style={styles.signedInContainer} aria-label="Signed in as">
                                        <Text size='xs' style={styles.userText} aria-label='User Email'>
                                            {session?.data?.user?.email}
                                        </Text>
                                        <Text size='xs' style={styles.userText}>
                                            Points: 0
                                        </Text>
                                    </div>
                                </>
                                : null
                            }
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
            }
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
