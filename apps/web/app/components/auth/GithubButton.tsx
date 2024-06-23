"use client";

import { StyleSheet } from "@/styles/Stylesheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react";
import { Button, } from "@mantine/core";


export default function GithubButton() {
    const session = useSession();
    const styles = createStyles();

    return (
        <>
            {session.status === 'unauthenticated' ?
                <Button onClick={() => signIn('github')} style={styles.githubButton} leftSection={<IconBrandGithub color="white" />}>
                    Sign In With GitHub
                </Button>
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
    });
}
