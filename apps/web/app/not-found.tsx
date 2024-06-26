"use client";
import Link from 'next/link';
import { StyleSheet } from "@/styles/Stylesheet";
import { Button } from '@mantine/core';
import PartyParrot from './components/animations/PartyParrot';


export default function NotFound() {
    const styles = createStyles();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.partyParrotContainer}>
                    <PartyParrot />
                </div>
                <h2>404 - Not Found</h2>
                <h3>Are you lost? </h3>

                <div style={styles.buttonContainer}>
                    <Link href="/">
                        <Button variant='gradient'>Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            display: 'flex',
            height: '90vh',
            width: '100%'
        },
        header: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
        },
        buttonContainer: {
            marginTop: '5vh'
        },
        partyParrotContainer: {
            height: '33vh'
        }
    });
}