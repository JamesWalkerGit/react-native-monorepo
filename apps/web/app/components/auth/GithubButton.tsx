"use client";

import { StyleSheet } from "@/styles/Stylesheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react";
import { Button, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import BurgerFlip from "../animations/BurgerFlip";
import GithubIcon from "@/app/icons/GithubIcon";

export default function GithubButton() {
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
                        <BurgerFlip height={160} width={160} speed={2.25} aria-label="Github Login Loading Spinner" />
                    </div>
                </> : session.status === 'loading' ? <></> :
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
                                        leftSection={<GithubIcon fill="white" />}
                                        onClick={() => {
                                            signIn('github');
                                            setLoadingGithubButton(true);
                                        }
                                        }
                                        size="lg"
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
            display: 'flex',
            height: 160,
            width: 160
        }
    });
}
