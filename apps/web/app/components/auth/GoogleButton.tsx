"use client";

import { StyleSheet } from "@/styles/Stylesheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import BurgerFlip from "../animations/BurgerFlip";

export default function GoogleButton() {
    const session = useSession();
    const styles = createStyles();
    const [loadingGoogleButton, setLoadingGoogleButton] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <>
            {loadingGoogleButton ?
                <>
                    <div style={styles.loadingSpinner}>
                        <BurgerFlip height={160} width={160} speed={2.25} aria-label="Google Login Loading Spinner" />
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
                                        style={{ ...fadeStyle, ...styles.googleButton }}
                                        onClick={() => {
                                            signIn('google');
                                            setLoadingGoogleButton(true);
                                        }
                                        }
                                        size="lg">
                                        Sign In With Google
                                    </Button>
                                }
                                }
                            </Transition>
                        </>
                        : session.status === 'authenticated' ?
                            <Button color="secondary" onClick={() => signOut()} style={styles.googleButton}>
                                Sign Out
                            </Button>
                            : null
            }
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        googleButton: {
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
