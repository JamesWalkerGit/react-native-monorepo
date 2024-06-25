"use client";

import { StyleSheet } from "@/styles/Stylesheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react";
import { Button, Loader, Transition, useMantineTheme, } from "@mantine/core";
import { useEffect, useState } from "react";

export default function GithubButton() {
    const theme = useMantineTheme();
    const session = useSession();
    const styles = createStyles();
    const [loadingGithubButton, setLoadingGithubButton] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <>
            {loadingGithubButton ?
                <>
                    <div style={styles.loadingSpinner}>
                        <Loader color={theme.colors.blue[9]} size={'sm'} aria-label="Github Login Loading Spinner" />
                    </div>
                </> :

                session.status === 'unauthenticated' ?
                    <>
                        <Transition
                            mounted={mounted}
                            transition="fade"
                            duration={350}
                            timingFunction="ease"
                        >
                            {(fadeStyle) => {
                                return <Button
                                    style={{ ...fadeStyle, ...styles.githubButton }}
                                    leftSection={<IconBrandGithub color="white" />}
                                    onClick={() => {
                                        signIn('github');
                                        setLoadingGithubButton(true);
                                    }
                                    }
                                >
                                    Sign In With GitHub
                                </Button>
                            }
                            }
                        </Transition>
                    </>
                    : session.status === 'authenticated' ?
                        <Button color="secondary" onClick={() => signOut()} style={styles.githubButton}>
                            Sign Out
                        </Button>
                        : null
            }
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        githubButton: {
            backgroundColor: '#161b22'
        },
        loadingSpinner: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }
    });
}
