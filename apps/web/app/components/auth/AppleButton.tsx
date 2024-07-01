"use client";

import { StyleSheet } from "@/styles/Stylesheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { Box, Button, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import BurgerFlip from "../animations/BurgerFlip";
import AppleIcon from "@/app/icons/AppleIcon";

export default function AppleButton() {
    const session = useSession();
    const styles = createStyles();
    const [loadingAppleButton, setLoadingAppleButton] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <>
            {loadingAppleButton ?
                <>
                    <div style={styles.loadingSpinner}>
                        <BurgerFlip height={160} width={160} speed={2.25} aria-label="Apple Login Loading Spinner" />
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
                                        style={{ ...fadeStyle, ...styles.appleButton }}
                                        onClick={() => {
                                            signIn('apple');
                                            setLoadingAppleButton(true);
                                        }
                                        }
                                        size="lg"
                                        leftSection={
                                            <AppleIcon fill="white" />
                                        }
                                    >
                                        <Box style={{ marginLeft: 12 }}>
                                            Sign In With Apple
                                        </Box>
                                    </Button>
                                }
                                }
                            </Transition>
                        </>
                        : session.status === 'authenticated' ?
                            <Button color="secondary" onClick={() => signOut()} style={styles.appleButton}>
                                Sign Out
                            </Button>
                            : null
            }
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        appleButton: {
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
