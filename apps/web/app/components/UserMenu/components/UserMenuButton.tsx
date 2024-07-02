"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { ThemeIcon, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconUserCode } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import userMenuClasses from '../UserMenu.module.css';


export default function UserMenuButton({ onClick, ...props }: any) {
    const styles = createStyles();
    const theme = useMantineTheme();
    const session = useSession();


    return (
        <>
            <UnstyledButton
                aria-label="User Settings"
                hidden={session.data === undefined}
                onClick={onClick}
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
        userText: {
            justifyContent: 'center',
            display: 'flex',
            padding: 1
        }
    });
}
